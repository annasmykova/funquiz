import type { RouterContext } from 'koa-router'
import type { Context } from 'koa'
import {User} from "../../../db/entities/User";
import AnswerService from "../../services/AnswerService";


export default async (ctx: RouterContext<Context>) => {
  const user: User = ctx.state.user

  const feedback = await AnswerService.getFeedback(user)

  ctx.response.status = 200
  ctx.response.body = {
    code: 200,
    feedback,
    success: true,
  }
}
