"use strict";
// import { Request, Response, NextFunction } from 'express';
// import { getSocketIO } from '../connection/socket.js';
// import * as chatRepository from '../data/chat';
// export async function getChats(req: Request, res: Response) {
//     const username = req.query.username;
//     const data = await (username
//         ? chatRepository.getAllByUsername(username)
//         : chatRepository.getAll());
//     res.status(200).json(data);
// }
// export async function getChat(req: Request, res: Response, next: NextFunction) {
//     const id = req.params.id;
//     const chat = await chatRepository.getById(id);
//     if (chat) {
//         res.status(200).json(chat);
//     } else {
//         res.status(404).json({ message: `chat id(${id}) not found` });
//     }
// }
// export async function createChat(req: Request, res: Response, next: NextFunction) {
//     const { text } = req.body;
//     const chat = await chatRepository.create(text, req.userId);
//     res.status(201).json(chat);
//     getSocketIO().emit('chats', chat);
// }
// export async function updateChat(req: Request, res: Response, next: NextFunction) {
//     const id = req.params.id;
//     const text = req.body.text;
//     const chat = await chatRepository.getById(id);
//     if (!chat) {
//         return res.status(404).json({ message: `chat not found: ${id}` });
//     }
//     if (chat.userId !== req.userId) {
//         return res.sendStatus(403);
//     }
//     const updated = await chatRepository.update(id, text);
//     res.status(200).json(updated);
// }
// export async function deleteChat(req: Request, res: Response, next: NextFunction) {
//     const id = req.params.id;
//     const chat = await chatRepository.getById(id);
//     if (!chat) {
//         return res.status(404).json({ message: `chat not found: ${id}` });
//     }
//     if (chat.userId !== req.userId) {
//         return res.sendStatus(403);
//     }
//     await chatRepository.remove(id);
//     res.sendStatus(204);
// }
//# sourceMappingURL=chat.js.map