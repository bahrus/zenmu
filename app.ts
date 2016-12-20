import {zen} from './zenCore';

const test1 = zen `div.myClass2>ul#myUL.myClass1>li${'Hello, '}+li${'World.'}`

console.assert(test1.join('') === `<div class="myClass2"><ul id="myUL" class="myClass1"><li>Hello, </li><li>World.</li></ul></div>`, 'test1 failed');
