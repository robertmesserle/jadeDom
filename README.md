# zenDom

jadeDom is a [jQuery](http://www.jquery.com/) plugin to help render DOM elements with [Jade](http://jade-lang.com/) syntax.

## Examples

### HTML as a String

```javascript
$('#wrapper').append( [
  '<div class="class_name">',
    '<div class="inner_class">Some text</div>',
  '</div>'
].join( '' ) );
$('#wrapper .class_name' ).click( function () { alert('hi'); } );
```

### jQuery

```javascript
$('#wrapper').append(
  $( '<div />', { 'class': 'class_name', click: function () { ... } } ).append(
    $( '<div />', { 'class': 'inner_class', text: 'Some text' } )
  )
);
```

### zenDom

```javascript
$('#wrapper').append( $.jade(
  'div.class_name', { click: function () { ... } }, [
    'a.inner_class[href=#]{Some text}'
  ]
) );
```

### jadeDom

```javascript
$('#wrapper').append( $.jade(
  'div.class_name', { click: function () { ... } }, [
    'a.inner_class(href=#) Some text'
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