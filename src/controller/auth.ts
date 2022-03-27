import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as userRepository from '../data/auth';
import { config } from '../config';

export async function signUp(req: Request, res: Response) {
    const { wallet, password } = req.body;
    const found = await userRepository.findByWallet(wallet);
    if (found) {
        return res.status(409).json({ message: `${wallet} already exists` });
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const user = await userRepository.createUser({ 
        wallet,
        password : hashed,
        username : '',
        image : 'https://picsum.photos/seed/picsum/200/300',
        description : '',
        url : ''
    });

    const token = createJwtToken(user.id);
    res.status(201).json({ ...user, token : token });
}

export async function signIn(req: Request, res: Response) {
    const { wallet, password } = req.body;
    const user = await userRepository.findByWallet(wallet);
    if (!user) {
        return res.status(401).json({ message : 'Invalid user' });
    }
    //@ts-ignore
    const userData = user.dataValues;
    const isValidPassword = await bcrypt.compare(password, userData.password);

    if (!isValidPassword) {
        return res.status(401).json({ message : 'Invalid user' });
    }

    const token = createJwtToken(userData.id);
    res.status(200).json({ ...userData, token : token });
}

export async function update(req: Request, res: Response) {
    const { wallet, username, description, image, url } = req.body;
    const user = await userRepository.findByWallet(wallet);
    if (!user) {
        return res.status(401).json({ message : 'Invalid user' });
    }
    
    const updated = await userRepository.update(wallet, username, description, image, url);
    //@ts-ignore
    res.status(200).json(updated.dataValues);
}

function createJwtToken(id: number) {
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn : config.jwt.expiresInSec});
}
