import type { RouterContext } from 'koa-router'
import type { Context } from 'koa'


export default async (ctx: RouterContext<Context>) => {
  const user = ctx.state.user
  console.log('user');
  console.log(user);

  ctx.response.status = 200
  ctx.response.body = {
    code: 200,
    user: {...user, password: undefined},
    success: true,
  }
}
