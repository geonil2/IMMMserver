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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const express_validator_1 = require("express-validator");
const validator_js_1 = require("../middleware/validator.js");
const authController = __importStar(require("../controller/auth.js"));
const auth_js_1 = require("../middleware/auth.js");
const router = express_1.default.Router();
const validateCredential = [
    (0, express_validator_1.body)('wallet')
        .trim()
        .notEmpty()
        .withMessage('wallet is not connect'),
    validator_js_1.validate,
];
const validateSignIn = [
    ...validateCredential,
    (0, express_validator_1.body)('id')
        .trim()
        .notEmpty()
        .withMessage('id is not found'),
    validator_js_1.validate,
];
const validateUpdate = [
    ...validateSignIn,
    (0, express_validator_1.body)('username').trim().notEmpty().withMessage('name is missing'),
    (0, express_validator_1.body)(['url', 'image'])
        .isURL()
        .withMessage('invalid URL')
        .optional({ nullable: true, checkFalsy: true }),
    validator_js_1.validate,
];
router.post('/signup', validateCredential, authController.signUp);
router.post('/login', validateSignIn, authController.signIn);
router.put('/update', auth_js_1.isAuth, validateUpdate, authController.update);
exports.default = router;
//# sourceMappingURL=auth.js.map