"use strict";
// import SQ from 'sequelize';
// import { sequelize } from '../db/database.js';
// import { User } from './auth.js'; // Nft import
// const DataTypes = SQ.DataTypes;
// const Sequelize = SQ.Sequelize;
// const Chat = sequelize.define('chat', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     text: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
// });
// Chat.belongsTo(User); //Chat.belongsTo(Nft);
// const INCLUDE_USER = {
//     attributes: [
//         'id', 
//         'text', 
//         'createdAt', 
//         'userId', 
//         [Sequelize.col('user.name'), 'name'],
//         [Sequelize.col('user.username'), 'username'],
//         [Sequelize.col('user.url'), 'url'],
//     ],
//     include: {
//         model: User,
//         attributes: [],
//     },
// };
// const ORDER_DESC = {
//     order: [['createdAt', 'DESC']],
// };
// export async function getAll() {
//     return Chat.findAll({ ...INCLUDE_USER, ...ORDER_DESC});
// }
// export async function getAllByUsername(username) {
//     return Chat.findAll({ 
//         ...INCLUDE_USER, 
//         ...ORDER_DESC, 
//         include: {
//             ...INCLUDE_USER.include, 
//             where: { username },
//         }
//     });
// }
// export async function getById(id) {
//     return Chat.findOne({
//         where: {id},
//         ...INCLUDE_USER,
//     })
// }
// export async function create(text, userId) {
//     return Chat.create({text, userId})
//     .then(data => this.getById(data.dataValues.id));
// }
// export async function update(id, text) {
//     return Chat.findByPk(id, INCLUDE_USER)
//     .then((chat) => {
//         chat.text = text;
//         return chat.save();
//     });
// }
// export async function remove(id) {
//     return Chat.findByPk(id)
//     .then((chat) => {
//         chat.destroy();
//     });
// }
//# sourceMappingURL=chat.js.map