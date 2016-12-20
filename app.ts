import {zen} from './zenCore';

interface IAttribs{
    myAttrib1: string,
    myAttrib2: number,
    myAttrib3: boolean,
}

const test1 = zen `div.myClass2>ul#myUL${{myAttrib1:'val1',myAttrib2:42,myAttrib3:true} as IAttribs}.myClass1>li${'Hello, '}+li${'World.'}`

console.assert(test1.join('') === `<div class="myClass2"><ul id="myUL" my-attrib1="val1" my-attrib2=42 my-attrib3 class="myClass1"><li>Hello, </li><li>World.</li></ul></div>`, 'test1 failed');
