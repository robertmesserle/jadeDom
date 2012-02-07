describe( 'jadeDom', function () {
	var str;

	describe( 'String Parsing', function () {

		describe( 'div#id', function () {
			var $elem = $.jade( 'div#id' );
			it ( 'should be a div tag', function () {
				expect( $elem.is( 'div' ) ).toBe( true );
			} );
			it( 'should have an id of "id"', function () {
				expect( $elem.attr( 'id' ) ).toBe( 'id' );
			} );
		} );

		describe( 'div#id Holy Smokes', function () {
			var $elem = $.jade( 'div#id Holy Smokes' );
			it ( 'should be a div tag', function () {
				expect( $elem.is( 'div' ) ).toBe( true );
			} );
			it( 'should have an id of "id"', function () {
				expect( $elem.attr( 'id' ) ).toBe( 'id' );
			} );
			it( 'should have the text "Holy Smokes"', function () {
				expect( $elem.text() ).toBe( 'Holy Smokes' );
			} );
		} );

		describe( 'div#id.foo.bar', function () {
			var $elem = $.jade( 'div#id.foo.bar' );
			it ( 'should be a div tag', function () {
				expect( $elem.is( 'div' ) ).toBe( true );
			} );
			it( 'should have an id of "id"', function () {
				expect( $elem.attr( 'id' ) ).toBe( 'id' );
			} );
			it( 'should have a class of "foo"', function () {
				expect( $elem.hasClass( 'foo' ) ).toBe( true );
			} );
			it( 'should have a class of "bar"', function () {
				expect( $elem.hasClass( 'bar' ) ).toBe( true );
			} );
		} );

		describe( 'div#id.foo.bar(href=http://www.google.com)', function () {
			var $elem = $.jade( 'div#id.foo.bar(href=http://www.google.com)' );
			it ( 'should be a div tag', function () {
				expect( $elem.is( 'div' ) ).toBe( true );
			} );
			it( 'should have an id of "id"', function () {
				expect( $elem.attr( 'id' ) ).toBe( 'id' );
			} );
			it( 'should have a class of "foo"', function () {
				expect( $elem.hasClass( 'foo' ) ).toBe( true );
			} );
			it( 'should have a class of "bar"', function () {
				expect( $elem.hasClass( 'bar' ) ).toBe( true );
			} );
			it( 'should point to "http://www.google.com"', function () {
				expect( $elem.attr( 'href' ) ).toBe( 'http://www.google.com' );
			} );
		} );

		describe( 'div#id.foo.bar(href=http://www.google.com, title="foobar")', function () {
			var $elem = $.jade( 'div#id.foo.bar(href=http://www.google.com, title="foobar")' );
			it ( 'should be a div tag', function () {
				expect( $elem.is( 'div' ) ).toBe( true );
			} );
			it( 'should have an id of "id"', function () {
				expect( $elem.attr( 'id' ) ).toBe( 'id' );
			} );
			it( 'should have a class of "foo"', function () {
				expect( $elem.hasClass( 'foo' ) ).toBe( true );
			} );
			it( 'should have a class of "bar"', function () {
				expect( $elem.hasClass( 'bar' ) ).toBe( true );
			} );
			it( 'should point to "http://www.google.com"', function () {
				expect( $elem.attr( 'href' ) ).toBe( 'http://www.google.com' );
			} );
			it( 'should have the title "foobar"', function () {
				expect( $elem.attr( 'title' ) ).toBe( 'foobar' );
			} );
		} );

		describe( 'div#id.foo.bar(\'href\'="http://www.google.com", title=foobar)', function () {
			var $elem = $.jade( 'div#id.foo.bar(\'href\'="http://www.google.com", title=foobar)' );
			it ( 'should be a div tag', function () {
				expect( $elem.is( 'div' ) ).toBe( true );
			} );
			it( 'should have an id of "id"', function () {
				expect( $elem.attr( 'id' ) ).toBe( 'id' );
			} );
			it( 'should have a class of "foo"', function () {
				expect( $elem.hasClass( 'foo' ) ).toBe( true );
			} );
			it( 'should have a class of "bar"', function () {
				expect( $elem.hasClass( 'bar' ) ).toBe( true );
			} );
			it( 'should point to "http://www.google.com"', function () {
				expect( $elem.attr( 'href' ) ).toBe( 'http://www.google.com' );
			} );
			it( 'should have the title "foobar"', function () {
				expect( $elem.attr( 'title' ) ).toBe( 'foobar' );
			} );
		} );

		describe( 'div#id.foo.bar(\'href\'="http://www.google.com", title=title with spaces in it)', function () {
			var $elem = $.jade( 'div#id.foo.bar(\'href\'="http://www.google.com", title=title with spaces in it)' );
			it ( 'should be a div tag', function () {
				expect( $elem.is( 'div' ) ).toBe( true );
			} );
			it( 'should have an id of "id"', function () {
				expect( $elem.attr( 'id' ) ).toBe( 'id' );
			} );
			it( 'should have a class of "foo"', function () {
				expect( $elem.hasClass( 'foo' ) ).toBe( true );
			} );
			it( 'should have a class of "bar"', function () {
				expect( $elem.hasClass( 'bar' ) ).toBe( true );
			} );
			it( 'should point to "http://www.google.com"', function () {
				expect( $elem.attr( 'href' ) ).toBe( 'http://www.google.com' );
			} );
			it( 'should have the title "title with spaces in it"', function () {
				expect( $elem.attr( 'title' ) ).toBe( 'title with spaces in it' );
			} );
		} );

		describe( 'div#id.foo.bar(\'href\'="http://www.google.com", title="title with spaces in it, as well as commas")', function () {
			var $elem = $.jade( 'div#id.foo.bar(\'href\'="http://www.google.com", title="title with spaces in it, as well as commas")' );
			it ( 'should be a div tag', function () {
				expect( $elem.is( 'div' ) ).toBe( true );
			} );
			it( 'should have an id of "id"', function () {
				expect( $elem.attr( 'id' ) ).toBe( 'id' );
			} );
			it( 'should have a class of "foo"', function () {
				expect( $elem.hasClass( 'foo' ) ).toBe( true );
			} );
			it( 'should have a class of "bar"', function () {
				expect( $elem.hasClass( 'bar' ) ).toBe( true );
			} );
			it( 'should point to "http://www.google.com"', function () {
				expect( $elem.attr( 'href' ) ).toBe( 'http://www.google.com' );
			} );
			it( 'should have the title "title with spaces in it, as well as commas"', function () {
				expect( $elem.attr( 'title' ) ).toBe( 'title with spaces in it, as well as commas' );
			} );
		} );
	} );

	describe( 'Nesting', function () {

		describe( 'Basic child with text', function () {
			var $elem = $.jade(
				'div.wrapper', [
					'div.inner Holy Smokes'
				]
			);

			it ( 'should be a div tag', function () {
				expect( $elem.is( 'div' ) ).toBe( true );
			} );
			it ( 'should have a class of "wrapper"', function () {
				expect( $elem.hasClass( 'wrapper' ) ).toBe( true );
			} );
			it( 'should have a child that is a div', function () {
				expect( $elem.children( ':first' ).is( 'div' ) ).toBe( true );
			} );
			it( 'should have a child with a class of "inner"', function () {
				expect( $elem.children( ':first' ).is( '.inner' ) ).toBe( true );
			} );
			it( 'should have a child with the text "Holy Smokes"', function () {
				expect( $elem.children( ':first' ).text() ).toBe( 'Holy Smokes' );
			} );
		} );

		describe ( '', function () {
			var $elem = $.jade(
				'div.class_name', [
					'a.inner_class(href=#, title="Some title") Some text'
				]
			);

			it( 'should have a class of "class_name"', function () {
				expect( $elem.is( '.class_name' ) ).toBe( true );
			} );
			it( 'should have a child anchor', function () {
				expect( $elem.children( ':first' ).is( 'a' ) ).toBe( true );
			} );
			it( 'should have a child with a class of "inner_class"', function () {
				expect( $elem.children( ':first' ).is( '.inner_class' ) ).toBe( true );
			} );
			it( 'should have a child anchor that points to "#"', function () {
				expect( $elem.children( ':first' ).attr( 'href' ) ).toBe( '#' );
			} );
			it( 'should have a child anchor with a title of "Some title"', function () {
				expect( $elem.children( ':first' ).attr( 'title' ) ).toBe( 'Some title' );
			} );
			it( 'should have a child anchor that says "Some text"', function () {
				expect( $elem.children( ':first' ).text() ).toBe( 'Some text' );
			} );
		} );

	} );

} );