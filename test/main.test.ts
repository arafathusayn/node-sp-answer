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

    expect(result && result.answer).toBe(false);
  });

  test(`Supports string answers and returns answer === "no" for question: '${questionText}'`, () => {
    const answers = getStringAnswersForPhiladelphiaQuestion();

    const result = spAnswer({
      answers,
      question: {
        text: questionText,
      },
    });

    expect(result && result.answer).toStrictEqual("no");
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

    expect(result && result.answer).toBe(true);
  });

  test(`Returns null if the given answers are not having boolean/string types for postive & popular`, () => {
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

  test(`Threshold is applied if provided`, () => {
    const answers = getAnswersForPhiladelphiaQuestion();

    const result = spAnswer({
      answers,
      question: {
        text: questionText,
      },
      threshold: -21,
    });

    expect(result && result.answer).toBe(true);
  });

  test(`Returns empty string for question.text if question is not provided in args`, () => {
    const result = spAnswer({
      answers: [{ positive: true, popular: true }],
    });

    expect(result && result.question && result.question.text).toBe("");
  });

  test(`Returns null if one of the answers is an empty string`, () => {
    let result = spAnswer({
      answers: [
        {
          positive: "",
          popular: "test",
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
          positive: "test",
          popular: "",
        },
      ],
      question: {
        text: questionText,
      },
    });

    expect(result).toBe(null);
  });

  test(`Returns string[] for answer if there are multiple answers with the same score.`, () => {
    let answers = [];
    const options = ["heads", "tails"];

    for (let i = 0; i < 100; i++) {
      let answer: Answer = {
        positive: "",
        popular: "",
      };

      if (i < 50) {
        answer.positive = options[0];
      } else {
        answer.positive = options[1];
      }

      if (i < 50) {
        answer.popular = options[0];
      } else {
        answer.popular = options[1];
      }

      answers.push(answer);
    }

    const result = spAnswer({
      answers,
      question: {
        text: "Heads or Tails?",
      },
    });

    expect(result && result.answer).toStrictEqual(options);
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

function getStringAnswersForPhiladelphiaQuestion(): Answer[] {
  let answers: Answer[] = [];

  for (let i = 0; i < 100; i++) {
    let answer: Answer = {
      positive: "yes",
      popular: "yes",
    };

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

  return answers;
}
