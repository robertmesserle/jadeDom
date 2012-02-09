describe( 'jadeDom Features', function () {
	var str;

	describe( 'String Parsing', function () {

		describe( '#id', function () {
			var $elem = $.jade( '#id' );
			it( 'should default to a div', function () {
				expect( $elem.is( 'div' ) ).toBe( true );
			} );
			it( 'should have an id of "id"', function () {
				expect( $elem.is( '#id' ) ).toBe( true );
			} );
		} );

		describe( 'div#id', function () {
			var $elem = $.jade( 'div#id' );
			it( 'should be a div tag', function () {
				expect( $elem.is( 'div' ) ).toBe( true );
			} );
			it( 'should have an id of "id"', function () {
				expect( $elem.attr( 'id' ) ).toBe( 'id' );
			} );
		} );

		describe( 'div#id Holy Smokes', function () {
			var $elem = $.jade( 'div#id Holy Smokes' );
			it( 'should be a div tag', function () {
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
			it( 'should be a div tag', function () {
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
			it( 'should be a div tag', function () {
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
			it( 'should be a div tag', function () {
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
			it( 'should be a div tag', function () {
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
			it( 'should be a div tag', function () {
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
			it( 'should be a div tag', function () {
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

			it( 'should be a div tag', function () {
				expect( $elem.is( 'div' ) ).toBe( true );
			} );
			it( 'should have a class of "wrapper"', function () {
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

		describe ( 'Child with multiple attributes', function () {
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

		describe ( 'Child with multiple attributes applied through object', function () {
			var $elem = $.jade(
				'div.class_name', [
					'a.inner_class', { text: 'Some text', title: 'Some title', href: '#' }
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

		describe( 'Anchor tag with inline span and text', function () {
			var $elem = $.jade(
				'a.some_class(href=#, title=Some title)', [
					'| This is some text with a ',
					'span span',
					'|  in the middle of it.'
				]
			);
			it( 'should be an anchor tag with a calss of "some_class"', function () {
				expect( $elem.is( 'a' ) ).toBe( true );
				expect( $elem.is( '.some_class' ) ).toBe( true );
			} );
			it( 'should have a span tag with the text "span"', function () {
				expect( $elem.children( 'span' ).length ).toBe( 1 );
				expect( $elem.children( 'span:first' ).text() ).toBe( 'span' );
			} );
			it( 'should have the text "This is some text with a span in the middle of it."', function () {
				expect( $elem.text() ).toBe( 'This is some text with a span in the middle of it.' );
			} );
		} );

		describe( 'Anchor tag with inline span and text as html', function () {
			var $elem = $.jade(
				'a.some_class(href=#, title=Some title)', [
					'| This is some text with a <span>span</span> in the middle of it.'
				]
			);
			it( 'should be an anchor tag with a calss of "some_class"', function () {
				expect( $elem.is( 'a' ) ).toBe( true );
				expect( $elem.is( '.some_class' ) ).toBe( true );
			} );
			it( 'should have a span tag with the text "span"', function () {
				expect( $elem.children( 'span' ).length ).toBe( 1 );
				expect( $elem.children( 'span:first' ).text() ).toBe( 'span' );
			} );
			it( 'should have the text "This is some text with a span in the middle of it."', function () {
				expect( $elem.text() ).toBe( 'This is some text with a span in the middle of it.' );
			} );
		} );

		describe( 'Anchor tag with inline span and text (from cache)', function () {
			var $elem = $.jade(
				'a.some_class(href=#, title=Some title)', [
					'| This is some text with a ',
					'span span',
					'|  in the middle of it.'
				]
			);
			it( 'should be an anchor tag with a calss of "some_class"', function () {
				expect( $elem.is( 'a' ) ).toBe( true );
				expect( $elem.is( '.some_class' ) ).toBe( true );
			} );
			it( 'should have a span tag with the text "span"', function () {
				expect( $elem.children( 'span' ).length ).toBe( 1 );
				expect( $elem.children( 'span:first' ).text() ).toBe( 'span' );
			} );
			it( 'should have the text "This is some text with a span in the middle of it."', function () {
				expect( $elem.text() ).toBe( 'This is some text with a span in the middle of it.' );
			} );
		} );

	} );

	describe( 'Variable Replacement', function () {

		describe( 'Unescaped', function () {

			describe( 'Basic token replacement', function () {
				var $elem = $.jade( { name: '<b>Robert</b>' }, 'h1#welcome Hello !{name}!' );
				it( 'should be an h1 tag', function () {
					expect( $elem.is( 'h1' ) ).toBe( true );
				} );
				it( 'should say, "Hello Robert!"', function () {
					expect( $elem.text() ).toBe( 'Hello Robert!' );
				} );
				it( 'should have "Robert" bolded', function () {
					expect( $elem.html() ).toBe( 'Hello <b>Robert</b>!' );
				} );
			} );

			describe( 'Token replacement with multiple instances of the same token', function () {
				var $elem = $.jade( { name: 'Robert' }, 'h1#hello Hello #{name}!  Your name is !{name}!' );
				it( 'should be an h1 tag', function () {
					expect( $elem.is( 'h1' ) ).toBe( true );
				} );
				it( 'should say "Hello Robert!  Your name is Robert!', function () {
					expect( $elem.text() ).toBe( 'Hello Robert!  Your name is Robert!' );
				} );
			} );

			describe( 'Token replacement with nested DOM elements.', function () {
				var $elem = $.jade( { name: 'Robert' },
					'h1#name !{name} ', [
						'span !{name}'
					]
				);
				it( 'should say "Robert Robert"', function () {
					expect( $elem.text() ).toBe( 'Robert Robert' );
				} );
				it( 'should be an h1 tag', function () {
					expect( $elem.is( 'h1' ) ).toBe( true );
				} );
				it( 'should have a child span tag', function () {
					expect( $elem.children( 'span' ).length ).toBeGreaterThan( 0 );
				} );
				it( 'should have a child span tag with the text "Robert"', function () {
					expect( $elem.children( 'span:first' ).text() ).toBe( 'Robert' );
				} );
			} );

		} );

		describe( 'Escaped', function () {

			describe( 'Basic token replacement', function () {
				var $elem = $.jade( { name: '<b>Robert</b>' }, 'h1#welcome Hello #{name}!' );
				it( 'should be an h1 tag', function () {
					expect( $elem.is( 'h1' ) ).toBe( true );
				} );
				it( 'should say, "Hello Robert!"', function () {
					expect( $elem.text() ).toBe( 'Hello <b>Robert</b>!' );
				} );
				it( 'should have escaped the bold tag', function () {
					expect( $elem.html() ).toBe( 'Hello &lt;b&gt;Robert&lt;/b&gt;!' );
				} );
			} );

			describe( 'Token replacement with multiple instances of the same token', function () {
				var $elem = $.jade( { name: 'Robert' }, 'h1#hello Hello #{name}!  Your name is #{name}!' );
				it( 'should be an h1 tag', function () {
					expect( $elem.is( 'h1' ) ).toBe( true );
				} );
				it( 'should say "Hello Robert!  Your name is Robert!', function () {
					expect( $elem.text() ).toBe( 'Hello Robert!  Your name is Robert!' );
				} );
			} );

			describe( 'Token replacement with nested DOM elements.', function () {
				var $elem = $.jade( { name: 'Robert' },
					'h1#name #{name} ', [
						'span #{name}'
					]
				);
				it( 'should say "Robert Robert"', function () {
					expect( $elem.text() ).toBe( 'Robert Robert' );
				} );
				it( 'should be an h1 tag', function () {
					expect( $elem.is( 'h1' ) ).toBe( true );
				} );
				it( 'should have a child span tag', function () {
					expect( $elem.children( 'span' ).length ).toBeGreaterThan( 0 );
				} );
				it( 'should have a child span tag with the text "Robert"', function () {
					expect( $elem.children( 'span:first' ).text() ).toBe( 'Robert' );
				} );
			} );

            describe( 'Variable for inner text with =', function () {
                var $elem = $.jade( { name: 'Robert' }, 'div#id= name' );
                it( 'should be a div', function () {
                    expect( $elem.is( 'div' ) ).toBe( true );
                } );
                it( 'should have an id of "id"', function () {
                    expect( $elem.is( '#id' ) ).toBe( true );
                } );
                it( 'should contain the text "Robert"', function () {
                    expect( $elem.text() ).toBe( 'Robert' );
                } );
            } );

		} );

	} );

	describe( 'Variable Caching', function () {

		describe( 'Basic variable caching', function () {
			var $elem = $.jade( 'div#something Howdy', { cache: 'something' } );
			it( 'should be a div', function () {
				expect( $elem.is( 'div' ) ).toBe( true );
			} );
			it( 'should have an id of "something"', function () {
				expect( $elem.is( '#something' ) ).toBe( true );
			} );
			it( 'should have the text of "Howdy"', function () {
				expect( $elem.text() ).toBe( 'Howdy' );
			} );
			it( 'should be returned when I lookup "something"', function () {
				expect( $elem.lookup( 'something' ).get( 0 ) ).toBe( $elem.get( 0 ) );
			} );
		} );

		describe( 'Multiple cached DOM elements', function () {
			var $elem = $.jade(
				'div#wrapper', { cache: 'wrapper' }, [
					'div#inner', { cache: 'inner' }
				]
			);
			it( 'should be able to lookup "wrapper"', function () {
				expect( $elem.lookup( 'wrapper' ).get( 0 ) ).toBe( $elem.get( 0 ) );
			} );
			it( 'should be able to lookup "inner"', function () {
				expect( $elem.lookup( 'inner' ).get( 0 ) ).toBe( $elem.children( '#inner' ).get( 0 ) );
			} );
		} );

	} );

} );