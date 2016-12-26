"use strict";
var zenCore_1 = require("./zenCore");
var zenPolymer1_1 = require("./zenPolymer1");
var test1 = (_a = [".myClass2>ul#myUL.myClass1@myAttrib1:val1@myAttrib2:42@myAttrib3>li", "+li", ""], _a.raw = [".myClass2>ul#myUL.myClass1@myAttrib1:val1@myAttrib2:42@myAttrib3>li", "+li", ""], zenCore_1.zen(_a, 'Hello, ', 'World.'));
var html1 = test1.join('');
//console.log(html1);
console.assert(html1 === "<div class=\"myClass2\"><ul id=\"myUL\" my-attrib1=\"val1\" my-attrib2=\"42\" my-attrib3 class=\"myClass1\"><li>Hello, </li><li>World.</li></ul></div>", 'test1 failed');
var test2 = (_b = ["@a:456", ""], _b.raw = ["@a:456", ""], zenCore_1.zen(_b, '123'));
var html2 = test2.join('');
//console.log(html2);
console.assert(html2 === "<div a=\"456\">123</div>", 'test2 failed');
// const range = [1, 2, 3, 4, 5].map(n => zen `li${'item ' + n}`);
// console.log(range);
// //const rangeFn = () => range.map(n => n.toString());
// //type nLoop = Loop<number>;
// const test3 = zen `ul${range}`;
// console.log(test3);
// const html3 = test3.join('');
// console.log(html3);
var cnnURL = "http://www.cnn.com";
var cnnText = 'This is CNN';
var test3 = (_c = ["a", ""], _c.raw = ["a", ""], zenCore_1.zen(_c, { href: cnnURL, innerHTML: cnnText }));
var html3 = test3.join('');
//console.log(html3);
console.assert(html3 === "<a href=\"" + cnnURL + "\">" + cnnText + "</a>", 'test 3 failed');
var range = [1, 2, 3, 4, 5];
var test4 = (_d = ["ul                                   ", ""], _d.raw = ["ul                                   ",
    ""], zenCore_1.zen(_d, { '➰': range, '🎬': function (n) {
        return (_a = ["li", ""], _a.raw = ["li", ""], zenCore_1.zen(_a, 'item ' + n));
        var _a;
    } }));
var html4 = test4.join('');
//console.log(html4);
console.assert(html4 === '<ul><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li><li>item 5</li></ul>', 'test 4 failed');
var PhotoElement = {
    imageSrc: {
        type: String,
    },
    caption: {
        type: String
    }
};
var obj = PhotoElement;
var test5 = (_e = ["span", ""], _e.raw = ["span", ""], zenCore_1.zen(_e, function () { return "Hello, " + obj.imageSrc.uid + ", good day!"; }));
zenPolymer1_1.zenToPolymer1(test5, obj);
//console.log(test5);
var html5 = test5.join('');
console.assert(html5 === '<span>Hello, [[imageSrc]], good day!</span>', 'test 5 failed');
var PhotoAlbum = {
    photos: [PhotoElement],
};
var test6 = (_f = ["ul                                       ", ""], _f.raw = ["ul                                       ",
    ""], zenCore_1.zen(_f, { '➰': function (p) { return p.photos; }, '🎬': function (photo) {
        return (_a = ["li", ""], _a.raw = ["li", ""], zenCore_1.zen(_a, 'photo ' + photo.imageSrc.uid));
        var _a;
    } }));
zenPolymer1_1.zenToPolymer1(test6, PhotoAlbum);
var flattenedTest6 = zenPolymer1_1.flattenArray(test6);
var html6 = flattenedTest6.join('');
//console.log(html6);
console.assert(html6 === '<ul><template is="dom-repeat" items="{{photos}}"><li>photo [[item.imageSrc]]</li></template></ul>');
var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=app.js.map