import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as userRepository from '../data/auth';
import { config } from '../config';

export async function signUp(req: Request, res: Response) {
    const { wallet } = req.body;
    const found = await userRepository.findByWallet(wallet);
    if (found) {
        return res.status(409).json({ message: `${wallet} already exists` });
    }
    const hashed = await bcrypt.hash(wallet, config.bcrypt.saltRounds);
    const user = await userRepository.createUser({ 
        wallet,
        password : hashed,
        username : '',
        image : 'https://picsum.photos/seed/picsum/200/300',
        description : '',
        url : ''
    });

    const token = createJwtToken(user.id);
    res.status(201).json({ 
        token : token, 
        id : user.id,
        wallet : user.wallet,
        username : user.username,
        description : user.description,
        image : user.image,
        url : user.url
    });
}

export async function signIn(req: Request, res: Response) {
    const { wallet, id } = req.body;
    const user = await userRepository.findById(id);
    if (!user) {
        return res.status(401).json({ message : 'Invalid user' });
    }
    const isValidPassword = await bcrypt.compare(wallet, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ message : 'Invalid user' });
    }

    const token = createJwtToken(user.id);
    res.status(200).json({ 
        token : token, 
        id : user.id,
        wallet : user.wallet,
        username : user.username,
        description : user.description,
        image : user.image,
        url : user.url
    });
}

export async function update(req: Request, res: Response) {
    const { id, wallet, username, description, image, url } = req.body;
    const user = await userRepository.findById(id);
    if (!user) {
        return res.status(401).json({ message : 'Invalid user' });
    }
    const isValidPassword = await bcrypt.compare(wallet, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message : 'Invalid user' });
    }
    const updated = await userRepository.update(id, username, description, image, url);
    res.status(200).json({
        //@ts-ignore 
        id : updated.id,
        //@ts-ignore 
        wallet : updated.wallet,
        //@ts-ignore 
        username : updated.username,
        //@ts-ignore 
        description : updated.description,
        //@ts-ignore 
        image : updated.image,
        //@ts-ignore 
        url : updated.url
    });
}

// export async function me(req: Request, res: Response) {
//     const { wallet } = req.body;
//     const user = await userRepository.findByWallet(wallet);
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }
//     //@ts-ignore
//     res.status(200).json(user.dataValues);
// }

function createJwtToken(id: number) {
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn : config.jwt.expiresInSec});
}
