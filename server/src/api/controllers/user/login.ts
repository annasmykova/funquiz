import type { RouterContext } from "koa-router";
import type { Context } from "koa";
import { User } from "../../../db/entities/User";
import UserService from "../../services/UserService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ValidationService from "../../services/ValidationService";

export interface LoginRequest {
  email: string;
  password: string;
}

export default async (ctx: RouterContext<Context, LoginRequest>) => {
  const body = ctx.request.body as LoginRequest;

  const { email, password }: LoginRequest = body;
  const validationResult = ValidationService.validateLogin(body);

  if (validationResult) {
    ctx.status = 400;
    ctx.body = {
      code: 400,
      message: "Invalid login parameters",
      errors: validationResult,
    };
    return;
  }

  const user: User = await UserService.getByEmail(email);

  if (!user) {
    ctx.status = 400;
    ctx.body = {
      code: 400,
      message: "No user with this email found",
    };
    return;
  }
  const passwordMatch = await bcrypt.compare(password, user?.password);

  if (!passwordMatch) {
    ctx.status = 400;
    ctx.body = {
      code: 400,
      message: "Invalid email or password",
    };
    return;
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  ctx.response.status = 200;
  ctx.response.body = {
    code: 200,
    user: { ...user, password: undefined },
    token,
    success: true,
  };
};
