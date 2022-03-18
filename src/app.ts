import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan'
import helmet from 'helmet';
import 'express-async-errors';
import { config } from "./config";
import authRouter from './router/auth';
import nftRouter from './router/nft';
// import chatRouter from './router/chat';
import { initSocket } from './connection/socket.js';
import { sequelize } from "./db/database.js";

const app = express();

app.use(express.json()); 
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/auth', authRouter);
app.use('/', nftRouter);
// app.use('/', chatRouter);

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