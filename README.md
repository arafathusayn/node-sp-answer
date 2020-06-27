# node-sp-answer

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
