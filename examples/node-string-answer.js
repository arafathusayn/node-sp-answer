// const spAnswer = require("sp-answer");
const spAnswer = require("../dist/main"); // replace with the comment above

let answers = [];

for (let i = 0; i < 100; i++) {
  let answer = {};

  if (i < 65) {
    answer.positive = "yes";
  } else {
    answer.positive = "no";
  }

  if (i < 75) {
    answer.popular = "yes";
  } else {
    answer.popular = "no";
  }

  answers.push(answer);
}

const result = spAnswer({
  answers,
  question: {
    text: "Is Philadelphia the capital of Pennsylvania?",
  },
});

console.log(result);
/*
  {
    answer: "no",
    question: { text: 'Is Philadelphia the capital of Pennsylvania?' }
  }
*/
