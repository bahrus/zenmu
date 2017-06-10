"use strict";
const zenCore_1 = require("./zenCore");
const zenPolymer1_1 = require("./zenPolymer1");
const test1 = zenCore_1.zen `.myClass2>ul#myUL.myClass1@myAttrib1:val1@myAttrib2:42@myAttrib3>li${'Hello, '}+li${'World.'}`;
//console.log(test1);
const html1 = test1.join('');
console.assert(html1 === `<div class="myClass2"><ul id="myUL" my-attrib1="val1" my-attrib2="42" my-attrib3 class="myClass1"><li>Hello, </li><li>World.</li></ul></div>`, 'test1 failed');
const test2 = zenCore_1.zen `@a:456${'123'}`;
const html2 = test2.join('');
console.assert(html2 === `<div a="456">123</div>`, 'test2 failed');
const cnnURL = "http://www.cnn.com";
const cnnText = 'This is CNN';
const test3 = zenCore_1.zen `a${{ href: cnnURL, innerHTML: cnnText }}`;
//console.log(test3);
const html3 = test3.join('');
//console.log(html3);
console.assert(html3 === `<a href="${cnnURL}">${cnnText}</a>`, 'test 3 failed');
const range = [1, 2, 3, 4, 5];
const test4 = zenCore_1.zen `ul                   ${{ '➰': range, '🎬': n => zenCore_1.zen `li${'item ' + n}` }}`;
//console.log(test4);                    
const html4 = test4.join('');
//console.log(html4);
console.assert(html4 === '<ul><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li><li>item 5</li></ul>', 'test 4 failed');
const PhotoElement = {
    imageSrc: {
        type: String,
        setter: (newVal, oldVal, _this) => {
            _this.importHref('blah');
        },
        polymer1Setter: (newVal, oldVal, _this) => {
        },
        postVendorSetter: (newVal, oldVal, _this) => {
        }
    },
    caption: {
        type: String
    },
    imageAndCaption: {
        type: String,
        readOnly: true,
        getter: (imageSrc, caption, _this) => {
            return caption + '[' + imageSrc + ']';
        }
    }
};
const test9 = zenPolymer1_1.toPolymerElement(PhotoElement);
console.log(test9);
const test5 = zenCore_1.zen `span${o => `Hello, ${o.imageSrc}, good day!`}`;
zenPolymer1_1.zenToPolymer1(test5, PhotoElement);
//console.log(test5);
const html5 = test5.join('');
console.assert(html5 === '<span>Hello, [[imageSrc]], good day!</span>', 'test 5 failed');
const PhotoAlbum = {
    photos: [PhotoElement],
};
const test6 = zenCore_1.zen `ul                                       ${{ '➰': p => p.photos, '🎬': photo => zenCore_1.zen `li${'photo ' + photo.imageSrc}` }}`;
const test6a = test6.map(x => x.toString());
//console.log(test6a);
zenPolymer1_1.zenToPolymer1(test6, PhotoAlbum);
const flattenedTest6 = zenPolymer1_1.flattenArray(test6);
const html6 = flattenedTest6.join('');
//console.log(html6);
console.assert(html6 === '<ul><template is="dom-repeat" items="{{photos}}"><li>photo [[item.imageSrc]]</li></template></ul>', 'test6 failed');
global['PhotoElement'] = PhotoElement;
const test7 = zenCore_1.zen `ul><PhotoElement>${{ caption: 'iah' }}`;
//console.log(test7);
//# sourceMappingURL=app.js.map