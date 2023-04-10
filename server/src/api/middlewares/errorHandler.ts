const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.status = err.status || 500;
    ctx.body = {
      code: err.status,
      message: err.message
    };
  }
};

export default errorHandler
