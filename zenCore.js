"use strict";
var numberDel = '$';
function zen(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var sArr = strings;
    var sArrWithSiblings = [];
    for (var i = 0, ii = sArr.length; i < ii; i++) {
        var word = sArr[i];
        var sArrElement = word + numberDel + i;
        if (sArrElement.substr(0, 1) === '+') {
            sArrWithSiblings[sArrWithSiblings.length - 1] += sArrElement;
        }
        else {
            sArrWithSiblings.push(sArrElement);
        }
    }
    var outputArr = [];
    var allTags = [];
    for (var _a = 0, sArrWithSiblings_1 = sArrWithSiblings; _a < sArrWithSiblings_1.length; _a++) {
        var tagSequence = sArrWithSiblings_1[_a];
        var tags = tagSequence.split('>');
        allTags = allTags.concat(tags);
    }
    processTags(allTags, outputArr, values);
    return outputArr;
}
exports.zen = zen;
var camelToSnakeRegEx = /([A-Z])/g;
var toDashLowerCase = function ($1) { return "-" + $1.toLowerCase(); };
function camelToSnake(str) {
    return str.replace(camelToSnakeRegEx, toDashLowerCase);
}
function processTag(tag, outputArr, values, fnInside) {
    if (tag.length === 0)
        return;
    var tagWNumber = tag.split(numberDel);
    var tagWONumber = tagWNumber[0];
    var tagWClasses = tagWONumber.split('.');
    var tagWOClasses = tagWClasses[0];
    var tagWBooleanAttributes = tagWOClasses.split('@');
    var tagWOBooleanAttributes = tagWBooleanAttributes[0];
    var tagWID = tagWOBooleanAttributes.split('#');
    var tagWOIDAndNoDiv = tagWID[0];
    var idx = (tagWNumber.length > 1) ? parseInt(tagWNumber[1]) : -1;
    var val = idx > -1 ? values[idx] : undefined;
    if (tagWOIDAndNoDiv.length === 0) {
        if (tagWID.length === 1 && tagWClasses.length === 1 && tagWBooleanAttributes.length === 1) {
            if (typeof val === 'undefined')
                return;
        }
    }
    var tagWOID = tagWOIDAndNoDiv || 'div';
    outputArr.push('<' + tagWOID);
    if (tagWID.length > 1) {
        outputArr.push(" id=\"" + tagWID[1] + "\"");
    }
    if (tagWBooleanAttributes.length > 1) {
        var booleanAttributes = tagWBooleanAttributes.slice(1).map(function (s) { return camelToSnake(s); }).join(' ');
        outputArr.push(" " + booleanAttributes);
    }
    if (tagWClasses.length > 1) {
        outputArr.push(" class=\"" + tagWClasses.slice(1).join(' ') + "\"");
    }
    if (typeof val !== 'undefined') {
        switch (typeof val) {
            case 'string':
                outputArr.push('>');
                outputArr.push(val);
                break;
            case 'object':
                var props = val;
                var content = null;
                if (Array.isArray(val)) {
                    props = val[1];
                    content = val[0];
                }
                for (var key in props) {
                    var atV = props[key];
                    switch (typeof atV) {
                        case 'boolean':
                            if (atV) {
                                outputArr.push(" " + camelToSnake(key));
                            }
                            break;
                        default:
                            outputArr.push(" " + camelToSnake(key) + "=\"" + atV + "\"");
                    }
                }
                outputArr.push('>');
                if (content) {
                    outputArr.push(content);
                }
                break;
        }
    }
    else {
        outputArr.push('>');
    }
    if (fnInside)
        fnInside();
    outputArr.push('</' + tagWOID + '>');
}
function processTags(tags, outputArr, values) {
    if (tags.length === 0)
        return;
    var surroundingTag = tags.shift();
    if (surroundingTag.indexOf('+') > -1) {
        var siblingTags = surroundingTag.split('+');
        for (var _i = 0, siblingTags_1 = siblingTags; _i < siblingTags_1.length; _i++) {
            var tag = siblingTags_1[_i];
            processTag(tag, outputArr, values, null);
        }
    }
    else {
        var innerFun = function () { return processTags(tags, outputArr, values); };
        processTag(surroundingTag, outputArr, values, innerFun);
    }
}
//# sourceMappingURL=zenCore.js.map