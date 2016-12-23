"use strict";
var xyR = /[xy]/g;
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(xyR, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function populateGUIds(obj) {
    var names = Object.getOwnPropertyNames(obj);
    for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
        var name_1 = names_1[_i];
        obj[name_1].uid = guid();
    }
}
function replaceGUIDsWithPolymerSelector(s, obj) {
    var names = Object.getOwnPropertyNames(obj);
    var returnS = s;
    for (var _i = 0, names_2 = names; _i < names_2.length; _i++) {
        var name_2 = names_2[_i];
        returnS = returnS.replace(obj[name_2].uid, "{{" + name_2 + "}}");
    }
    return returnS;
}
function zenToPolymer1(zen, obj) {
    populateGUIds(obj);
    for (var i = 0, ii = zen.length; i < ii; i++) {
        var word = zen[i];
        switch (typeof word) {
            case 'function':
                var evalledFunction = word(obj);
                var polymerExpr = replaceGUIDsWithPolymerSelector(evalledFunction, obj);
                zen[i] = polymerExpr;
                break;
        }
    }
}
exports.zenToPolymer1 = zenToPolymer1;
//# sourceMappingURL=zenPolymer1.js.map