import { Request, Response, NextFunction } from 'express';
import { getSocketIO } from '../connection/socket.js';
import * as nftRepository from '../data/nft';

export async function getNfts(req: Request, res: Response) {
    const username = req.query.username;
    const data = await (username
        ? nftRepository.getAllByUsername(username)
        : nftRepository.getAll());
    res.status(200).json(data);
}

export async function getNft(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const nft = await nftRepository.getById(id);
    if (nft) {
        res.status(200).json(nft);
    } else {
        res.status(404).json({ message: `nft id(${id}) not found` });
    }
}

export async function createNft(req: Request, res: Response, next: NextFunction) {
    const { text } = req.body;
    const nft = await nftRepository.create(text, req.userId);
    res.status(201).json(nft);
    getSocketIO().emit('nfts', nft);
}

export async function updateNft(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const text = req.body.text;
    const nft = await nftRepository.getById(id);
    if (!nft) {
        return res.status(404).json({ message: `nft not found: ${id}` });
    }
    if (nft.userId !== req.userId) {
        return res.sendStatus(403);
    }
    const updated = await nftRepository.update(id, text);
    res.status(200).json(updated);
}
