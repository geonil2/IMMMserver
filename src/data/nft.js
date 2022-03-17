import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Nft = sequelize.define('nft', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    heartCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});
Nft.belongsTo(User);

const INCLUDE_USER = {
    attributes: [
        'id', 
        'title', 
        'image', 
        'description',
        'location',
        'heartCount',
        [Sequelize.col('user.id'), 'id'],
        [Sequelize.col('user.wallet'), 'wallet'],
        [Sequelize.col('user.username'), 'username'],
        [Sequelize.col('user.image'), 'image'],
    ],
    include: {
        model: User,
        attributes: [],
    },
};

const ORDER_DESC = {
    order: [['createdAt', 'DESC']],
};


export async function getAll() {
    return Nft.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

export async function getAllByUsername(username) {
    return Nft.findAll({ 
        ...INCLUDE_USER, 
        ...ORDER_DESC, 
        include: {
            ...INCLUDE_USER.include, 
            where: { username },
        }
    });
}

export async function getById(id) {
    return Nft.findOne({
        where: {id},
        ...INCLUDE_USER,

    })
}

export async function create(text, userId) {
    return Nft.create({text, userId})
    .then(data => this.getById(data.dataValues.id));
}

export async function update(id, text) {
    return Nft.findByPk(id, INCLUDE_USER)
    .then((nft) => {
        nft.text = text;
        return nft.save();
    });
}

export async function remove(id) {
    return Nft.findByPk(id)
    .then((nft) => {
        nft.destroy();
    });
}