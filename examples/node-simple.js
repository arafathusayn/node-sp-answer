// const spAnswer = require("sp-answer");
const spAnswer = require("../dist/main"); // replace with the comment above

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

const result = spAnswer({
  answers,
  question: {
    text: "Is Philadelphia the capital of Pennsylvania?",
  },
});

console.log(result);
/*
  {
    positive: false,
    question: { text: 'Is Philadelphia the capital of Pennsylvania?' }
  }
*/
