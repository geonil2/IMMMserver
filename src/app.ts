import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan'
import helmet from 'helmet';
import 'express-async-errors';
import { config } from "./config";
import authRouter from './router/auth';
import { initSocket } from './connection/socket.js';
import { sequelize } from "./db/database.js";

const app = express();

app.use(express.json()); 
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/', authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(500);
    console.log(error);
});

sequelize.sync().then(() => {
    // const server = app.listen(config.host.port);
    console.log(config.host.port)
    app.listen(config.host.port);
    // initSocket(server);
});