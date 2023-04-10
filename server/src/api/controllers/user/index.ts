import Router from "koa-router";
import verifyToken from "../../middlewares/verifyToken";
import getUser from "./getUser";
import login from "./login";
import register from "./register";

export default (): [Router.IMiddleware, Router.IMiddleware] => {
  const router: Router = new Router({
    prefix: '/user',
  })

  router.get('/',  verifyToken, getUser)
  router.post('/login', login)
  router.post('/register', register)

  return [router.routes(), router.allowedMethods()]
}
