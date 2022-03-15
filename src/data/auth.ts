import SQ from 'sequelize';
import { sequelize } from "../db/database";

type user = {
    wallet: string
    username: string
    image: string
    description: string
    url: string
}

const DataTypes = SQ.DataTypes;

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    wallet: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(45),
    },
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
    url: DataTypes.TEXT,
}, { timestamps: false });

export async function findByWallet(wallet: string) {
    return User.findOne({where: { wallet }})
}

export async function findById(id: any) {
    //@ts-ignore
    return User.findByPk(id).then((data) => data.dataValues);
}

export async function createUser(user: user) {
    //@ts-ignore 
    return User.create(user).then((data) => data.dataValues); 
}
