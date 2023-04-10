import Router from "koa-router";
import verifyToken from "../../middlewares/verifyToken";
import listQuestions from "./listQuestions";

export default (): [Router.IMiddleware, Router.IMiddleware] => {
  const router: Router = new Router({
    prefix: '/questions',
  })

  router.get('/',  verifyToken, listQuestions)

  return [router.routes(), router.allowedMethods()]
}
