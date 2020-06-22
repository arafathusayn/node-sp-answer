"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spAnswer = function (input) {
    var question = {
        text: "",
    };
    var answersCount = input.answers.length;
    var answers = [];
    var threshold = 0;
    var answersAreOkay = false;
    if (typeof input.threshold === "number") {
        threshold = input.threshold;
    }
    for (var i = 0; i < answersCount; i++) {
        if (input.answers &&
            typeof input.answers[i].positive === "boolean" &&
            typeof input.answers[i].popular === "boolean") {
            answersAreOkay = true;
        }
        else {
            answersAreOkay = false;
            break;
        }
    }
    if (answersAreOkay) {
        answers = input.answers;
    }
    else {
        return null;
    }
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
    var result;
    if (differenceYes - differenceNo >= threshold) {
        result = {
            positive: true,
            question: question,
        };
    }
    else {
        result = {
            positive: false,
            question: question,
        };
    }
    return result;
};
module.exports = spAnswer;
