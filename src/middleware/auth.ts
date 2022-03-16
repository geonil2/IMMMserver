import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

const AUTH_ERROR = { message : 'Authorization Error' };

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }
    console.log(authHeader, 'authHeader')
    const token = authHeader.split(' ' )[1];

    jwt.verify(
        token,
        config.jwt.secretKey,
        async (error, decoded: any) => {
            if (error) {
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await userRepository.findById(decoded?.id);
            if (!user) {
                return res.status(401).json(AUTH_ERROR);
            }
            //@ts-ignore
            req.userId = user.id; // req.customData
            next();
        }
    );
}