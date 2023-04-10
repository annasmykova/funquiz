import Router from "koa-router";
import configureUser from './user'


export default (): Router.IMiddleware => {
  const router: Router = new Router({
    prefix: '/api',
  })

  router.use(...configureUser())

  return router.routes()
}
