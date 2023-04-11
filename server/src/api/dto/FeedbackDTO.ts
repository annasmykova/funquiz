import { Question, QuestionOption } from "../../db/entities/Question";
import { UserAnswer } from "../../db/entities/UserAnswer";

type QuestionFeedbackT = Omit<Question, "options"> & {
  userChoice: QuestionOption;
};

type FeedbackDTO = {
  id: number;
  questions: Array<QuestionFeedbackT>;
  score: number;
};

export const getFeedbackDTO = (
  questions: Question[],
  userAnswer: UserAnswer
) => {
  const formattedQuestions: Array<QuestionFeedbackT> = questions.map(
    (question) => ({
      ...question,
      options: undefined,
      userChoice: question.options.find(
        (option) => option.value === userAnswer.answers[question.id]
      ),
    })
  );

  return {
    id: userAnswer.id,
    questions: formattedQuestions,
    score: userAnswer.score,
  };
};
