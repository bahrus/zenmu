import {zen} from './zenCore';

const test1 = zen `div>ul#myUL>li${'Hello, '}+li${'World.'}`

console.log(test1);
