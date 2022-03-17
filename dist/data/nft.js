"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAllByUsername = exports.getAll = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_js_1 = require("../db/database.js");
const auth_js_1 = require("./auth.js");
const DataTypes = sequelize_1.default.DataTypes;
const Sequelize = sequelize_1.default.Sequelize;
const Nft = database_js_1.sequelize.define('nft', {
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
Nft.belongsTo(auth_js_1.User);
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
        model: auth_js_1.User,
        attributes: [],
    },
};
const ORDER_DESC = {
    order: [['createdAt', 'DESC']],
};
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        return Nft.findAll(Object.assign(Object.assign({}, INCLUDE_USER), ORDER_DESC));
    });
}
exports.getAll = getAll;
function getAllByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return Nft.findAll(Object.assign(Object.assign(Object.assign({}, INCLUDE_USER), ORDER_DESC), { include: Object.assign(Object.assign({}, INCLUDE_USER.include), { where: { username } }) }));
    });
}
exports.getAllByUsername = getAllByUsername;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return Nft.findOne(Object.assign({ where: { id } }, INCLUDE_USER));
    });
}
exports.getById = getById;
function create(text, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return Nft.create({ text, userId })
            .then(data => this.getById(data.dataValues.id));
    });
}
exports.create = create;
function update(id, text) {
    return __awaiter(this, void 0, void 0, function* () {
        return Nft.findByPk(id, INCLUDE_USER)
            .then((nft) => {
            nft.text = text;
            return nft.save();
        });
    });
}
exports.update = update;
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return Nft.findByPk(id)
            .then((nft) => {
            nft.destroy();
        });
    });
}
exports.remove = remove;
//# sourceMappingURL=nft.js.map