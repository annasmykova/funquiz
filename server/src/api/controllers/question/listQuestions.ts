import type { RouterContext } from 'koa-router'
import type { Context } from 'koa'
import {getQuestionsDTO} from "../../dto/QuestionDTO";
import AnswerService from "../../services/AnswerService";
import QuestionService from "../../services/QuestionService";


export default async (ctx: RouterContext<Context>) => {
  const user = ctx.state.user

  const existedAnswers = await AnswerService.getByUser(user)

  if (existedAnswers) {
    ctx.response.status = 200
    ctx.response.body = {
      code: 200,
      questions: [],
      score: existedAnswers.score,
      message: 'Do you think that it is fair to take this quiz again? 😊',
      success: true,
    }
    return
  }

  const questions = await QuestionService.getQuestions()

  ctx.response.status = 200
  ctx.response.body = {
    code: 200,
    questions: getQuestionsDTO(questions),
    success: true,
  }
}
