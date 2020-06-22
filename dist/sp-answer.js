(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.spAnswer = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
