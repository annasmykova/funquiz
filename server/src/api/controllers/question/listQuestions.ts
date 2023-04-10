import type { RouterContext } from 'koa-router'
import type { Context } from 'koa'
import QuestionService from "../../services/QuestionService";


export default async (ctx: RouterContext<Context>) => {
  const questions = await QuestionService.getQuestions()

  ctx.response.status = 200
  ctx.response.body = {
    code: 200,
    questions,
    success: true,
  }
}
