import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import helmet from 'helmet';
import 'express-async-errors';
import testRouter from './router/router';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/', testRouter);

app.listen(8080);