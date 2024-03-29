import express, {json} from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/Logger.js';
import router from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();
app.use(cors({
  origin: ['http://localhost:3001', 'https://movie-service.nomoredomainsmonster.ru'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  maxAge: 60,
  allowedHeaders: ['sessionId', 'Content-Type', 'Authorization', 'authorization'],
}));

mongoose.connect(MONGO_URL);

app.use(json());
app.use(helmet());
app.use(cookieParser());

app.use(requestLogger);

app.use('/', router);
/* app.use(((req, res, next) => {
  console.log(req.body);
  return next()})); */
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
