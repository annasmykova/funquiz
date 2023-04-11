import type { RouterContext } from "koa-router";
import type { Context } from "koa";
import { User } from "../../../db/entities/User";
import UserService from "../../services/UserService";
import jwt from "jsonwebtoken";
import ValidationService from "../../services/ValidationService";

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default async (ctx: RouterContext<Context, RegisterRequest>) => {
  try {
    const body = ctx.request.body as RegisterRequest;
    const validationResult = ValidationService.validateSignUp(body);

    if (validationResult) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: "Invalid register parameters",
        errors: validationResult,
      };
      return;
    }

    const existedUser = await UserService.getByEmail(body.email);

    if (existedUser) {
      ctx.status = 409;
      ctx.body = {
        code: 409,
        message: "User already exists",
      };
      return;
    }

    const user: User = await UserService.createUser(body);

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
  } catch (err) {
    console.log(err);
    ctx.res.statusCode = 400;
    ctx.res.statusMessage = err.message;
  }
};
