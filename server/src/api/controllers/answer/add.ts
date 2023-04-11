import type { RouterContext } from 'koa-router'
import type { Context } from 'koa'
import {User} from "../../../db/entities/User";
import {AnswerMap} from "../../../db/entities/UserAnswer";
import AnswerService from "../../services/AnswerService";

type AnswerRequest = {
  answers: AnswerMap
}

export default async (ctx: RouterContext<Context>) => {
  const user: User = ctx.state.user
  const body = ctx.request.body as AnswerRequest
  const { answers } = body

  const existedAnswers = await AnswerService.getByUser(user)

  if (existedAnswers) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      message: 'Answers for the user already exist'
    };
    return
  }

  const isValid = await AnswerService.validateAnswers(answers)

  if (!isValid) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      message: 'Invalid data'
    };
    return
  }

  const score = await AnswerService.getScore(answers)

  const answer = await AnswerService.addUserAnswer({
    user,
    answers,
    score
  })

  ctx.response.status = 200
  ctx.response.body = {
    code: 200,
    answer,
    score,
    success: true,
  }
}
