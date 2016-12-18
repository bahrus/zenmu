"use strict";
function zen(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var sArr = strings;
    var sArrWithSiblings = [];
    for (var i = 0, ii = sArr.length; i < ii; i++) {
        var sArrElement = sArr[i];
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
    var zenContext = {
        closedFirstTag: false,
        idx: 0,
        openTag: null,
    };
    for (var _a = 0, sArrWithSiblings_1 = sArrWithSiblings; _a < sArrWithSiblings_1.length; _a++) {
        var tagSequence = sArrWithSiblings_1[_a];
        var tags = tagSequence.split('>');
        console.log(tags);
        zenContext.closedFirstTag = false;
        processTags(tags, outputArr, values, zenContext);
    }
    return outputArr;
}
exports.zen = zen;
function processTags(tags, outputArr, values, zenContext) {
    if (tags.length === 0)
        return;
    var surroundingTag = tags.shift();
    if (surroundingTag.indexOf('+') > -1) {
    }
    else {
        outputArr.push("<" + surroundingTag + ">");
        processTags(tags, outputArr, values, zenContext);
        if (!zenContext.closedFirstTag) {
            if (zenContext.idx < values.length) {
                outputArr.push(values[zenContext.idx]);
                zenContext.idx++;
            }
            zenContext.closedFirstTag = true;
        }
        outputArr.push("</" + surroundingTag + ">");
    }
}
function processSiblings() {
}
//# sourceMappingURL=zenCore.js.map