import type { RouterContext } from 'koa-router'
import type { Context } from 'koa'
import {User} from "../../../db/entities/User";
import UserService from "../../services/UserService";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface LoginRequest {
  email: string
  password: string
}

export default async (ctx: RouterContext<Context, LoginRequest>) => {
  const body = ctx.request.body as LoginRequest

  const { email, password }: LoginRequest = body

  const user: User = await UserService.getByEmail(email)
  const passwordMatch = await bcrypt.compare(password, user?.password);

  if (!user || !passwordMatch) {
    ctx.res.statusCode = 401
    ctx.res.statusMessage ='This email or password is not valid!'
    return
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

  ctx.response.status = 200
  ctx.response.body = {
    code: 200,
    user: {...user, password: undefined},
    token,
    success: true,
  }
}
