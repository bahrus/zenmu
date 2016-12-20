import {zen} from './zenCore';

interface IAttribs{
    myAttrib1: string,
    myAttrib2: number,
    myAttrib3: boolean,
}

const test1 = zen `div.myClass2>ul#myUL.myClass1${{myAttrib1:'val1',myAttrib2:42,myAttrib3:true} as IAttribs}>li${'Hello, '}+li${'World.'}`
const html = test1.join('');
console.log(html);
console.assert(html === `<div class="myClass2"><ul id="myUL" class="myClass1" my-attrib1="val1" my-attrib2="42" my-attrib3><li>Hello, </li><li>World.</li></ul></div>`, 'test1 failed');
//                       <div class="myClass2"><ul id="myUL" class="myClass1" my-attrib1="val1" my-attrib2="42" my-attrib3><li>Hello, </li><li>World.</li></ul></div>