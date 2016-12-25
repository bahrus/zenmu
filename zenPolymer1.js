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
function replaceGUIDsWithPolymerSelector(s, obj, path) {
    if (path === void 0) { path = ''; }
    switch (typeof s) {
        case 'string':
            var names = Object.getOwnPropertyNames(obj);
            var returnS = s;
            for (var _i = 0, names_2 = names; _i < names_2.length; _i++) {
                var name_2 = names_2[_i];
                returnS = returnS.replace(obj[name_2].uid, "[[" + (path + (path ? '.' : '') + name_2) + "]]");
            }
            return returnS;
        case 'object':
            if (Array.isArray(s)) {
                return s.map(function (part) { return replaceGUIDsWithPolymerSelector(part, obj, path); });
            }
            throw "Not Implemented";
    }
}
function extractPathFromFunction(s) {
    var returnSplit = s.split('return ', 2);
    var rhs = returnSplit[1];
    var reg = /[;}\s]$/g;
    var words = rhs.replace(/[\;\s}]/g, '');
    return substringAfter(words, '.');
}
function substringBefore(s, search) {
    var iPos = s.indexOf(search);
    if (iPos > -1)
        return s.substr(0, iPos);
    return s;
}
function substringAfter(s, search) {
    var iPos = s.indexOf(search);
    if (iPos === -1)
        return '';
    if (iPos === s.length - 1)
        return '';
    return s.substr(iPos + 1);
}
function zenToPolymer1(zen, obj, path) {
    if (path === void 0) { path = ''; }
    populateGUIds(obj);
    for (var i = 0, ii = zen.length; i < ii; i++) {
        var word = zen[i];
        switch (typeof word) {
            case 'function':
                var evalledFunction = word(obj);
                var polymerExpr = replaceGUIDsWithPolymerSelector(evalledFunction, obj, path);
                zen[i] = polymerExpr;
                break;
            case 'object':
                var loop = word['➰'];
                var action = word['🎬'];
                if (!loop || !action)
                    throw "Not Implemented";
                var outputArr = [];
                var repeatSelector = extractPathFromFunction(loop.toString());
                outputArr.push("<template is=\"dom-repeat\" items=\"{{" + repeatSelector + "}}\">");
                var loopVal = loop(obj);
                var firstItem = loopVal[0];
                var actionSeq = [action];
                zenToPolymer1(actionSeq, firstItem, "item");
                //const zen1 = action(firstItem);
                //zenToPolymer1(zen1, firstItem);
                for (var _i = 0, actionSeq_1 = actionSeq; _i < actionSeq_1.length; _i++) {
                    var child = actionSeq_1[_i];
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
function flattenArray(arr, cumm) {
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var el = arr_1[_i];
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
}
exports.flattenArray = flattenArray;
//# sourceMappingURL=zenPolymer1.js.map