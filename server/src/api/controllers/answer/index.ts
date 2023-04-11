import Router from "koa-router";
import verifyToken from "../../middlewares/verifyToken";
import add from "./add";
import getFeedback from "./getFeedback";

export default (): [Router.IMiddleware, Router.IMiddleware] => {
  const router: Router = new Router({
    prefix: '/answers',
  })

  router.post('/',  verifyToken, add)
  router.get('/feedback',  verifyToken, getFeedback)

  return [router.routes(), router.allowedMethods()]
}
