import Koa from 'koa';
const Router = require('koa-router');
const dotenv = require('dotenv');
const bodyParser = require('koa-bodyparser');
import cors from 'koa-cors';
import {AppDataSource} from "./db/data-source"
import configureControllers from './api/controllers'
import errorHandler from './api/middlewares/errorHandler'

dotenv.config();

AppDataSource.initialize()
  .then(() => console.log('Postgres DB is connected'))
  .catch(error => console.log(error))

const app = new Koa();
const router = new Router();


app.use(bodyParser());

app.use(cors({
  origin: 'http://localhost:3000',
  allowMethods: '*',
  allowHeaders: ['Authorization'],
}))

app.use(router.routes());

app.use(configureControllers())
app.use(errorHandler)
// Start server
app.listen(8080, () => console.log('Server running on port 8080'));
