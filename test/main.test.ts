import spAnswer from "../src/main";
import Answer from "../src/models/Answer";

describe("spAnswer", () => {
  let questionText = "Is Philadelphia the capital of Pennsylvania?";

  test(`False for question: '${questionText}'`, () => {
    const answers = getAnswersForPhiladelphiaQuestion();

    const result = spAnswer({
      answers,
      question: {
        text: questionText,
      },
    });

    expect(result && result.positive).toBe(false);
  });

  questionText =
    "Is the all-postive & all-popular answer going to win by default (if threshold === 0)?";

  test(`True for question: '${questionText}'`, () => {
    let answers: Answer[] = [];

    for (let i = 0; i < 100; i++) {
      let answer: Answer = {
        positive: true,
        popular: true,
      };

      answers.push(answer);
    }

    const result = spAnswer({
      answers,
      question: {
        text: questionText,
      },
    });

    expect(result && result.positive).toBe(true);
  });

  test(`Returns null if the given answers are not having boolean types for postive & popular`, () => {
    let result = spAnswer({
      answers: [
        {
          positive: true,
          popular: null!,
        },
      ],
      question: {
        text: questionText,
      },
    });

    expect(result).toBe(null);

    result = spAnswer({
      answers: [
        {
          positive: null!,
          popular: true,
        },
      ],
      question: {
        text: questionText,
      },
    });

    expect(result).toBe(null);
  });

  test(`threshold is applied if provided`, () => {
    const answers = getAnswersForPhiladelphiaQuestion();

    const result = spAnswer({
      answers,
      question: {
        text: questionText,
      },
      threshold: -21,
    });

    expect(result && result.positive).toBe(true);
  });

  test(`Return empty string for question.text if question is not provided in args`, () => {
    const result = spAnswer({
      answers: [{ positive: true, popular: true }],
    });

    expect(result && result.question && result.question.text).toBe("");
  });
});

function getAnswersForPhiladelphiaQuestion(): Answer[] {
  let answers: Answer[] = [];

  for (let i = 0; i < 100; i++) {
    let answer: Answer = {
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

  return answers;
}
