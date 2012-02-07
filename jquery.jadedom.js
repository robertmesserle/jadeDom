/*! jadeDom v1.0 by Robert Messerle  |  https://github.com/robertmesserle/jadeDom */
( function ( $ ) {

	var cache = {};

	function jadeDom () {
		this.lookup_table = {};
	}
	jadeDom.prototype = {
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
		handle_object : function ( elem, obj ) {
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
			if ( typeof arg === 'string' || arg.jquery || arg.nodeType ) return 'node';
			if ( typeof arg === 'object' ) return 'options';
			return false;
		},
		add_children : function ( elem, children, top_level ) {
			if ( !children.length ) return;
			var last_elem = elem, child, type;
			for ( var i = 0, len = children.length; i < len; i++ ) {
				child = children[ i ];
				type = this.get_type( child );
				switch ( type ) {
					case 'node':
						if ( top_level && elem !== false ) ( elem = document.createDocumentFragment() ).appendChild( last_elem );   // switch to fragment if necessary
						last_elem = this.get_node( child );         // get node and store it in last_elem
						if ( elem === false ) elem = last_elem;     // if there is no root elem yet, set it to last_elem
						else elem.appendChild( last_elem );         // otherwise, append it to the existing node
						break;
					case 'children':    this.add_children( last_elem, child );  break;
					case 'options':     this.handle_object( last_elem, child ); break;
				}
			}
			return elem;
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
		this.mode    = str.charAt( 0 ) === '|' ? 'text' : 'tag';
		this.cur     = 0;
		this.char    = false;
		this.len     = str.length;
		this.attrs   = false;
		this.text    = false;
		this.classes = [];
		this.tag     = false;
		this.id      = false;
		this.clss    = false;
		this.elem    = false;

		if ( this.cache[ str ] ) {
			this.elem = this.cache[ str ].cloneNode( false );
		} else if ( this.mode === 'text' ) {
			this.elem = document.createTextNode( this.str.substring( 0, this.len ).replace( /^\|\s?/, '' ) );
		} else {
			this.parse();
			this.create_element();
			this.cache[ str ] = this.elem.cloneNode( false );
		}
	}
	JadeParser.prototype = {
		mode_lookup: { '#': 'id', '.': 'class', '(': 'attributes', '|': 'text' },
		cache: {},
		jump_to_next: function ( len ) {
			this.mode = false;
			this.cur += len - 1;
		},
		create_element: function () {
			this.elem = document.createElement( this.tag || 'div' );
			if ( this.id ) this.elem.id = this.id;
			if ( this.classes.length ) this.elem.className = this.classes.join( ' ' );
			if ( this.attrs ) this.parent.set_attributes( this.elem, this.attrs );
			if ( this.text[ 0 ] ) this.elem.appendChild( document.createTextNode( this.text ) );
		},
		get_mode: function () {
			this.mode = this.char.match( /\s/ ) ? 'text' : this.mode_lookup[ this.char ] || false;
			if ( this.mode === 'text' ) this.get_content();
		},
		handle_mode: {
			'tag': function () {
				this.tag = this.str.substring( this.cur ).match( /^[\w\d\:\_\-]+/ );[ 0 ] || 'div';
				this.jump_to_next( this.tag.length );
			},
			'class': function () {
				var cls = this.str.substring( this.cur ).match( /^[\w\d\:\_\-]+/ )[ 0 ];
				this.classes.push( cls );
				this.jump_to_next( cls.length );
			},
			'id': function () {
				this.id = this.str.substring( this.cur ).match( /^[\w\d\:\_\-]+/ )[ 0 ];
				this.jump_to_next( this.id.length );
			},
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
			'text': function () {
				this.text = this.str.substring( this.cur, this.len ).replace( /^\s+/, '' );
				this.str = this.str.substring( 0, this.cur );
			}
		},
		get_content: function () {
			this.handle_mode[ this.mode ].apply( this );
		},
		parse: function () {
			for ( ; this.cur < this.len && this.mode !== 'text'; this.cur++ ) {
				this.char = this.str.charAt( this.cur );
				if ( this.mode === false ) this.get_mode();
				else this.get_content();
			}
		}
	};

	$.jade = function () {
		var jade = new jadeDom();
		return jade.init( arguments );
	};

} )( jQuery );