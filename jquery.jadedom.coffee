'use strict'

get_property = ( obj, namespace, not_found_value = false ) ->
  return not_found_value if not obj?
  if namespace.indexOf( '.' ) < 0
    return if obj[ namespace ]? then obj[ namespace ] else not_found_value
  namespace_array = namespace.split '.'
  val = obj
  for key in namespace_array
    val = val[ key ]
    return not_found_value if not val?
  return if val? then val else not_found_value

class JadeDom
  
  globals: {}
  locals: {}
  show_lookup: true

  constructor: ( @lookup_table = {}, @locals = @locals, @root = document.createDocumentFragment() ) ->
    @show_lookup = false if not @lookup_table?
    @logic = 'none'
    @last_logic = 'none'
  
  init: ( args ) ->
    @handle_root( args )
    @root = @root.firstChild if ( @root.childNodes.length == 1 )
    $ret = $ @root
    $ret.lookup = @lookup if @show_lookup
    $ret
  
  lookup: ( str ) =>
    return @lookup_table if not str
    return @lookup_table[ str ] or false
  
  handle_object: ( elem, obj ) ->
    $elem = $ elem
    for key, val of obj
      switch key
        when 'cache' then @cache_lookup val, $elem
        else
          if $elem[ key ] then $elem[ key ] val
          else $elem.attr( key, val )
  
  cache_lookup: ( key, $elem ) ->
    keys = key.split ' '
    for key in keys
      @lookup_table[ key ] = if @lookup_table[ key ] then @lookup_table[ key ].add( $elem ) else $elem
  
  get_type: ( arg, i ) ->
    return 'children' if arg instanceof Array
    return 'logic' if typeof arg == 'string' and arg.charAt( 0 ) == '-'
    return 'node' if typeof arg == 'string' or arg.jquery or arg.nodeType
    if typeof arg == 'object'
      return if i > 0 then 'options' else 'locals'
    false
  
  handle_root: ( children ) ->
    return false if not children.length
    last_elem = @root
    for child, i in children
      type = @get_type child, i
      switch type
        when 'locals'   then @locals = child
        when 'node'     then @root.appendChild last_elem = @get_node child
        when 'logic'    then @handle_logic child
        when 'children' then @add_children ( if @logic != 'none' then @root else last_elem ), child
        when 'options'  then @handle_object last_elem, child
  
  add_children: ( elem, children ) ->
    return false if not children.length
    if not @logic
      @last_logic = @logic
      @logic = 'none'
    else if @logic instanceof Array
      collection = @get_property @logic[ 1 ]
      for val, i in collection
        iteration_locals = index: i
        iteration_locals[ @logic[ 0 ] ] = val
        new JadeDom( @lookup_table, $.extend( {}, @locals, iteration_locals ), elem ).init( children )
      @logic = 'none'
    else
      new JadeDom( @lookup_table, @locals, elem ).init( children )
  
  handle_logic: ( str ) ->
    return @logic = @handle_if( parts[1..] ) if parts = str.match /^-\s*if[\s\(]+([\w\d_\.]+|['"][^'"]*['"])(\s*((==)|(>=)|(<=)|(<)|(>)|(===)|(!==)|(!=))\s*([\w\d_\.]+|['"][^'"]*['"])+)?[\s\)]*$/
    return @logic = !@last_logic if str.match /^-\s*else\s*$/
    return @handle_each( parts[ 1.. ] ) if parts = str.match /^-\s*each\s+([\w\d_\.]+)\s+in\s+([\w\d_\.]+)\s*$/
  
  handle_each: ( parts ) ->
    @logic = parts
  
  handle_if: ( parts ) ->
    @remove_undefined parts
    return !!@get_var parts[ 0 ] if parts.length == 1
    left = @get_var parts[ 0 ]
    right = @get_var( parts[ 1 ].replace parts[ 3 ], '' )
    switch parts[ 3 ]
      when '=='  then return `left ==  right`
      when '===' then return `left === right`
      when '!='  then return `left !=  right`
      when '!==' then return `left !== right`
      when '>'   then return `left >   right`
      when '>='  then return `left >=  right`
      when '<'   then return `left <   right`
      when '<='  then return `left <=  right`
  
  remove_undefined: ( parts ) ->
    for i in [ parts.length - 1 .. 0 ]
      parts.splice i, 1 if not parts[ i ]?
  
  get_var: ( str ) ->
    str = $.trim str
    switch str
      when 'true' then return true
      when 'false' then return false
      else
        return parseFloat( str ) if str == parseFloat( str ).toString()
        return str.substring 1, str.length - 1 if str.toString().charAt( 0 ) == '"' or str.toString().charAt( 0 ) == '\''
        @get_property str
  
  get_property: ( str ) ->
    get_property @locals, str, get_property( @globals, str, false )
  
  get_node: ( elem ) ->
    return @get_node_from_string elem if typeof elem == 'string'
    return elem.get 0 if elem.jquery?
    return elem if elem.nodeType?
  
  get_node_from_string: ( str ) ->
    new JadeParser( @, str ).elem
  
  set_attributes: ( elem, attrs ) ->
    for key, val of attrs
      @set_attribute elem, key, val
  
  set_attribute: ( elem, key, value ) ->
    switch key
      when 'class', 'className' then elem.className = value
      when 'style' then elem.style.cssText = value
      else elem.setAttribute key, value

