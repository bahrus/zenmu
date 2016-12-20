import {zen} from './zenCore';

interface IAttribs{
    myAttrib1: string,
    myAttrib2: number,
    myAttrib3: boolean,
}

const test1 = zen        `div.myClass2>ul#myUL.myClass1${{myAttrib1:'val1',myAttrib2:42,myAttrib3:true}}li${'Hello, '}+li${'World.'}`
const html1 = test1.join('');
//console.log(html1);
console.assert(html1 === `<div class="myClass2"><ul id="myUL" class="myClass1" my-attrib1="val1" my-attrib2="42" my-attrib3><li>Hello, </li><li>World.</li></ul></div>`, 'test1 failed');

const test2 = zen `div${['123',{a:'456'}]}`;
const html2 = test2.join('');
console.log(html2);
console.assert(html2 === `<div a="456">123</div>`)