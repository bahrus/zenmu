import {zen, Loop} from './zenCore';
import {zenToPolymer1, flattenArray} from './zenPolymer1';

interface IAttribs{
    myAttrib1: string,
    myAttrib2: number,
    myAttrib3: boolean,
}

const test1 = zen        `.myClass2>ul#myUL.myClass1@myAttrib1:val1@myAttrib2:42@myAttrib3>li${'Hello, '}+li${'World.'}`
const html1 = test1.join('');
//console.log(html1);
console.assert(html1 === `<div class="myClass2"><ul id="myUL" my-attrib1="val1" my-attrib2="42" my-attrib3 class="myClass1"><li>Hello, </li><li>World.</li></ul></div>`
                , 'test1 failed');
const test2 = zen        `@a:456${'123'}`;
const html2 = test2.join('');
//console.log(html2);
console.assert(html2 === `<div a="456">123</div>`, 'test2 failed');

// const range = [1, 2, 3, 4, 5].map(n => zen `li${'item ' + n}`);
// console.log(range);
// //const rangeFn = () => range.map(n => n.toString());
// //type nLoop = Loop<number>;
// const test3 = zen `ul${range}`;
// console.log(test3);
// const html3 = test3.join('');
// console.log(html3);
const cnnURL = "http://www.cnn.com";
const cnnText = 'This is CNN';
type a = HTMLAnchorElement;
const test3 = zen        `a${{href:cnnURL,innerHTML:cnnText} as a}`;
const html3 = test3.join('');
//console.log(html3);
console.assert(html3 === `<a href="${cnnURL}">${cnnText}</a>`, 'test 3 failed');

const range = [1, 2, 3, 4, 5];
type nLoop = Loop<number>;
const test4 = zen `ul                                   ${{'➰': range, '🎬':n => zen 
                    `li${'item ' + n}`                  } as nLoop}`;
                    
const html4 = test4.join('');
//console.log(html4);
console.assert(html4 === '<ul><li>item 1</li><li>item 2</li><li>item 3</li><li>item 4</li><li>item 5</li></ul>', 'test 4 failed');

//given on object, populate with unique identifiers
interface IProperty{
    type: any,
    uid?: string,
}
interface IPhotoElement{
    imageSrc: IProperty,
    caption: IProperty
}

const PhotoElement = {
    imageSrc:{
        type: String,
    },
    caption:{
        type: String
    }
} as IPhotoElement;

const obj = PhotoElement;

const test5 = zen `span${() => `Hello, ${obj.imageSrc.uid}, good day!`}`;
zenToPolymer1(test5, obj);
//console.log(test5);
const html5 = test5.join('');
console.assert(html5 === '<span>Hello, [[imageSrc]], good day!</span>', 'test 5 failed');


interface IPhotoAlbum{
    photos?: IPhotoElement[],
}

const PhotoAlbum = {
    photos:[PhotoElement],
} as IPhotoAlbum;

interface ILoopTemplate<T>{
    '➰': () => T[],
    '🎬': (t: T) => any,
}

const test6 = zen `ul                                   ${{'➰': p => p.photos, '🎬':photo => zen 
                    `li${'photo ' + photo.imageSrc.uid}`          }  as ILoopTemplate<IPhotoElement>}`;


zenToPolymer1(test6, PhotoAlbum);

const flattenedTest6 = flattenArray(test6);
const html6 = flattenedTest6.join('');
//console.log(html6);
console.assert(html6 === '<ul><template is="dom-repeat" items="{{photos}}"><li>photo [[item.imageSrc]]</li></template></ul>');
