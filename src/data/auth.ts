import SQ from 'sequelize';
import { sequelize } from "../db/database";

type user = {
    wallet: string
    password: string
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
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    wallet: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(45),
    },
    description: DataTypes.TEXT,
    image: DataTypes.TEXT,
    url: DataTypes.TEXT,
}, { timestamps: false });

export async function findByWallet(wallet: string) {
    return User.findOne({where: { wallet }})
}

export async function findById(id: any) {
    //@ts-ignore 
    return User.findByPk(id).then((data) => data?.dataValues);
}

export async function createUser(user: user) {
    //@ts-ignore 
    return User.create(user).then((data) => data.dataValues); 
}

export async function update (
    id: number,
    username: string, 
    description: string, 
    image: string, 
    url: string
) {
    return User.findByPk(id).then((data) => {
        //@ts-ignore 
        data.username = username,
        //@ts-ignore 
        data.description = description,
        //@ts-ignore 
        data.image = image,
        //@ts-ignore 
        data.url = url
        //@ts-ignore 
        return data.save();
    });

}