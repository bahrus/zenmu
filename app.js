"use strict";
var zenCore_1 = require("./zenCore");
var test1 = (_a = ["div.myClass2>ul#myUL.myClass1", ">li", "+li", ""], _a.raw = ["div.myClass2>ul#myUL.myClass1", ">li", "+li", ""], zenCore_1.zen(_a, { myAttrib1: 'val1', myAttrib2: 42, myAttrib3: true }, 'Hello, ', 'World.'));
var html = test1.join('');
console.log(html);
console.assert(html === "<div class=\"myClass2\"><ul id=\"myUL\" my-attrib1=\"val1\" my-attrib2=42 my-attrib3 class=\"myClass1\"><li>Hello, </li><li>World.</li></ul></div>", 'test1 failed');
var _a;
//# sourceMappingURL=app.js.map