"use strict";
var numberDel = '###';
function zen(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var sArr = strings;
    var sArrWithSiblings = [];
    for (var i = 0, ii = sArr.length; i < ii; i++) {
        var word = sArr[i];
        if (!word)
            continue;
        var sArrElement = word + '###' + i;
        if (sArrElement.substr(0, 1) === '+') {
            sArrWithSiblings[sArrWithSiblings.length - 1] += sArrElement;
        }
        else {
            sArrWithSiblings.push(sArrElement);
        }
    }
    console.log(sArrWithSiblings);
    var outputArr = [];
    var tagBuffer = [];
    // const zenContext = {
    //     // closedFirstTag: false,
    //     // idx: 0,
    //     // openTag: null,
    // } as ZenContext;
    for (var _a = 0, sArrWithSiblings_1 = sArrWithSiblings; _a < sArrWithSiblings_1.length; _a++) {
        var tagSequence = sArrWithSiblings_1[_a];
        var tags = tagSequence.split('>');
        console.log(tags);
        //zenContext.closedFirstTag = false;
        processTags(tags, outputArr, values);
    }
    return outputArr;
}
exports.zen = zen;
function processTag(tag, outputArr, values, fnInside) {
    var tagWNumber = tag.split(numberDel);
    var tagWONumber = tagWNumber[0];
    var tagWID = tagWONumber.split('#');
    var tagWOID = tagWID[0];
    outputArr.push('<' + tagWOID);
    if (tagWID.length > 1) {
        outputArr.push(' id=' + tagWID[1]);
    }
    outputArr.push('>');
    if (tagWNumber.length > 1) {
        var idx = parseInt(tagWNumber[1]);
        outputArr.push(values[idx]);
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
function processSiblings() {
}
//# sourceMappingURL=zenCore.js.map