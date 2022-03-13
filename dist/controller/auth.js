"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signup = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require("express-async-errors");
const userRepository = __importStar(require("../data/auth"));
const config_1 = require("../config");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { wallet } = req.body;
        const user = yield userRepository.findByWallet(wallet);
        console.log(user, 'user');
        if (!user) {
            yield signup(req, res);
            return;
            // isValidPassword = await bcrypt.compare(wallet, newUser);
        }
        // isValidPassword = await bcrypt.compare(wallet, user.wallet);
        const isValidPassword = true;
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid user' });
        }
        const token = createJwtToken(1);
        res.status(200).json({ token, wallet });
    });
}
exports.login = login;
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { wallet } = req.body;
        // const found = await userRepository.findByWallet(wallet);
        // if (found) {
        //     return res.status(409).json({ message: `${wallet} already exists` });
        // }
        const hashed = yield bcrypt_1.default.hash(wallet, config_1.config.bcrypt.saltRounds);
        const userId = yield userRepository.createUser({
            wallet
        });
        const token = createJwtToken(userId);
        res.status(201).json({ token, wallet });
    });
}
exports.signup = signup;
function createJwtToken(id) {
    return jsonwebtoken_1.default.sign({ id }, config_1.config.jwt.secretKey, { expiresIn: config_1.config.jwt.expiresInSec });
}
//# sourceMappingURL=auth.js.map