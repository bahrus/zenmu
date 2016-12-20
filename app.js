"use strict";
var zenCore_1 = require("./zenCore");
var test1 = (_a = ["div.myClass2>ul#myUL.myClass1>li", "+li", ""], _a.raw = ["div.myClass2>ul#myUL.myClass1>li", "+li", ""], zenCore_1.zen(_a, 'Hello, ', 'World.'));
console.assert(test1.join('') === "<div class=\"myClass2\"><ul id=\"myUL\" class=\"myClass1\"><li>Hello, </li><li>World.</li></ul></div>", 'test1 failed');
var _a;
//# sourceMappingURL=app.js.map