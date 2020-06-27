import Answer from "./models/Answer";
import Question from "./models/Question";

interface SurprisinglyPopularAnswer {
  answer: boolean | string | string[];
  question?: Question;
}

const spAnswer = (input: {
  question?: Question;
  answers: Answer[];
  threshold?: number;
}): SurprisinglyPopularAnswer | null => {
  let question: Question = {
    text: (input.question && input.question.text) || "",
  };
  const answersCount = input.answers.length;
  let answers: Answer[] = input.answers;
  let threshold = 0;
  let answersAreBoolean = false;

  if (typeof input.threshold === "number") {
    threshold = input.threshold;
  }

  for (let i = 0; i < answersCount; i++) {
    if (
      input.answers &&
      typeof input.answers[i].positive === "boolean" &&
      typeof input.answers[i].popular === "boolean"
    ) {
      answersAreBoolean = true;
    } else {
      answersAreBoolean = false;
      break;
    }
  }

  if (answersAreBoolean) {
    let affirmatives = 0;
    let popularityOfAffirmatives = 0;
    let negatives = 0;
    let popularityOfNegatives = 0;

    for (const answer of answers) {
      if (answer.positive === true) {
        affirmatives++;
      } else {
        negatives++;
      }

      if (answer.popular === true) {
        popularityOfAffirmatives++;
      } else {
        popularityOfNegatives++;
      }
    }

    const differenceYes = affirmatives - popularityOfAffirmatives;
    const differenceNo = negatives - popularityOfNegatives;

    let result: SurprisinglyPopularAnswer;

    if (differenceYes - differenceNo >= threshold) {
      result = {
        answer: true,
        question,
      };
    } else {
      result = {
        answer: false,
        question,
      };
    }

    return result;
  } else if (
    !answers.find(
      (answer) =>
        typeof answer.positive !== "string" ||
        typeof answer.popular !== "string",
    )
  ) {
    const rightAnswerDistribution = answers.reduce<{ [key: string]: number }>(
      (acc: { [key: string]: number }, current: Answer) => {
        const key = (current.positive && current.positive.toString()) || "";

        if (typeof acc[key] == "undefined") {
          acc[key] = 1;
        } else {
          acc[key] += 1;
        }

        return acc;
      },
      {},
    );

    const popularAnswerDistribution = answers.reduce<{ [key: string]: number }>(
      (acc: { [key: string]: number }, current: Answer) => {
        const key = (current.popular && current.popular.toString()) || "";

        if (typeof acc[key] == "undefined") {
          acc[key] = 1;
        } else {
          acc[key] += 1;
        }

        return acc;
      },
      {},
    );

    let score: { [key: string]: number } = {};

    for (const key in popularAnswerDistribution) {
      if (key === "") {
        return null;
      }

      score = {
        ...score,
        [key]:
          (rightAnswerDistribution[key] || 0) - popularAnswerDistribution[key],
      };
    }

    for (const key in rightAnswerDistribution) {
      if (key === "") {
        return null;
      }

      score = {
        ...score,
        [key]:
          rightAnswerDistribution[key] - (popularAnswerDistribution[key] || 0),
      };
    }

    let positives: { answer: string; diff: number }[] = [];

    for (const answer in score) {
      for (const otherAnswer in score) {
        const diff = score[answer] - score[otherAnswer];

        if (diff >= threshold) {
          positives.push({ answer, diff });
        }
      }
    }

    const max = Math.max(...positives.map((x) => x.diff));

    const derivedAnswers = Array.from(
      new Set(
        positives.filter((x) => x && x.diff === max).map((x) => x && x.answer),
      ),
    );

    if (derivedAnswers.length === 1) {
      return {
        answer: derivedAnswers[0],
        question,
      };
    } else {
      return {
        answer: derivedAnswers,
        question,
      };
    }
  } else {
    return null;
  }
};

module.exports = spAnswer;
export default spAnswer;
