"use strict";
var zenCore_1 = require("./zenCore");
var test1 = (_a = ["div.myClass2>ul#myUL.myClass1", "li", "+li", ""], _a.raw = ["div.myClass2>ul#myUL.myClass1", "li", "+li", ""], zenCore_1.zen(_a, { myAttrib1: 'val1', myAttrib2: 42, myAttrib3: true }, 'Hello, ', 'World.'));
var html1 = test1.join('');
//console.log(html1);
console.assert(html1 === "<div class=\"myClass2\"><ul id=\"myUL\" class=\"myClass1\" my-attrib1=\"val1\" my-attrib2=\"42\" my-attrib3><li>Hello, </li><li>World.</li></ul></div>", 'test1 failed');
var test2 = (_b = ["div", ""], _b.raw = ["div", ""], zenCore_1.zen(_b, ['123', { a: '456' }]));
var html2 = test2.join('');
console.log(html2);
console.assert(html2 === "<div a=\"456\">123</div>");
var _a, _b;
//# sourceMappingURL=app.js.map