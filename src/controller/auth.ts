import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as userRepository from '../data/auth';
import { config } from '../config';

export async function login(req: Request, res: Response) {
    const { wallet } = req.body;
    const user = await userRepository.findByWallet(wallet);
    console.log(user, 'user')
    if (!user) {
        await signup(req, res);
        return;
        // isValidPassword = await bcrypt.compare(wallet, newUser);
    }
    // isValidPassword = await bcrypt.compare(wallet, user.wallet);
    const isValidPassword = true;

    if (!isValidPassword) {
        return res.status(401).json({ message : 'Invalid user' });
    }
    const token = createJwtToken(1);
    res.status(200).json({ token, wallet });
}

export async function signup(req: Request, res: Response) {
    const { wallet } = req.body;
    // const found = await userRepository.findByWallet(wallet);
    // if (found) {
    //     return res.status(409).json({ message: `${wallet} already exists` });
    // }
    const hashed = await bcrypt.hash(wallet, config.bcrypt.saltRounds);
    const userId = await userRepository.createUser({
        wallet
    });

    const token = createJwtToken(userId);
    res.status(201).json({ token, wallet });
}

function createJwtToken(id: number) {
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn : config.jwt.expiresInSec});
}
