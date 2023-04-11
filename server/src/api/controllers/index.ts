import Router from "koa-router";
import configureUser from './user'
import configureQuestions from './question'
import configureAnswers from './answer'


export default (): Router.IMiddleware => {
  const router: Router = new Router({
    prefix: '/api',
  })

  router.use(...configureUser())
  router.use(...configureQuestions())
  router.use(...configureAnswers())

  return router.routes()
}
