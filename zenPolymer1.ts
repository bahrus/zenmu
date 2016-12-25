import {Loop} from './zenCore';
const xyR = /[xy]/g;
function guid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(xyR, c => {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });

}
function populateGUIds(obj){
    const names = Object.getOwnPropertyNames(obj);
    for(const name of names){
        obj[name].uid = guid();
    }
}
function replaceGUIDsWithPolymerSelector(s: string, obj){
    const names = Object.getOwnPropertyNames(obj);
    let returnS = s;
    for(const name of names){
        returnS = returnS.replace(obj[name].uid, `{{${name}}}`);
    }
    return returnS;
}
function extractPathFromFunction(s: string){
    const returnSplit = s.split('return ', 2);
    const rhs = returnSplit[1];
    const reg = /[;}\s]$/g;
    const words = rhs.replace(/[\;\s}]/g, '');
    return substringAfter(words, '.');
}
function substringBefore(s: string, search: string){
    const iPos = s.indexOf(search);
    if(iPos > -1) return s.substr(0, iPos);
    return s;
}

function substringAfter(s: string, search: string){
    const iPos = s.indexOf(search);
    if(iPos === -1) return '';
    if(iPos === s.length - 1) return '';
    return s.substr(iPos + 1);
}

export function zenToPolymer1(zen: any[], obj){
    populateGUIds(obj);
    for(let i = 0, ii = zen.length; i < ii; i++){
        const word = zen[i];
        switch(typeof word){
            case 'function':
                const evalledFunction = word(obj);
                const polymerExpr = replaceGUIDsWithPolymerSelector(evalledFunction, obj);
                zen[i] = polymerExpr;
                break;
            case 'object':
                const loop = word['➰'];
                const action = word['🎬'];
                if(!loop || !action) throw "Not Implemented";
                const outputArr = [];
                const repeatSelector = extractPathFromFunction (loop.toString());
                outputArr.push(`<template is="dom-repeat" repeat="{{${repeatSelector}}}">`);
                outputArr.push('</template>');
                zen[i] = outputArr.join('');
                break;
        }
    }
}