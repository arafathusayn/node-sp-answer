"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var spAnswer = function (input) {
    var _a;
    var question = {
        text: (input.question && input.question.text) || "",
    };
    var answersCount = input.answers.length;
    var answers = input.answers;
    var threshold = 0;
    var answersAreBoolean = false;
    if (typeof input.threshold === "number") {
        threshold = input.threshold;
    }
    for (var i = 0; i < answersCount; i++) {
        if (input.answers &&
            typeof input.answers[i].positive === "boolean" &&
            typeof input.answers[i].popular === "boolean") {
            answersAreBoolean = true;
        }
        else {
            answersAreBoolean = false;
            break;
        }
    }
    if (answersAreBoolean) {
        var affirmatives = 0;
        var popularityOfAffirmatives = 0;
        var negatives = 0;
        var popularityOfNegatives = 0;
        for (var _i = 0, answers_1 = answers; _i < answers_1.length; _i++) {
            var answer = answers_1[_i];
            if (answer.positive === true) {
                affirmatives++;
            }
            else {
                negatives++;
            }
            if (answer.popular === true) {
                popularityOfAffirmatives++;
            }
            else {
                popularityOfNegatives++;
            }
        }
        var differenceYes = affirmatives - popularityOfAffirmatives;
        var differenceNo = negatives - popularityOfNegatives;
        var result = void 0;
        if (differenceYes - differenceNo >= threshold) {
            result = {
                answer: true,
                question: question,
            };
        }
        else {
            result = {
                answer: false,
                question: question,
            };
        }
        return result;
    }
    else if (!answers.find(function (answer) {
        return typeof answer.positive !== "string" ||
            typeof answer.popular !== "string";
    })) {
        var rightAnswerDistribution = answers.reduce(function (acc, current) {
            var key = (current.positive && current.positive.toString()) || "";
            if (typeof acc[key] == "undefined") {
                acc[key] = 1;
            }
            else {
                acc[key] += 1;
            }
            return acc;
        }, {});
        var popularAnswerDistribution = answers.reduce(function (acc, current) {
            var key = (current.popular && current.popular.toString()) || "";
            if (typeof acc[key] == "undefined") {
                acc[key] = 1;
            }
            else {
                acc[key] += 1;
            }
            return acc;
        }, {});
        var score = {};
        for (var key in popularAnswerDistribution) {
            if (key === "") {
                return null;
            }
        }
        for (var key in rightAnswerDistribution) {
            if (key === "") {
                return null;
            }
            score = __assign(__assign({}, score), (_a = {}, _a[key] = rightAnswerDistribution[key] - (popularAnswerDistribution[key] || 0), _a));
        }
        var positives = [];
        for (var answer in score) {
            for (var otherAnswer in score) {
                var diff = score[answer] - score[otherAnswer];
                if (diff >= threshold) {
                    positives.push({ answer: answer, diff: diff });
                }
            }
        }
        var max_1 = Math.max.apply(Math, positives.map(function (x) { return x.diff; }));
        var derivedAnswers = Array.from(new Set(positives.filter(function (x) { return x && x.diff === max_1; }).map(function (x) { return x && x.answer; })));
        if (derivedAnswers.length === 1) {
            return {
                answer: derivedAnswers[0],
                question: question,
            };
        }
        else {
            return {
                answer: derivedAnswers,
                question: question,
            };
        }
    }
    else {
        return null;
    }
};
module.exports = spAnswer;
exports.default = spAnswer;
