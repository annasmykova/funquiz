import {Question} from "../../db/entities/Question";

type QuestionDTO = {
  id: number,
  title: string,
  imgSrc: string,
  options: {
    text: string,
    value: string
  }[]
}

export const getQuestionsDTO = (questions: Question[]): QuestionDTO[] =>
  questions.map(question => ({
    id: question.id,
    title: question.title,
    imgSrc: question.imgSrc,
    options: question.options.map(option => ({ text: option.text, value: option.value }))
  }))
