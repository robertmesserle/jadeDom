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
			if ( typeof cache[ str ] !== 'undefined' ) return cache[ str ].cloneNode( false );
			if ( str.charAt( 0 ) === '|' ) return document.createTextNode( str.replace( /^\|\s*/, '' ) );
			str += ' ';
			var start   = 0,
				cur     = 0,
				char    = false,
				len     = str.length,
				attrs   = false,
				text    = false,
				mode    = 'tag',
				classes = [],
				regexp  = /^[\w\d\:\_\-]+/,
				key, val, tag, id, cls;
			function reset_mode ( len ) {
				mode = false;
				cur += len - 1;
			}
			for ( ; cur < len; cur++ ) {
				char = str.charAt( cur );
				console.log( char, mode );
				switch ( mode ) {
					case 'tag':
						tag = str.substring( cur ).match( regexp )[ 0 ] || 'div';
						reset_mode( tag.length );
						break;
					case 'id':
						id = str.substring( cur ).match( regexp )[ 0 ];
						reset_mode( id.length );
						break;
					case 'class':
						cls = str.substring( cur ).match( regexp )[ 0 ];
						console.log( cls );
						classes.push( cls );
						reset_mode( cls.length );
						break;
					case 'attributes_key':
						if ( attrs === false ) attrs = {};
						key = str.substring( cur ).match( /^(\"[^\"]+\")|(\'[^\']+\')|([^=]+)/ )[ 0 ];
						cur += key.length;
						key = key.replace( /[\'\"]/g, '' );
						if ( str.charAt( cur ) === '=' ) {
							val = str.substring( cur + 1 ).match( /^(\"[^\"]+\")|(\'[^\']+\')|([^\,\)]+)/ )[ 0 ];
							cur += val.length + 1;
							val = val.replace( /[\'\"]/g, '' );
						} else {
							val = key;
						}
						attrs[ key ] = val;
						if ( cur > str.length - 2 ) break;
						else if ( str.charAt( cur ) === ')' ) mode = false;
						else if ( key = str.substring( cur ).match( /^\,\s*/ ) ) cur += key.length;
						break;
					default:
						if ( char.match( /\w/ ) ) {
							mode = 'text';
							text = str.substring( cur, str.length - 1 ).replace( /^\s+/, '' );
							str = str.substring( 0, cur );
							break;
						}
						if ( char === '#' ) { mode = 'id';             break; }
						if ( char === '.' ) { mode = 'class';          break; }
						if ( char === '(' ) { mode = 'attributes_key'; break; }
				}
				if ( mode === 'text' ) break;
			}
			elem = this.create_element( tag || 'div', id, classes, attrs, text );
			cache[ str ] = elem.cloneNode( false );
			return elem;
		},
		create_element: function ( tag, id, classes, attrs, text ) {
			var elem = document.createElement( tag || 'div' );
			if ( id ) elem.id = id;
			if ( classes.length ) elem.className = classes.join( ' ' );
			if ( attrs ) this.set_attributes( elem, attrs );
			if ( text[ 0 ] ) elem.appendChild( document.createTextNode( text ) );
			return elem;
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

	$.jade = function () {
		var jade = new jadeDom();
		return jade.init( arguments );
	};

} )( jQuery );