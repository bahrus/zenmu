"use strict";
var zenCore_1 = require("./zenCore");
var test1 = (_a = [".myClass2>ul#myUL@myAttrib3.myClass1", "li", "+li", ""], _a.raw = [".myClass2>ul#myUL@myAttrib3.myClass1", "li", "+li", ""], zenCore_1.zen(_a, { myAttrib1: 'val1', myAttrib2: 42 }, 'Hello, ', 'World.'));
var html1 = test1.join('');
//console.log(html1);
console.assert(html1 === "<div class=\"myClass2\"><ul id=\"myUL\" my-attrib3 class=\"myClass1\" my-attrib1=\"val1\" my-attrib2=\"42\"><li>Hello, </li><li>World.</li></ul></div>", 'test1 failed');
var test2 = (_b = ["", ""], _b.raw = ["", ""], zenCore_1.zen(_b, ['123', { a: '456' }]));
var html2 = test2.join('');
console.log(html2);
console.assert(html2 === "<div a=\"456\">123</div>", 'test2 failed');
var _a, _b;
//# sourceMappingURL=app.js.map