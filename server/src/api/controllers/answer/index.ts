import Router from "koa-router";
import verifyToken from "../../middlewares/verifyToken";
import add from "./add";

export default (): [Router.IMiddleware, Router.IMiddleware] => {
  const router: Router = new Router({
    prefix: '/answers',
  })

  router.post('/',  verifyToken, add)

  return [router.routes(), router.allowedMethods()]
}
