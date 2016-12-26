# zen mu

zen mu is a markup language for HTML,  inspired by the compact [Emmet abbreviation syntax] (http://docs.emmet.io/cheat-sheet/).  Emmet was formally known as [zen coding] (https://www.smashingmagazine.com/2013/03/goodbye-zen-coding-hello-emmet/).  

Zenmu provides a tag library function which parses the compact syntax and expands the syntax into full HTML.

An example of what this looks like is as follows:

```JavaScript
const helloWorld = zen `.myClass2>ul#myUL.myClass1@myAttrib1:val1@myAttrib2:42@myAttrib3>li${'Hello, '}+li${'World.'}`
console.log(helloWorld.join(''));
```

generates

```HTML
<div class="myClass2">
    <ul id="myUL" my-attrib1="val1" my-attrib2="42" my-attrib3 class="myClass1">
        <li>Hello, </li>
        <li>World.</li>
    </ul>
</div>
```

Whereas Emmet's purpose is to reduce key strokes while typing up a html compliant web page, by providing a transient syntax, zen mu's is slightly different.  It is meant to provide a permament compact format for actually defining the html markup, taking advantage of the power of JavaScript's template literals.

Why would we want to do this?  

There used to be something approaching a consensus in the web development community that a web page's semantic UI should be defined by declarative HTML markup files, styling should be defined separately via declarative css files, and the role of JavaScript was to enhance the declarative markup with code, when the functionality exceeded what was available from the browser.

But the recent popularity of JSX syntax-based libraries and frameworks, as well as frameworks that (optionally) utilize template literals (recently introduced in ES6) to define the UI, has challenged that assumption.  It remains to be seen if a new consensus will eventually emerge on what the right balance of these alternative approaches is.

It seems likely that as long as browsers are optimized to parse HTML, rather than detecting HTML embedded within JavaScript, the usefulness of fully defined html pages will not go away.

Indeed, careful analysis of [how best to provide a lightning fast mobile web app] (https://hackernoon.com/10-things-i-learned-making-the-fastest-site-in-the-world-18a0e1cdf4a7#.3x16pd7np) suggest that really, the HTML markup is becomeing a *build/compile-time target* of these libraries (combined with a functional representation of how to dynamically update the dom once rendered based on user interation and other events).

It is arguable whether JSX is a preferable "markup syntax" to support, rather than HTML.  Some popular libraries like [Vue.js don't take this view] (https://vuejs.org/v2/guide/render-function.html), viewing JSX's ability to tap into the power of JavaScript,  as something that can help in limited circumstances only. This seems to be a reasonable point of view. 

But it is the view of zen mu, that for these limited circumstances where the power of JavaScript can help, that the full xml-compliant syntax of HTML embedded in JavaScript doesn't really help, and just bogs the JavaScript down. 

Zen mu's primary purpose is to provide a developer maintained, compact markup source, which, together with custom libraries, can be used to target varous libraries in an optimized way, including Polymer.js, JSX, etc, even from the same source definition.

People are currently more used to reading HTML over Emmet, even inside JavaScript files, especially when tools provide familiar HTML syntax highlighting and autocomplete assistance.

But we believe with sufficient training and future enhancements to tools, working with emmet-like syntax can become as familiar, and arguably more productive, given the brevity of the syntax.

Another potential use of zen mu might be in reducing the amount of (gzipped, minified) HTML markup that needs to be downloaded to the browser. However, this needs to be carefully weight against the additional cost of downloading the zen mu library, and the time needed by JavaScript execution to expand the notation into full HTML, before passing the HTML to the browser.  

