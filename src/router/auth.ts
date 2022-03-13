import express from 'express';
import 'express-async-errors';
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authController from '../controller/auth.js';

const router = express.Router();

const validateCredential = [
    body('wallet')
        .trim()
        .notEmpty()
        .withMessage('wallet is not connect'),
    validate,
];

const validateSignup = [
    ...validateCredential,
    body('username').notEmpty().withMessage('name is missing'),
    body('url')
        .isURL()
        .withMessage('invalid URL')
        .optional({ nullable: true, checkFalsy: true }),
    validate,
];

// router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateCredential, authController.login);

// router.get('/', (req, res, next) => {
//     res.status(200).json({ message : 'test!!!!' });
// });

export default router;