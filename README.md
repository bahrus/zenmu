# zenmu

zen mu is a markup language for HTML,  inspired by the compact [Emmet abbreviation syntax] (http://docs.emmet.io/cheat-sheet/).  Emmet was formally known as [zen coding] (https://www.smashingmagazine.com/2013/03/goodbye-zen-coding-hello-emmet/).  

Zenmu provides a tag library function which parses the compact syntax and expands the syntax into full HTML.

An example of what this looks like is as follows:

```JavaScript
const helloWorld = zen        `.myClass2>ul#myUL.myClass1@myAttrib1:val1@myAttrib2:42@myAttrib3>li${'Hello, '}+li${'World.'}`
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

console.assert(html1 === `<div class="myClass2"><ul id="myUL" my-attrib1="val1" my-attrib2="42" my-attrib3 class="myClass1"><li>Hello, </li><li>World.</li></ul></div>`
                , 'test1 failed');

Whereas Emmet's purpose is to reduce key strokes while typing up a web page, zen mu's is slightly different.  It is meant to provide a compact format for actually defining the html markup, and with integrating with JavaScript via template literals.  

There used to be something approaching a consensus in the web development community that a web page's semantic UI should be defined by declarative HTML markup files, styling should be defined separately via declarative css files, and the role of JavaScript was to enhance the declarative markup with code, when the functionality exceeded what was available from the browser.

But the recent popularity of JSX syntax-based libraries and frameworks, as well as frameworks that (optionally) utilize template literals (recently introduced in ES6) to define the UI has challenged that assumption.  It remains to be seen if a new consensus will eventually emerge on what the right balance of these alternative approaches is.

It seems likely that as long as browsers are optimized to parse HTML, rather than detecting HTML embedded within JavaScript (or )

