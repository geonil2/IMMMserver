import SQ from 'sequelize';
import { sequelize } from "../db/database";

type user = {
    wallet: string
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
    return User.findByPk(id);
}

export async function createUser(user: user) {
    // return User.create(user).then((data) => data.dataValues.id); 
    return User.create(user).then((data) => 1); 
}
