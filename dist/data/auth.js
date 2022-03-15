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
exports.createUser = exports.findById = exports.findByWallet = exports.User = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../db/database");
const DataTypes = sequelize_1.default.DataTypes;
exports.User = database_1.sequelize.define('user', {
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
function findByWallet(wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        return exports.User.findOne({ where: { wallet } });
    });
}
exports.findByWallet = findByWallet;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        return exports.User.findByPk(id).then((data) => data.dataValues);
    });
}
exports.findById = findById;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore 
        return exports.User.create(user).then((data) => data.dataValues);
    });
}
exports.createUser = createUser;
//# sourceMappingURL=auth.js.map