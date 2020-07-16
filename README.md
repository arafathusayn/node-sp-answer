# node-sp-answer

[![](https://github.com/arafathusayn/node-sp-answer/workflows/tests/badge.svg)](https://github.com/arafathusayn/node-sp-answer/actions?query=workflow%3Atests) [![](https://img.shields.io/codecov/c/github/arafathusayn/node-sp-answer/master)](https://codecov.io/github/arafathusayn/node-sp-answer?branch=master) [![](https://badge.fury.io/js/sp-answer.svg)](https://www.npmjs.com/package/sp-answer) [![](https://snyk.io/test/github/arafathusayn/node-sp-answer/badge.svg)](https://snyk.io/test/github/arafathusayn/node-sp-answer) 

Determine the surprisingly popular answer

`npm i sp-answer`

## Description

```ts
function spAnswer(parameters: {
  question?: Question; // optional
  answers: Answer[]; // required
  threshold?: number; // default: 0
}): SurprisinglyPopularAnswer | null {
  /* ... */
}

interface Question {
  id?: string; // optional
  text: string;
}

interface Answer {
  positive: boolean | string;
  popular: boolean | string;
}

interface SurprisinglyPopularAnswer {
  answer: boolean | string | string[];
  question?: Question; // optional
}
```

## Example

```js
// Question: Is Philadelphia the capital of Pennsylvania?
const spAnswer = require("sp-answer");

let answers = [];

for (let i = 0; i < 100; i++) {
  let answer = {
    positive: true,
    popular: true,
  };

  if (i < 65) {
    answer.positive = true;
  } else {
    answer.positive = false;
  }

  if (i < 75) {
    answer.popular = true;
  } else {
    answer.popular = false;
  }

  answers.push(answer);
}

const result = spAnswer({ answers });
// result.answer === false
```
