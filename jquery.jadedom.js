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
			var start = 0,
				cur   = 0,
				char  = false,
				len   = str.length,
				attrs = false,
				text  = false,
				mode  = 'tag',
				tag, classes, id;
			for ( ; cur < len; cur++ ) {
				char = str.charAt( cur );
				switch ( char ) {
					case '(':
						mode = 'attributes';
						start = cur;
						break;
					case ')':
						if ( mode !== 'attributes' ) continue;
						mode = false;
						attrs = str.substring( start, cur ).replace( /[\(\)]+/g, '' ).split( /[\s\,]+/g );
						break;
					case ' ':
						if ( mode === 'attributes' ) continue;
						mode = 'text';
						text = str.substring( cur + 1 );
						break;
				}
				if ( mode === 'text' ) break;
			}
			str = str.substring( 0, cur );
			tag         = str.match( /^[\w\d]+/i );
			classes     = str.match( /\.[\w\d\-\_]+/gi );
			id          = str.match( /\#[\w\d\-\_]+/i ) || [];
			if ( tag && tag.length > 0 ) tag = tag[ 0 ];    // if tag is specified, grab it from the first Array element
			else str = ( tag = 'div' ) + str;               // if not, tag will default to DIV
			elem = document.createElement( tag );
			if ( classes ) elem.className = classes.join( '' ).substring( 1 ).replace( /\./g, ' ' );
			if ( id[ 0 ] ) elem.id = id[ 0 ].substring( 1 );
			if ( attrs[ 0 ] ) this.set_attributes( elem, attrs );
			if ( text[ 0 ] ) elem.appendChild( document.createTextNode( text ) );
			cache[ str ] = elem.cloneNode( false );
			return elem;
		},
		set_attributes : function ( elem, attrs ) {
			var len, split;
			if ( len = attrs.length ) while ( len-- ) {
				split = attrs[ len ].split( /[\[\]\=]/g );
				split[ 0 ] || split.shift();
				split[ split.length - 1 ] || split.pop();
				this.set_attribute( elem, split[ 0 ], split[ 1 ] );
			}
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