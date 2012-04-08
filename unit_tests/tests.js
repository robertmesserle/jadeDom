require.config( {
  priority: [ 'jquery', 'jasmine' ]
} );
require( [ 'cs!../jquery.jadedom', 'jasmine-html' ], function () {

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

      describe( 'img(src=/img/portfolio/center_bg.png, alt="", width=1000, height=400)', function () {
        var $elem = $.jade( 'img(src=/img/portfolio/center_bg.png, alt="", width=1000, height=400)' );
        it( 'should be an img', function () {
          expect( $elem.is( 'img' ) ).toBe( true );
        } );
        it( 'should have a src of /img/portfolio/center_bg.png', function () {
          expect( $elem.attr( 'src' ) ).toBe( '/img/portfolio/center_bg.png' );
        } );
        it( 'should have an alt of ""', function () {
          expect( $elem.attr( 'alt' ) ).toBe( '' );
        } );
        it( 'should have a width of 1000', function () {
          expect( $elem.attr( 'width' ) ).toBe( '1000' );
        } );
        it( 'should have a height of 400', function () {
          expect( $elem.attr( 'height' ) ).toBe( '400' );
        } );
      } );

      describe( 'img(src=!{src}, alt="", width=1000, height=400)', function () {
        var $elem = $.jade( { src: '/img/portfolio/center_bg.png' }, 'img(src=!{src}, alt="", width=1000, height=400)' );
        it( 'should be an img', function () {
          expect( $elem.is( 'img' ) ).toBe( true );
        } );
        it( 'should have a src of /img/portfolio/center_bg.png', function () {
          expect( $elem.attr( 'src' ) ).toBe( '/img/portfolio/center_bg.png' );
        } );
        it( 'should have an alt of ""', function () {
          expect( $elem.attr( 'alt' ) ).toBe( '' );
        } );
        it( 'should have a width of 1000', function () {
          expect( $elem.attr( 'width' ) ).toBe( '1000' );
        } );
        it( 'should have a height of 400', function () {
          expect( $elem.attr( 'height' ) ).toBe( '400' );
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

          describe( 'Text example from Jade documentation', function () {
              var $elem = $.jade(
                  'p', [
                      '| foo bar baz ',
                      '| rawr rawr ',
                      '| super cool ',
                      '| go jade go '
                  ]
              );
              it( 'should be a p tag', function () {
                  expect( $elem.is( 'p' ) ).toBe( true );
              } );
              if( 'should contain the text "foo bar baz rawr rawr super cool go jade go"', function () {
                  expect( $elem.text() ).toBe( 'foo bar baz rawr rawr super cool go jade go' );
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

      describe( 'Multiple root level elements', function () {

        it( 'should support 3 root level elements', function () {
          var $wrapper = $.jade( 'div' );
          $wrapper.html( $.jade(
            $('<div class="first" />'),
            'div.second',
            'div.third'
          ) );
          expect( $wrapper.children( ':first' ).is( 'div.first' ) ).toBe( true );
          expect( $wrapper.children( 'div.second' ).length ).toBeGreaterThan( 0 );
          expect( $wrapper.children( ':last' ).is( 'div.third' ) ).toBe( true );
        } );

      } );

      describe( 'Many levels deep', function () {

        describe( '4 levels of div\'s', function () {
          var $elem = $.jade(
            'div', [
              'div', [
                'div', [
                  'div'
                ]
              ]
            ]
          );

          it( 'should have 1 level of div\'s', function () {
            expect( $elem.filter( 'div' ).length ).toBe( 1 );
          } );

          it( 'should have 2 levels of div\'s', function () {
            expect( $elem.filter( 'div' ).children( 'div' ).length ).toBe( 1 );
          } );

          it( 'should have 3 levels of div\'s', function () {
            expect( $elem.filter( 'div' ).children( 'div' ).children( 'div' ).length ).toBe( 1 );
          } );

          it( 'should have 4 levels of div\'s', function () {
            expect( $elem.filter( 'div' ).children( 'div' ).children( 'div' ).children( 'div' ).length ).toBe( 1 );
          } );
        } );

      } );

    } );

    describe( 'Variable Replacement', function () {

      describe( 'Locals', function () {

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

                describe( 'Variable for inner html with !=', function () {
                    var $elem = $.jade( { name: '<b>Robert</b>' }, 'div#id!= name' );
                    it( 'should be a div', function () {
                        expect( $elem.is( 'div' ) ).toBe( true );
                    } );
                    it( 'should have an id of "id"', function () {
                        expect( $elem.is( '#id' ) ).toBe( true );
                    } );
                    it( 'should have a child b tag', function () {
                        expect( $elem.children( 'b' ).length ).toBeGreaterThan( 0 );
                    } );
                    it( 'should contain bold text "Robert"', function () {
                        expect( $elem.html() ).toBe( '<b>Robert</b>' );
                    } );
                } );

          describe( 'Nested variables: foo.bar', function () {
            var $elem = $.jade( { foo: { bar: 'baz' } },
              'div.something !{foo.bar}'
            );

            it( 'should be a div', function () {
              expect( $elem.is( 'div' ) ).toBe( true );
            } );
            it( 'should have a class of "something"', function () {
              expect( $elem.is( '.something' ) ).toBe( true );
            } );
            it( 'should have the text "baz"', function () {
              expect( $elem.text() ).toBe( 'baz' );
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

      describe( 'Globals', function () {

        describe( '$.jade.set_globals', function () {

          it( 'should set the globals object', function () {
            $.jade.set_globals( { foo: 'bar' } );
            expect( $._jade.main.prototype.globals.foo ).toBe( 'bar' );
          } );

        } );

        describe( '$.jade.add_globals', function () {

          it( 'should extend the existing object with any new properties', function () {
            $.jade.add_globals( { bar: 'baz' } );
            expect( $._jade.main.prototype.globals.foo ).toBe( 'bar' );
            expect( $._jade.main.prototype.globals.bar ).toBe( 'baz' );
          } );

        } );

        describe( '$.jade.clear_globals', function () {

          it( 'should clear the globals object', function () {
            $.jade.clear_globals();
            var i = false;
            for ( var i in $._jade.main.prototype.globals );
            expect( i ).toBe( false );
          } );

        } );

        describe( 'Global Replacement', function () {
          $.jade.set_globals( { foo: 'bar', bar: 'baz' } );

          describe( 'Globals: p foo is !{foo}, while bar is #{bar}.', function () {
            var $elem = $.jade( 'p foo is !{foo}, while bar is #{bar}.' );
            it( 'should be a p tag', function () {
              expect( $elem.is( 'p' ) ).toBe( true );
            } );
            it( 'should replace foo and bar from globals', function () {
              expect( $elem.text() ).toBe( 'foo is bar, while bar is baz.' );
            } );
          } );

          describe( 'Mixed: p foo is !{foo}, while bar is #{bar}.', function () {
            var $elem = $.jade( { foo: 'not bar' },
              'p foo is !{foo}, while bar is #{bar}.'
            );
            it( 'should be a p tag', function () {
              expect( $elem.is( 'p' ) ).toBe( true );
            } );
            it( 'should override globals with locals when performing replacement', function () {
              expect( $elem.text() ).toBe( 'foo is not bar, while bar is baz.' );
            } );
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

    describe( 'DOM Element Caching', function () {

      describe( 'Caching with variable substitution', function () {

        it( 'should not cache the string until after substitution has occurred', function () {
          var str = 'div !{name}';
          expect( $.jade( { name: 'Foo' }, str ).text() ).toBe( 'Foo' );
          expect( $.jade( { name: 'Bar' }, str ).text() ).toBe( 'Bar' );
        } );

        it( 'should not cache the tag when = is used to set string contents', function () {
          var str = 'div= name';
          expect( $.jade( { name: 'Foo' }, str ).text() ).toBe( 'Foo' );
          expect( $.jade( { name: 'Bar' }, str ).text() ).toBe( 'Bar' );
        } );

        it( 'should not cache the tag when != is used to set string contents', function () {
          var str = 'div!= name';
          expect( $.jade( { name: 'Foo' }, str ).text() ).toBe( 'Foo' );
          expect( $.jade( { name: 'Bar' }, str ).text() ).toBe( 'Bar' );
        } );

      } );

    } );

    describe( 'Loops and Logic', function () {

      describe( 'if()', function () {

        describe( 'if (true)', function () {

          var $elem = $.jade(
            'div.wrapper', [
              'div.foo',
              '- if (true)', [
                'div.bar'
              ],
              'div.baz'
            ]
          );

          it( 'should have 3 children', function () {
            expect( $elem.children().length ).toBe( 3 );
          } );
          it( 'should have div.foo, div.bar, and div.baz', function () {
            expect( $elem.children( 'div.foo' ).length ).toBe( 1 );
            expect( $elem.children( 'div.bar' ).length ).toBe( 1 );
            expect( $elem.children( 'div.baz' ).length ).toBe( 1 );
          } );

        } );

        describe( 'if (true == true)', function () {

          var $elem = $.jade(
            'div.wrapper', [
              'div.foo',
              '- if (true==true)', [
                'div.bar'
              ],
              'div.baz'
            ]
          );

          it( 'should have 3 children', function () {
            expect( $elem.children().length ).toBe( 3 );
          } );
          it( 'should have div.foo, div.bar, and div.baz', function () {
            expect( $elem.children( 'div.foo' ).length ).toBe( 1 );
            expect( $elem.children( 'div.bar' ).length ).toBe( 1 );
            expect( $elem.children( 'div.baz' ).length ).toBe( 1 );
          } );
        } );

        describe( 'if (true == false)', function () {

          var $elem = $.jade(
            'div.wrapper', [
              'div.foo',
              '- if (true==false)', [
                'div.bar'
              ],
              'div.baz'
            ]
          );

          it( 'should have 2 children', function () {
            expect( $elem.children().length ).toBe( 2 );
          } );
          it( 'should have div.foo and div.baz, but not div.bar', function () {
            expect( $elem.children( 'div.foo' ).length ).toBe( 1 );
            expect( $elem.children( 'div.bar' ).length ).toBe( 0 );
            expect( $elem.children( 'div.baz' ).length ).toBe( 1 );
          } );
        } );

        describe( 'if ( 1 == 1 )', function () {

          var $elem = $.jade(
            'div.wrapper', [
              'div.foo',
              '- if ( 1 == 1 )', [
                'div.bar'
              ],
              'div.baz'
            ]
          );

          it( 'should have 3 children', function () {
            expect( $elem.children().length ).toBe( 3 );
          } );
          it( 'should have div.foo, div.bar, and div.baz', function () {
            expect( $elem.children( 'div.foo' ).length ).toBe( 1 );
            expect( $elem.children( 'div.bar' ).length ).toBe( 1 );
            expect( $elem.children( 'div.baz' ).length ).toBe( 1 );
          } );
        } );

        describe( 'if ( 1 >= 1 )', function () {

          var $elem = $.jade(
            'div.wrapper', [
              'div.foo',
              '- if ( 1 >= 1 )', [
                'div.bar'
              ],
              'div.baz'
            ]
          );

          it( 'should have 3 children', function () {
            expect( $elem.children().length ).toBe( 3 );
          } );
          it( 'should have div.foo, div.bar, and div.baz', function () {
            expect( $elem.children( 'div.foo' ).length ).toBe( 1 );
            expect( $elem.children( 'div.bar' ).length ).toBe( 1 );
            expect( $elem.children( 'div.baz' ).length ).toBe( 1 );
          } );
        } );

        describe( 'if ( 1 >= 2 )', function () {

          var $elem = $.jade(
            'div.wrapper', [
              'div.foo',
              '- if ( 1 >= 2 )', [
                'div.bar'
              ],
              'div.baz'
            ]
          );

          it( 'should have 3 children', function () {
            expect( $elem.children().length ).toBe( 2 );
          } );
          it( 'should have div.foo and div.baz', function () {
            expect( $elem.children( 'div.foo' ).length ).toBe( 1 );
            expect( $elem.children( 'div.bar' ).length ).toBe( 0 );
            expect( $elem.children( 'div.baz' ).length ).toBe( 1 );
          } );
        } );

        describe( 'if ( 1 >= 1 )', function () {

          var $elem = $.jade(
            'div.wrapper', [
              'div.foo',
              '- if ( 1 >= 1 )', [
                'div.bar'
              ],
              'div.baz'
            ]
          );

          it( 'should have 3 children', function () {
            expect( $elem.children().length ).toBe( 3 );
          } );
          it( 'should have div.foo, div.bar, and div.baz', function () {
            expect( $elem.children( 'div.foo' ).length ).toBe( 1 );
            expect( $elem.children( 'div.bar' ).length ).toBe( 1 );
            expect( $elem.children( 'div.baz' ).length ).toBe( 1 );
          } );

        } );

        describe( 'if ( something > something_else ) // true', function () {

          var $elem = $.jade( { something: 2, something_else: 1 },
            'div.wrapper', [
              'div.foo',
              '- if ( something > something_else )', [
                'div.bar'
              ],
              'div.baz'
            ]
          );

          it( 'should have 3 children', function () {
            expect( $elem.children().length ).toBe( 3 );
          } );
          it( 'should have div.foo, div.bar, and div.baz', function () {
            expect( $elem.children( 'div.foo' ).length ).toBe( 1 );
            expect( $elem.children( 'div.bar' ).length ).toBe( 1 );
            expect( $elem.children( 'div.baz' ).length ).toBe( 1 );
          } );
        } );

        describe( 'if ( something == "moose" ) // true', function () {

          var $elem = $.jade( { something: 'moose' },
            'div.wrapper', [
              'div.foo',
              '- if ( something == "moose" )', [
                'div.bar'
              ],
              'div.baz'
            ]
          );

          it( 'should have 3 children', function () {
            expect( $elem.children().length ).toBe( 3 );
          } );
          it( 'should have div.foo, div.bar, and div.baz', function () {
            expect( $elem.children( 'div.foo' ).length ).toBe( 1 );
            expect( $elem.children( 'div.bar' ).length ).toBe( 1 );
            expect( $elem.children( 'div.baz' ).length ).toBe( 1 );
          } );
        } );

        describe( 'if ( something == "meese" ) // false', function () {

          var $elem = $.jade( { something: 'moose' },
            'div.wrapper', [
              'div.foo',
              '- if ( something == "meese" )', [
                'div.bar'
              ],
              'div.baz'
            ]
          );

          it( 'should have 3 children', function () {
            expect( $elem.children().length ).toBe( 2 );
          } );
          it( 'should have div.foo and div.baz', function () {
            expect( $elem.children( 'div.foo' ).length ).toBe( 1 );
            expect( $elem.children( 'div.bar' ).length ).toBe( 0 );
            expect( $elem.children( 'div.baz' ).length ).toBe( 1 );
          } );
        } );

        describe( 'logic nested within if: link example from robertmesserle.com', function () {
          var $elem = $.jade( { url: 'http://www.google.com' },
            'dl', [
              '- if url', [
                'dt Link',
                'dd', [ 'a(href=!{url}) #{url}' ]
              ]
            ]
          );
          it( 'shouild be a dl', function () {
            expect( $elem.is( 'dl' ) ).toBe( true );
          } );
          it( 'should contain a dt with the text "Link"', function () {
            expect( $elem.children( 'dt' ).length ).toBe( 1 );
            expect( $elem.children( 'dt' ).text() ).toBe( 'Link' );
          } );
          it( 'should container a dd with a link', function () {
            expect( $elem.children( 'dd' ).length ).toBe( 1 );
            expect( $elem.children( 'dd' ).children( 'a' ).length ).toBe( 1 );
          } );
          it( 'should link to the url', function () {
            expect( $elem.find( 'a' ).attr( 'href' ) ).toBe( 'http://www.google.com' );
          } );
          it( 'should contain the text of the url', function () {
            expect( $elem.find( 'a' ).text() ).toBe( 'http://www.google.com' );
          } );
        } );

      } );

      describe( 'else()', function () {

        describe( 'if should fire, else should be ignored', function () {

          var $elem = $.jade( { foo: 'bar' },
            'div.wrapper', [
              '- if ( foo == "bar" )', [
                'div.if If'
              ],
              '- else', [
                'div.else Else'
              ]
            ]
          );

          it( 'should have div.if', function () {
            expect( $elem.find( 'div.if' ).length ).toBe( 1 );
          } );
          it( 'should not have div.else', function () {
            expect( $elem.find( 'div.else' ).length ).toBe( 0 );
          } );

        } );

        describe( 'if should be ignored, else should fire', function () {

          var $elem = $.jade( { foo: 'bar' },
            'div.wrapper', [
              '- if ( foo == "baz" )', [
                'div.if If'
              ],
              '- else', [
                'div.else Else'
              ]
            ]
          );

          it( 'should have div.if', function () {
            expect( $elem.find( 'div.if' ).length ).toBe( 0 );
          } );
          it( 'should not have div.else', function () {
            expect( $elem.find( 'div.else' ).length ).toBe( 1 );
          } );

        } );

      } );

      describe( 'Nested if/else', function () {
        var $elem = $.jade(
          'div.wrapper', [
            '- if true', [
              '- if false', [
                'div true false'
              ],
              '- else', [
                'div true true'
              ]
            ],
            '- else', [
              '- if true', [
                'div false true'
              ],
              '- else', [
                'div false false'
              ]
            ]
          ]
        );

        it( 'should have only one div', function () {
          expect( $elem.children( 'div' ).length ).toBe( 1 );
        } );
        it( 'should contain the text "true true"', function () {
          expect( $elem.text() ).toBe( 'true true' );
        } );
      } );

      describe( 'each', function () {

        var $elem = $.jade( { nums: [ 1, 2, 3 ] },
          'div.wrapper', [
            '- each num in nums', [
              'div #{num}'
            ]
          ]
        );

        it( 'should have 3 children', function () {
          expect( $elem.children().length ).toBe( 3 );
        } );
        it( 'should contain the text "123"', function () {
          expect( $elem.text() ).toBe( '123' );
        } );
        it( 'should contain the html "<div>1</div><div>2</div><div>3</div>', function () {
          expect( $elem.html() ).toBe( '<div>1</div><div>2</div><div>3</div>' );
        } );

      } );

    } );

  } );

  describe( 'jadeDom Unit Tests', function () {

    describe( '$._jade.handle_logic()', function () {

      it( 'should be true for: - if ( true )', function () {
        expect( new $._jade.main().handle_logic( '- if( true )' ) ).toBe( true );
      } );

      it( 'should be false for: - if ( false )', function () {
        expect( new $._jade.main().handle_logic( '- if( false )' ) ).toBe( false );
      } );

      it( 'should be true for: - if ( 4 > 3 )', function () {
        expect( new $._jade.main().handle_logic( '- if( 4 > 3 )' ) ).toBe( true );
      } );

      it( 'should be true for: - if ( "howdy, partner!" == "howdy, partner!" )', function () {
        expect( new $._jade.main().handle_logic( '- if ( "howdy, partner!" == "howdy, partner!" )' ) ).toBe( true );
      } );

      it( 'should be false for: - if ( "howdy, partner!" == "howdy partner!" )', function () {
        expect( new $._jade.main().handle_logic( '- if ( "howdy, partner!" == "howdy partner!" )' ) ).toBe( false );
      } );

      it( 'should be true for: - if ( foo.bar == "howdy, partner!" )', function () {
        $.jade.set_globals( { foo: { bar: 'howdy, partner!' } } );
        expect( new $._jade.main().handle_logic( '- if ( foo.bar == "howdy, partner!" )' ) ).toBe( true );
        $.jade.clear_globals();
      } );

      it( 'should be false for: - if ( foo.bar == "howdy partner!" )', function () {
        $.jade.set_globals( { foo: { bar: 'howdy, partner!' } } );
        expect( new $._jade.main().handle_logic( '- if ( foo.bar == "howdy partner!" )' ) ).toBe( false );
        $.jade.clear_globals();
      } );

      it( 'should be false for: - if ( 4 < 3 )', function () {
        expect( new $._jade.main().handle_logic( '- if( 4 < 3 )' ) ).toBe( false );
      } );

    } );

  } );

  jasmine.getEnv().addReporter( new jasmine.TrivialReporter() );
  jasmine.getEnv().execute();

} );