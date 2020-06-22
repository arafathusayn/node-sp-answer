import Answer from "./models/Answer";
import Question from "./models/Question";

interface SurprisinglyPopularAnswer {
  positive: boolean;
  question?: Question;
}

const spAnswer = (input: {
  question?: Question;
  answers: Answer[];
  threshold?: number;
}): SurprisinglyPopularAnswer | null => {
  let question: Question = {
    text: "",
  };
  const answersCount = input.answers.length;
  let answers: Answer[] = [];
  let threshold = 0;
  let answersAreOkay = false;

  if (typeof input.threshold === "number") {
    threshold = input.threshold;
  }

  for (let i = 0; i < answersCount; i++) {
    if (
      input.answers &&
      typeof input.answers[i].positive === "boolean" &&
      typeof input.answers[i].popular === "boolean"
    ) {
      answersAreOkay = true;
    } else {
      answersAreOkay = false;
      break;
    }
  }

  if (answersAreOkay) {
    answers = input.answers;
  } else {
    return null;
  }

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
      positive: true,
      question,
    };
  } else {
    result = {
      positive: false,
      question,
    };
  }

  return result;
};

module.exports = spAnswer;
export default spAnswer;
