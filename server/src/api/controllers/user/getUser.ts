import type { RouterContext } from 'koa-router'
import type { Context } from 'koa'


export default async (ctx: RouterContext<Context>) => {
  const user = ctx.state.user

  ctx.response.status = 200
  ctx.response.body = {
    code: 200,
    user,
    success: true,
  }
}
