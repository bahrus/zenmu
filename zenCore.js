"use strict";
function zen(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var sArr = strings;
    var outputArr = [];
    var tagBuffer = [];
    for (var _a = 0, sArr_1 = sArr; _a < sArr_1.length; _a++) {
        var tagSequence = sArr_1[_a];
        var tags = tagSequence.split('>');
        processTags(tags, outputArr);
    }
    return outputArr;
}
exports.zen = zen;
function processTags(tags, outputArr) {
    if (tags.length === 0)
        return;
    var firstTag = tags.shift();
    outputArr.push("<" + firstTag + ">");
    processTags(tags, outputArr);
    outputArr.push("</" + firstTag + ">");
}
//# sourceMappingURL=zenCore.js.map