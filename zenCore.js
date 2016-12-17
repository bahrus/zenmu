"use strict";
function zen(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var sArr = strings;
    var outputArr = [];
    var tagBuffer = [];
    var zenContext = {
        closedFirstTag: false,
        idx: 0
    };
    for (var _a = 0, sArr_1 = sArr; _a < sArr_1.length; _a++) {
        var tagSequence = sArr_1[_a];
        var tags = tagSequence.split('>');
        zenContext.closedFirstTag = false;
        processTags(tags, outputArr, values, zenContext);
    }
    return outputArr;
}
exports.zen = zen;
function processTags(tags, outputArr, values, zenContext) {
    if (tags.length === 0)
        return;
    var firstTag = tags.shift();
    outputArr.push("<" + firstTag + ">");
    processTags(tags, outputArr, values, zenContext);
    if (!zenContext.closedFirstTag) {
        if (zenContext.idx < values.length) {
            outputArr.push(values[zenContext.idx]);
        }
        zenContext.closedFirstTag = true;
    }
    outputArr.push("</" + firstTag + ">");
}
//# sourceMappingURL=zenCore.js.map