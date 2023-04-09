import jwt from 'jsonwebtoken'
import UserService from '../services/UserService'

const verifyToken = async (ctx, next) => {
  const token = ctx.headers.authorization;
  if (!token) {
    ctx.status = 401;
    ctx.body = { message: 'Unauthorized' };
    return;
  }
  try {
    const decoded = jwt.verify(token, 'mysecret');
    ctx.state.user = await UserService.getById(decoded.id)
  } catch (err) {
    ctx.status = 401;
    ctx.body = { message: 'Invalid token' };
    return;
  }
  await next();
};

export default verifyToken