class JadeParser
  
  mode_lookup:
    '#': 'id', '.': 'class', '(': 'attributes', '|': 'html', '=': 'text_variable', '!': 'html_variable'
  cache: {}
  skip_cache: false

  constructor: ( @parent, @str ) ->
    @str += ' '
    @mode = @get_first_mode()
    @cur = 0
    @char = false
    @len = str.length
    @attrs = false
    @html = false
    @classes = []
    @tag = false
    @id = false
    @elem = false
    @init()
  
  init: ->
    @variable_replacement()
    if @cache[ @str ]
      @elem = @cache[ @str ].cloneNode true
    else if @mode == 'html'
      @elem = @get_html_fragment @str.substring( 0, @len ).replace( /^\|\s?/, '' )
    else
      @parse()
      @create_element()
      @cache[ @str ] = @elem.cloneNode true if !@skip_cache
  
  create_element: ->
    @elem = document.createElement( @tag || 'div' )
    @elem.id = @id if @id
    @elem.className = @classes.join ' ' if @classes.length
    @parent.set_attributes( @elem, @attrs ) if @attrs
    @elem.innerHTML = @html if @html[ 0 ]
  
  escape_html: ( str ) ->
    str.toString().replace( /&/g, '&ampl;' ).replace( />/g, '&gt;' ).replace( /</g, '&lt;' ).replace( /"/g, '&quot;' )
  
  get_content: ( str ) ->
    @handle_mode[ @mode ].apply this if @mode != false
  
  get_first_mode: ->
    char = @str.charAt 0
    return 'html' if char == '|'
    return 'tag'  if char.match /\w/
    false
  
  get_html_fragment: ( str ) ->
    frag = document.createDocumentFragment()
    div = document.createElement 'div'
    div.innerHTML = str
    for i in [ div.childNodes.length - 1 .. 0 ]
      frag.appendChild div.childNodes[ 0 ]
    frag
  
  get_mode: ->
    @mode = if @char.match /\s/ then 'html' else @mode_lookup[ @char ] or false
  
  handle_mode:
  
    'attributes': ->
      @attrs = {} if @attrs == false
      key = @str.substring( @cur ).match( /^(\"[^\"]+\")|(\'[^\']+\')|([^=]+)/ )[ 0 ]
      @cur += key.length
      key = key.replace( /[\'\"]/g, '' )
      if @str.charAt( @cur ) == '='
        val = @str.substring( @cur + 1 ).match( /^(\"[^\"]+\")|(\'[^\']+\')|([^\,\)]+)/ )[ 0 ]
        @cur += val.length + 1
        val = val.replace( /[\'\"]/g, '' )
      else
        val = key
      @attrs[ key ] = val
      if @len > @cur
        if @str.charAt( this.cur ) == ')' then @mode = false
        else if key = @str.substring( @cur ).match( /^\,\s*/ ) then @cur += key.length
    
    'class': ->
      cls = @str.substring( @cur ).match( /^[\w\d\:\_\-]+/ )[ 0 ]
      @classes.push cls
      @jump_to_next cls.length
    
    'html': ->
      @html = @str.substring( @cur, @len ).replace( /^\s/, '' )
      @mode = true
    
    'html_variable': ->
      return false if @str.charAt( @cur ) != '='
      key = $.trim @str.substring( @cur + 1, @len )
      @html = @parent.locals[ key ] || @parent.globals[ key ] || key
      @mode = true
      @skip_cache = true
    
    'id': ->
      @id = @str.substring( @cur ).match( /^[\w\d\:\_\-]+/ )[ 0 ]
      @jump_to_next  @id.length
    
    'tag': ->
      @tag = @str.substring( @cur ).match( /^[\w\d\:\_\-]+/ )[ 0 ] || 'div'
      @jump_to_next @tag.length
    
    'text_variable': ->
      key = $.trim @str.substring( @cur, @len )
      @html = @escape_html( @parent.locals[ key ] || @parent.globals[ key ] || key )
      @mode = true
      @str = false
      @skip_cache = true
  
  jump_to_next: ( len ) ->
    @mode = false
    @cur += len
  
  parse: ->
    while @cur < @len && @mode != true
      @char = @str.charAt @cur++ if @mode != 'tag'
      @get_mode() if @mode == false
      @get_content()
  
  replace: ( map ) ->
    @replace_escaped map
    @replace_unescaped map
  
  replace_escaped: ( map ) ->
    matches = @str.match /#\{[\w\d_\$\.]+\}/g
    if matches
      for match, i in matches
        @str = @str.replace( match, @escape_html( get_property( map, match.replace( /[#\{\}]*/g, '' ), match ) ) )
  
  replace_unescaped: ( map ) ->
    matches = @str.match( /!\{[\w\d_\$\.]+\}/g )
    if matches
      for match, i in matches
        @str = @str.replace( match, get_property( map, match.replace( /[!\{\}]*/g, '' ), match ) )
  
  variable_replacement: ->
    @replace @parent.locals
    @replace @parent.globals
    @len = @str.length - 1

$.jade = ->                     new JadeDom().init Array( arguments... )
$.jade.set_globals = ( obj ) -> JadeDom.prototype.globals = obj
$.jade.add_globals = ( obj ) -> $.extend JadeDom.prototype.globals, obj
$.jade.clear_globals = ->       JadeDom.prototype.globals = {}

# $._jade provides access to the root objects for unit testing and debugging
$._jade = main: JadeDom, parser: JadeParser