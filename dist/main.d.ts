import Answer from "./models/Answer";
import Question from "./models/Question";
interface SurprisinglyPopularAnswer {
    positive: boolean;
    question?: Question;
}
declare const spAnswer: (input: {
    question?: Question | undefined;
    answers: Answer[];
    threshold?: number | undefined;
}) => SurprisinglyPopularAnswer | null;
export default spAnswer;
