import jwt from 'jsonwebtoken'
import UserService from '../services/UserService'

const verifyToken = async (ctx, next) => {
  const token = ctx.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    ctx.status = 401;
    ctx.body = { message: 'Unauthorized' };
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    ctx.state.user = await UserService.getById(decoded.userId)
  } catch (err) {
    ctx.status = 401;
    ctx.body = { message: 'Invalid token' };
    return;
  }
  await next();
};

export default verifyToken
