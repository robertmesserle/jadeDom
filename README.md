# jadeDom

jadeDom is a [jQuery](http://www.jquery.com/) plugin to help render DOM elements with [Jade](http://jade-lang.com/) syntax.

## Examples

### HTML

```html
<div class="class_name">
  <a href="#" title="Some title" class="inner_class">Some text</a>
</div>
```

### HTML as a String

```javascript
$('#wrapper').append( [
  '<div class="class_name">',
    '<a href="#" title="Some title" class="inner_class">Some text</a>',
  '</div>'
].join( '' ) );
$('#wrapper .class_name' ).click( function () { alert('hi'); } );
```

### jQuery

```javascript
$('#wrapper').append(
  $( '<div />', { 'class': 'class_name', click: function () { ... } } ).append(
    $( '<a />', { 'class': 'inner_class', href: '#', title: 'Some title', text: 'Some text' } )
  )
);
```

### jadeDom

```javascript
$('#wrapper').append( $.jade(
  'div.class_name', { click: function () { ... } }, [
    'a.inner_class(href=#, title="Some title") Some text'
  ]
) );
```

## Documentation

### Basic Usage

Arguments passed to jadeDom can be one of three types:

**DOM Element**: DOM Elements can come in as a *string*, *DOM element*, *DOM Fragment*, or *jQuery DOM Object*.  The first argument **MUST** be one of these formats.  
**jQuery Options**: This is an *object* that will specify which jQuery functions to call.  
**Child Elements**: This is an array of child elements to be attached to the most recent *DOM Element* at this depth.

The example above demonstrates all 3 of these.  ```'.class_name'``` tells jadeDom to render a *div* element with a class of *class_name*. ```{ click: function () { ... } }``` attaches a click event to that element.  The following array attaches a child element to that node.

### Caching

The Options object can also accept a ```cache``` property.  This property should be a *string* that will be used to look up a DOM element later.  This will save you the trouble of having to perform a costly jQuery lookup later.

```javascript
var $dom = $.jade( 'div.something', { cache: 'something' } ); // the div was cached as 'something'
var $something = $dom.jade( 'something' ); // something was pulled from cache by calling z() on the jadeDom object
 ```

As you can see above, calling ```$dom.jade(str)``` on a jadeDom object will allow you to access any cached elements.  You can also access the full lookup table by calling ```$dom.jade()``` without any arguments.
 
### Supported Jade Features

#### Tags

The tag is the first string specified in your Jade string.

##### jadeDom

```javascript
$.jade( 'div' );
```

##### HTML

```html
<div></div>
```

If you choose to omit the tag name, it will default to div.

##### jadeDom

```javascript
$.jade( '#foo.bar' );
```

##### HTML

```html
<div id="foo" class="bar"></div>
```
 
#### ID's and Classes

ID's and classes are set using CSS syntax - that is a ```#``` represents an ID and a ```.``` represents a class.

##### jadeDom

```javascript
$.jade( 'div#foo.bar.baz' );
```

##### HTML

```html
<div id="foo" class="bar baz"></div>
```

#### Attributes

Attributes in Jade are wrapped in ```()```.  You can have multiple attributes by separating them with a comma.  Both attribute names and values can optionally be wrapped in single or double quotes.

##### jadeDom

```javascript
$.jade( 'a(href=#, title="Foo")' );
```

##### HTML

```html
<a href="#" title="Foo">Bar</a>
```

#### Tag Text

Adding text to a tag can be accomplished by simply adding a space after the tag details and some text.

##### jadeDom

```javascript
$.jade( 'h1#foo.bar Baz' );
```

##### HTML

```html
<h1 id="foo" class="bar">Baz</h1>
```

If you want to create a text node without having it be part of another tag, that can be accomplished by starting your string with a ```|```.

##### Jade

```
p
  | foo bar baz
  | rawr rawr
  | super cool
  | go jade go
```

##### jadeDom

```javascript
$.jade(
  'p', [
    '| foo bar baz ',
    '| rawr rawr ',
    '| super cool ',
    '| go jade go '
  ]
);
```

##### HTML

```html
<p>foo bar baz rawr rawr super cool go jade go</p>
```
#### Variables

You can also use variable replacement as done in Jade.  In order to use variables, the first argument passed to jadeDom must be an object containing the lookup table.

Once you have passed in this lookup table, there are two ways to call a variable within a block of text: ```!{variable}``` and ```#{variable}```.

These will both do the same thing, but ```#{variable}``` will escape any HTML it finds while ```!{variable}``` will be rendered as HTML.

##### Jade

```
ul
  li Escaped: #{text}
  li Unescaped: !{text}
```

##### jadeDom

```javascript
$.jade( { text: '<b>Foobar</b>' },
  'ul', [
    'li Escaped: #{text}',
    'li Unescaped: !{text}'
  ]
);
```

##### HTML

```html
<ul>
  <li>Escaped: &lt;b&gt;Foobar&lt;b&gt;</li>
  <li>Unescaped: <b>Foobar</b></li>
</ul>
```

You can also utilize *global* variables.  *Local* variables (as in the example above) will override anything present in jadeDom's global variables.

Globals are managed with the following 3 functions:

**$.jade.set_globals( object )**: This is used to set the globals object, overwriting anything currently present.  
**$.jade.add_globals( object )**: This will extend the existing globals object with any values passed in.  
**$.jade.clear_globals()**: This will empty the globals object.

##### Jade

```javascript
$.jade.set_globals( { foo: 'bar', bar: 'baz' } );
$.jade( 'p foo is !{foo}, while bar is !{bar}.' );
$.jade( { foo: 'not bar' }, 'p foo is !{foo}, while bar is !{bar}.' );

$.jade.update_globals( { foo: 'not bar' } );
$.jade( 'p foo is !{foo}, while bar is !{bar}.' );

$.jade.clear_globals();
$.jade( 'p foo is !{foo}, while bar is !{bar}.' );
```

##### HTML

```html
<p>foo is bar, while bar is baz</p>
<p>foo is not bar, while bar is baz</p>
<p>foo is not bar, while bar is baz</p>
<p>foo is !{foo}, while bar is !{bar}</p>
```

The first line demonstrates basic globals replacement.

In the second line, the global variable 'foo' is still set, but is overridden by the local variable 'foo.'

In the third line, the globals object is updated so that foo is 'not bar.'

In the last line, no replacement occurs since the globals object has been cleared and no locals were passed in.
