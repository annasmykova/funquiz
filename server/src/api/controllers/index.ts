import Router from "koa-router";
import configureUser from './user'
import configureQuestions from './question'


export default (): Router.IMiddleware => {
  const router: Router = new Router({
    prefix: '/api',
  })

  router.use(...configureUser())
  router.use(...configureQuestions())

  return router.routes()
}
