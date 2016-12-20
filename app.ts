import {zen} from './zenCore';

const test1 = zen `div.myClass2>ul#myUL.myClass1>li${'Hello, '}+li${'World.'}`

console.log(test1);
