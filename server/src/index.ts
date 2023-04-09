import Koa from 'koa';
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
import {AppDataSource} from "./db/data-source"

AppDataSource.initialize()
  .then(() => console.log('Postgres DB is connected'))
  .catch(error => console.log(error))

const app = new Koa();
const router = new Router();


app.use(bodyParser());

app.use(router.routes());

// Start server
app.listen(8080, () => console.log('Server running on port 8080'));
