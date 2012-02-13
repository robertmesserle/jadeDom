/*! jadeDom v1.0 by Robert Messerle  |  https://github.com/robertmesserle/jadeDom */
( function ( $ ) {

	'use strict';

	function get_property ( obj, namespace, not_found_value ) {
		if ( typeof obj === 'undefined' )   return typeof not_found_value !== 'undefined' ? not_found_value : false;
		if ( namespace.indexOf( '.' ) < 0 ) return typeof obj[ namespace ] !== 'undefined' ? obj[ namespace ] : typeof not_found_value !== 'undefined' ? not_found_value : false;
		var namespace_array  = namespace.split('.'),
			namespace_length = namespace_array.length,
			val              = obj, i;
		for ( i = 0; i < namespace_length; i++ )
			if ( typeof( val = val[ namespace_array[ i ] ] ) === 'undefined' )
				return typeof not_found_value !== 'undefined' ? not_found_value : false;
		return typeof val !== 'undefined' ? val : typeof not_found_value !== 'undefined' ? not_found_value : false;
		}

	function JadeDom () {
		this.lookup_table = {};
		this.logic        = 'none';
		this.last_logic   = 'none';
	}
	JadeDom.prototype = {
		globals: {},
		locals: {},
		init: function ( args ) {
			var ret = this.add_children( false, args, true ),
				$ret = $( ret );
			$ret.lookup = $.proxy( this, 'lookup' );
			return $ret;
		},
		lookup: function ( str ) {
			if ( !str ) return this.lookup_table;
			return this.lookup_table[ str ] || false;
		},
		handle_object: function ( elem, obj ) {
			if ( elem === false ) return this.locals = obj;
			var $elem = $(elem), val;
			for ( var key in obj ) {
				val = obj[ key ];
				switch ( key ) {
					case 'cache': this.cache_lookup( val, $elem ); break;
					default:
						if ( $elem[ key ] ) $elem[ key ]( val );
						else $elem.attr( key, val );
						break;
				}
			}
		},
		cache_lookup: function ( key, $elem ) {
			var keys = key.split( ' ' ),
				i    = keys.length;
			while ( i-- ) {
				key = keys[ i ];
				this.lookup_table[ key ] = this.lookup_table[ key ]
					? this.lookup_table[ key ].add( $elem )
					: $elem
			}
		},
		get_type: function ( arg ) {
			if ( arg instanceof Array ) return 'children';
			if ( typeof arg === 'string' && arg.charAt( 0 ) === '-' ) return 'logic';
			if ( typeof arg === 'string' || arg.jquery || arg.nodeType ) return 'node';
			if ( typeof arg === 'object' ) return 'options';
			return false;
		},
		add_children : function ( elem, children, top_level ) {
			if ( !children.length ) return;
			if ( !this.logic ) {
				this.last_logic = this.logic;
				this.logic = 'none';
				return;
			}
			var last_elem = elem, child, type;
			for ( var i = 0, len = children.length; i < len; i++ ) {
				child = children[ i ];
				type = this.get_type( child );
				switch ( type ) {
					case 'node':
						if ( top_level && elem && elem === last_elem ) ( elem = document.createDocumentFragment() ).appendChild( last_elem );   // switch to fragment if necessary
						last_elem = this.get_node( child );         // get node and store it in last_elem
						if ( elem === false ) elem = last_elem;     // if there is no root elem yet, set it to last_elem
						else elem.appendChild( last_elem );         // otherwise, append it to the existing node
						break;
					case 'logic':       this.handle_logic( child );                                         break;
					case 'children':    this.add_children( this.logic === true ? elem : last_elem, child ); break;
					case 'options':     this.handle_object( last_elem, child );                             break;
				}
			}
			return elem;
		},
		handle_logic: function ( str ) {
			var parts;
			if ( parts = str.match( /^-\s*if[\s\(]+([\w\d_'"]+)(\s*((==)|(>=)|(<=)|(<)|(>)|(===)|(!==)|(!=))\s*([\w\d_'"])+)?[\s\)]*$/ ) ) return this.logic = this.handle_if( parts.slice( 1 ) );
			if ( str.match( /^-\s*else\s*$/ ) ) return this.logic = !this.last_logic;
		},
		remove_undefined: function ( parts ) {
			for ( var i = parts.length; i--; ) if ( typeof parts[ i ] === 'undefined' ) parts.splice( i, 1 );

		},
		handle_if: function ( parts ) {
			this.remove_undefined( parts );
			if ( parts.length === 1 ) {
				return !!this.get_var( parts[ 0 ] );
			} else if ( parts.length > 1 ) {
				switch ( parts[ 3 ] ) {
					case '==':  return this.get_var( parts[ 0 ] ) ==  this.get_var( parts[ 1 ].replace( parts[ 3 ], '' ) );
					case '===': return this.get_var( parts[ 0 ] ) === this.get_var( parts[ 1 ].replace( parts[ 3 ], '' ) );
					case '!==': return this.get_var( parts[ 0 ] ) !== this.get_var( parts[ 1 ].replace( parts[ 3 ], '' ) );
					case '!=':  return this.get_var( parts[ 0 ] ) !=  this.get_var( parts[ 1 ].replace( parts[ 3 ], '' ) );
					case '>':   return this.get_var( parts[ 0 ] ) >   this.get_var( parts[ 1 ].replace( parts[ 3 ], '' ) );
					case '>=':  return this.get_var( parts[ 0 ] ) >=  this.get_var( parts[ 1 ].replace( parts[ 3 ], '' ) );
					case '<':   return this.get_var( parts[ 0 ] ) <   this.get_var( parts[ 1 ].replace( parts[ 3 ], '' ) );
					case '<=':  return this.get_var( parts[ 0 ] ) <=  this.get_var( parts[ 1 ].replace( parts[ 3 ], '' ) );
				}
			}
		},
		get_var: function ( str ) {
			str = $.trim( str );
			var ret;
			switch ( str ) {
				case 'true':    return true;
				case 'false':   return false;
				default:
					return str == parseFloat( str )
						? +str
						: str.toString().charAt( 0 ) === '"' || str.toString().charAt( 0 ) === '\''
							? str.substring( 1, str.length - 1 )
							: this.get_property( str );
			}
		},
		get_property: function ( str ) {
			return get_property( this.locals, str, get_property( this.globals, str, false ) );
		},
		get_node: function ( elem ) {
			if ( typeof elem === 'string' ) return this.get_node_from_string( elem );
			if ( elem.jquery ) return elem.get( 0 );
			if ( elem.nodeType ) return elem;
		},
		get_node_from_string : function ( str ) {
			return new JadeParser( this, str ).elem;
		},
		set_attributes : function ( elem, attrs ) {
			for ( var key in attrs ) this.set_attribute( elem, key, attrs[ key ] );
		},
		set_attribute : function ( elem, key, value ) {
			switch ( key ) {
				case 'class':
				case 'className': elem.className = value;           break;
				case 'style':     elem.style.cssText = value;       break;
				default:          elem.setAttribute( key, value );  break;
			}
		}
	};

	function JadeParser ( parent, str ) {
		this.parent  = parent;
		this.str     = str + ' ';
		this.mode    = this.get_first_mode();
		this.cur     = 0;
		this.char    = false;
		this.len     = str.length;
		this.attrs   = false;
		this.html    = false;
		this.classes = [];
		this.tag     = false;
		this.id      = false;
		this.clss    = false;
		this.elem    = false;

		this.init();
	}
	JadeParser.prototype = {
		mode_lookup: { '#': 'id', '.': 'class', '(': 'attributes', '|': 'html', '=': 'text_variable', '!': 'html_variable' },
		cache: {},
		skip_cache: false,
		init: function () {
			this.variable_replacement();
			if ( this.cache[ this.str ] ) {
				this.elem = this.cache[ this.str ].cloneNode( true );
			} else if ( this.mode === 'html' ) {
				this.elem = this.get_html_fragment( this.str.substring( 0, this.len ).replace( /^\|\s?/, '' ) );
			} else {
				this.parse();
				this.create_element();
				if ( !this.skip_cache ) this.cache[ this.str ] = this.elem.cloneNode( true );
			}
		},
		create_element: function () {
			this.elem = document.createElement( this.tag || 'div' );
			if ( this.id ) this.elem.id = this.id;
			if ( this.classes.length ) this.elem.className = this.classes.join( ' ' );
			if ( this.attrs ) this.parent.set_attributes( this.elem, this.attrs );
			if ( this.html[ 0 ] ) this.elem.innerHTML = this.html;
		},
		escape_html: function ( str ) {
			return str.toString().replace( /&/g, '&ampl;' ).replace( />/g, '&gt;' ).replace( /</g, '&lt;' ).replace( /"/g, '&quot;' );
		},
		get_content: function () {
			if ( this.mode === false ) return;
			this.handle_mode[ this.mode ].apply( this );
		},
		get_first_mode: function () {
			var char = this.str.charAt( 0 );
			return char === '|' ? 'html' : char.match( /\w/ ) ? 'tag' : false;
		},
		get_html_fragment: function ( str ) {
			var frag = document.createDocumentFragment(),
					div  = document.createElement( 'div' ),
					i;
			div.innerHTML = str;
			i = div.childNodes.length;
			while ( i-- ) frag.appendChild( div.childNodes[ 0 ] );
			return frag;
		},
		get_mode: function () {
			this.mode = this.char.match( /\s/ ) ? 'html' : this.mode_lookup[ this.char ] || false;
		},
		handle_mode: {
			'attributes': function () {
				var key, val;
				if ( this.attrs === false ) this.attrs = {};
				key = this.str.substring( this.cur ).match( /^(\"[^\"]+\")|(\'[^\']+\')|([^=]+)/ )[ 0 ];
				this.cur += key.length;
				key = key.replace( /[\'\"]/g, '' );
				if ( this.str.charAt( this.cur ) === '=' ) {
					val = this.str.substring( this.cur + 1 ).match( /^(\"[^\"]+\")|(\'[^\']+\')|([^\,\)]+)/ )[ 0 ];
					this.cur += val.length + 1;
					val = val.replace( /[\'\"]/g, '' );
				} else {
					val = key;
				}
				this.attrs[ key ] = val;
				if ( this.len < this.cur + 1 );
				else if ( this.str.charAt( this.cur ) === ')' ) this.mode = false;
				else if ( key = this.str.substring( this.cur ).match( /^\,\s*/ ) ) this.cur += key.length;
			},
			'class': function () {
				var cls = this.str.substring( this.cur ).match( /^[\w\d\:\_\-]+/ )[ 0 ];
				this.classes.push( cls );
				this.jump_to_next( cls.length );
			},
			'html': function () {
				this.html = this.str.substring( this.cur, this.len ).replace( /^\s/, '' );
				this.mode = true;
			},
			'html_variable': function () {
				if ( this.str.charAt( this.cur ) !== '=' ) return;
				var key = $.trim( this.str.substring( this.cur + 1, this.len ) );
				this.html = this.parent.locals[ key ] || this.parent.globals[ key ] || key;
				this.mode = true;
				this.skip_cache = true;
			},
			'id': function () {
				this.id = this.str.substring( this.cur ).match( /^[\w\d\:\_\-]+/ )[ 0 ];
				this.jump_to_next( this.id.length );
			},
			'tag': function () {
				this.tag = this.str.substring( this.cur ).match( /^[\w\d\:\_\-]+/ )[ 0 ] || 'div';
				this.jump_to_next( this.tag.length );
			},
			'text_variable': function () {
				var key = $.trim( this.str.substring( this.cur, this.len ) );
				this.html = this.escape_html( this.parent.locals[ key ] || this.parent.globals[ key ] || key );
				this.mode = true;
				this.str = false;
				this.skip_cache = true;
			}
		},
		jump_to_next: function ( len ) {
			this.mode = false;
			this.cur += len;
		},
		parse: function () {
			while ( this.cur < this.len && this.mode !== true ) {
				if ( this.mode !== 'tag' ) this.char = this.str.charAt( this.cur++ );
				if ( this.mode === false ) this.get_mode();
				this.get_content();
			}
		},
		replace: function ( map ) {
			this.replace_escaped( map );
			this.replace_unescaped( map );
		},
		replace_escaped: function ( map ) {
			var matches = this.str.match( /#\{[\w\d_\$\.]+\}/g ),
				i       = matches ? matches.length : 0;
			while ( i-- ) {
				this.str = this.str.replace( matches[ i ], this.escape_html( get_property( map, matches[ i ].replace( /[#\{\}]*/g, '' ), matches[ i ] ) ) );
			}
		},
		replace_unescaped: function ( map ) {
			var matches = this.str.match( /!\{[\w\d_\$\.]+\}/g ),
				i       = matches ? matches.length : 0;
			while ( i-- ) this.str = this.str.replace( matches[ i ], get_property( map, matches[ i ].replace( /[!\{\}]*/g, '' ), matches[ i ] ) );
		},
		variable_replacement: function () {
			this.replace( this.parent.locals );
			this.replace( this.parent.globals );
			this.len = this.str.length - 1;
		}
	};

	$.jade = function () {
		var jade = new JadeDom();
		return jade.init( Array.apply( null, arguments ) );
	};
	//-- manage globals
	$.jade.set_globals = function ( obj ) {
		JadeDom.prototype.globals = obj;
	};
	$.jade.add_globals = function ( obj ) {
		$.extend( JadeDom.prototype.globals, obj );
	};
	$.jade.clear_globals = function () {
		JadeDom.prototype.globals = {};
	};
	//-- $._jade provides access to the root objects for unit tests and debugging
	$._jade = {
		main: JadeDom,
		parser: JadeParser
	};

} )( jQuery );