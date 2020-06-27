// const spAnswer = require("sp-answer");
const spAnswer = require("../dist/main"); // replace with the comment above

let answers = [];

for (let i = 0; i < 100; i++) {
  let answer = {};

  if (i < 50) {
    answer.positive = "heads";
  } else {
    answer.positive = "tails";
  }

  if (i < 50) {
    answer.popular = "heads";
  } else {
    answer.popular = "tails";
  }

  answers.push(answer);
}

const result = spAnswer({
  answers,
  question: {
    text: "Heads or Tails?",
  },
});

console.log(result);
// { answer: [ 'heads', 'tails' ], question: { text: 'Heads or Tails?' } }
