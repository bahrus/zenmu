# zen mu

zen mu is a markup language for HTML,  inspired by the compact [Emmet abbreviation syntax] (http://docs.emmet.io/cheat-sheet/).  Emmet was formally known as [zen coding] (https://www.smashingmagazine.com/2013/03/goodbye-zen-coding-hello-emmet/).  

Zen mu provides a tag library function which parses the compact syntax and expands the syntax into full HTML, or rather, a kind of abstract syntax tree that is easily converted to HTML, but which can generate dynamic html generators based on existing frameworks as well.

An example of what this looks like is as follows:

```JavaScript
const helloWorld = zen `.myClass2>ul#myUL.myClass1@myAttrib1:val1@myAttrib2:42@myAttrib3>li${'Hello, '}+li${'World.'}`
console.log(helloWorld.join(''));
```

generates (sans line feed formatting):

```HTML
<div class="myClass2">
    <ul id="myUL" my-attrib1="val1" my-attrib2="42" my-attrib3 class="myClass1">
        <li>Hello, </li>
        <li>World.</li>
    </ul>
</div>
```

Whereas Emmet's purpose is to reduce key strokes while typing up an html compliant web page, Zen Mu's goals are slightly different.  It is meant to provide a *permament* compact format for actually defining the html markup during run time or build time, taking advantage of the power of JavaScript's template literals.

Why would we want to do this? 

There is currently a debate about where the "proper" place is for HTML markup -- directly in html pages, or embedded in JavaScript via template literals or JSX.  

There used to be something approaching a consensus in the web development community that a web page's semantic UI should be defined by declarative HTML markup files -- static files, or said files enhanced with non intrusive dynamic formatting instructions.  Styling should be defined separately via declarative css files.  In this view, the role of writing new JavaScript (or server side rendering languages) was limited to enhancing the declarative markup, when the functionality exceeded what was available from the browser or previous encapsulated tags / attributes.  

But the recent popularity of JSX syntax-based libraries and frameworks, as well as frameworks that (optionally) utilize template literals (recently introduced in ES6) to define the UI, has challenged that assumption.  It remains to be seen if a new consensus will eventually emerge on what is the right balance of these alternative approaches of defining the UI for web applications.

One thing that seems reasonably likely is that as long as browsers are optimized to parse HTML, rather than detecting HTML embedded within JavaScript, the usefulness of fully defined html pages will not go away.

Indeed, careful analysis of [how best to provide a lightning fast mobile web app] (https://hackernoon.com/10-things-i-learned-making-the-fastest-site-in-the-world-18a0e1cdf4a7#.3x16pd7np) suggests that really, the HTML markup is still the most viable *build/compile-time target* of these libraries (combined with a functional representation of how to dynamically update the dom once rendered based on user interation and other events).

It is debatable whether JSX or template literals, is a preferable "markup syntax" to support, as opposed to maintaining raw HTML directly.   

Some popular libraries like [Vue.js take a dim view of this role for JavaScript] (https://vuejs.org/v2/guide/render-function.html).  But Vue.js recognizes JSX's ability to tap into the power of JavaScript,  as something that can help in limited circumstances. This seems to be a reasonable point of view.

Others view the various HTML extended templating syntaxes, like those found in Polymer, Vue, Angular, Aurelia as contrived or "magical", preferring the more powerful JavaScript-like syntax of JSX, or true JavaScript power of the standardized template literals, perhaps combined with the tooling and build time checks that Typescript or other typed systems provide. 

But it is the view of zen mu, that for those (possibly limited) circumstances where the power of JavaScript is needed, that the full xml-compliant syntax of HTML embedded in JavaScript isn't the most efficient way to do it, and just bogs the JavaScript down. 

Zen mu's primary purpose is to provide a compact markup source, natural to the developer after enough exposure, which, together with custom libraries, can be used to target various consumers in an optimized way.  Targets of the transformation could include static web site publishing, or template generated environments like Polymer.js, JSX, etc.  It is conceivable that one could start from the same source definition, and transform to multiple such environments, allowing consumers of the definition to pick whichever they prefer.

Another potential use of zen mu might be in reducing the amount of (gzipped, minified) HTML markup that needs to be downloaded to the browser. However, this needs to be carefully weighed against the additional cost of downloading the zen mu library, and the time needed by JavaScript execution to expand the notation into full HTML, before passing the HTML to the browser.  

On the other hand, for those circumstances where the power of JavaScript is truly the best fit for a significant amount of markup definition, even during runtime in the browser, zen mu could find a role in reducing the bandwidth and parsing requirements incurred by larger amounts of markup.

Zen mu could also be used on the server side, as a potential competitor with other HTML simplifying languages, like Jade.

## Syntax via examples

### Example 1. 

```JavaScript
zen `.myClass2>ul#myUL.myClass1@myAttrib1:val1@myAttrib2:42@myAttrib3>li${'Hello, '}+li${'World.'}`
```
generates:

```JavaScript
[ '<div',
  ' class="myClass2"',
  '>',
  '<ul',
  ' id="myUL"',
  ' my-attrib1="val1" my-attrib2="42" my-attrib3',
  ' class="myClass1"',
  '>',
  '<li',
  '>',
  'Hello, ',
  '</li>',
  '<li',
  '>',
  'World.',
  '</li>',
  '</ul>',
  '</div>' ]
```

### Example 2.  Variable binding.
```JavaScript
const cnnURL = 'http://www.cnn.com';
const cnnText = 'This is CNN';
zen `a${{href:cnnURL,innerHTML:cnnText}}`;
```

generates:

```JavaScript
[ '<a', ' href="http://www.cnn.com"', '>', 'This is CNN', '</a>' ]
```

### Example 3. Loop generation


Note that the way this is formatted below is optional.  We think it's more readable to separate the actual markup, in a left column, from a right column, where JavaScript instructions are found.  But if this doesn't appeal to you, the ${} section can come right after the ul, and it could be condensed into a single line.

```JavaScript
const range = [1, 2, 3, 4, 5];
const test4 = zen `ul                             ${{'➰': range, '🎬':
                     n=>zen `li${'item ' + n}`    }}`; 

```

generates:

```JavaScript
[ '<ul',
  '>',
  '<li',
  '>',
  'item 1',
  '</li>',
  '<li',
  '>',
  'item 2',
  '</li>',
  '<li',
  '>',
  'item 3',
  '</li>',
  '<li',
  '>',
  'item 4',
  '</li>',
  '<li',
  '>',
  'item 5',
  '</li>',
  '</ul>' ]
```

### Example 4.  Create an AST which can  transform into specific templates

```JavaScript
const templateGenerator = zen `ul                                   ${{'➰': p => p.photos, '🎬':photo => zen 
                                `li${'photo ' + photo.imageSrc}`    }};
```

generates:

```JavaScript
["<ul", ">", {➰: p => p.photos, 🎬: photo => zen  `li${'photo ' + photo.imageSrc}`}, "</ul>"]
```

One can use this together with a template adapter, to generate syntax specific to a framework.

So for the above example, in app.ts you will see a set of steps that can convert the templateGenerator above into:

```HTML
  <ul>
    <template is="dom-repeat" items="{{photos}}">
      <li>photo [[item.imageSrc]]</li>
    </template>
  </ul>
```

### Example 5.  Conditionals / switches

```JavaScript
const temperature
let weather = {
  isWarm: temperature > 80
};

const decision = zen `ul                                              ${{
                        '❓': p => p.isWarm, 
                              '✔️': zen `li${'Wear shorts'}          ,
                              '❌': zen `li${'Wear pants'}           ,
                              '🔳': zen `li${'Stay inside'}          }}
```