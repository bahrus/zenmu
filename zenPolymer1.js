"use strict";
const xyR = /[xy]/g;
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(xyR, c => {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
// function populateGUIds(obj){
//     const names = Object.getOwnPropertyNames(obj);
//     for(const name of names){
//         obj[name].uid = guid();
//     }
// }
function replaceGUIDsWithPolymerSelector(s, objMapping, path = '') {
    switch (typeof s) {
        case 'string':
            let returnS = s;
            const lu = objMapping.uidToPathLookup;
            for (const key in lu) {
                const path = lu[key];
                //returnS = returnS.replace(key, `[[${path + (path ? '.' : '') + name}]]`);
                returnS = returnS.replace(key, `[[${path}]]`);
            }
            return returnS;
        case 'object':
            if (Array.isArray(s)) {
                return s.map(part => replaceGUIDsWithPolymerSelector(part, objMapping, path));
            }
            throw "Not Implemented";
    }
}
function extractPathFromFunction(s) {
    const returnSplit = s.split('return ', 2); //ES5
    if (returnSplit.length > 1) {
        const rhs = returnSplit[1];
        const reg = /[;}\s]$/g;
        const words = rhs.replace(/[\;\s}]/g, '');
        return substringAfter(words, '.');
    }
    const arrowSplit = s.split('=>');
    const lhs = arrowSplit[0].trim();
    const rhs = arrowSplit[1].replace(lhs + '.', '').replace(';', '').trim();
    return rhs;
}
function substringBefore(s, search) {
    const iPos = s.indexOf(search);
    if (iPos > -1)
        return s.substr(0, iPos);
    return s;
}
function substringAfter(s, search) {
    const iPos = s.indexOf(search);
    if (iPos === -1)
        return '';
    if (iPos === s.length - 1)
        return '';
    return s.substr(iPos + 1);
}
function zenToPolymer1(zen, obj, path = '') {
    const objectMapping = mapObject(obj);
    for (let i = 0, ii = zen.length; i < ii; i++) {
        const word = zen[i];
        switch (typeof word) {
            case 'function':
                const evalledFunction = word(objectMapping.uidObject);
                const polymerExpr = replaceGUIDsWithPolymerSelector(evalledFunction, objectMapping, path);
                zen[i] = polymerExpr;
                break;
            case 'object':
                const loop = word['➰'];
                const action = word['🎬'];
                if (!loop || !action)
                    throw "Not Implemented";
                const outputArr = [];
                const repeatSelector = extractPathFromFunction(loop.toString());
                outputArr.push(`<template is="dom-repeat" items="{{${repeatSelector}}}">`);
                const loopVal = loop(obj);
                const firstItem = loopVal[0];
                const actionSeq = [action];
                zenToPolymer1(actionSeq, firstItem, "item");
                //const zen1 = action(firstItem);
                //zenToPolymer1(zen1, firstItem);
                for (const child of actionSeq) {
                    outputArr.push(child);
                }
                outputArr.push('</template>');
                //zen[i] = outputArr.join('');
                zen[i] = outputArr;
                break;
        }
    }
}
exports.zenToPolymer1 = zenToPolymer1;
function flattenArray(arr, cumm = []) {
    for (const el of arr) {
        switch (typeof el) {
            case 'string':
                cumm.push(el);
                break;
            case 'object':
                if (Array.isArray(el)) {
                    flattenArray(el, cumm);
                }
                else {
                    throw "Not Implemented";
                }
        }
    }
    return cumm;
}
exports.flattenArray = flattenArray;
function mapObject(obj) {
    const returnObj = {
        uidToPathLookup: {},
        uidObject: {}
    };
    const names = Object.getOwnPropertyNames(obj);
    for (const name of names) {
        const uid = guid();
        returnObj.uidToPathLookup[uid] = name;
        returnObj.uidObject[name] = uid;
    }
    return returnObj;
}
//# sourceMappingURL=zenPolymer1.js.map