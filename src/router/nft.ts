import express from "express";
import 'express-async-errors';
import { body } from "express-validator";
import * as nftController from '../controller/nft';
import { isAuth } from "../middleware/auth";
import { validate } from "../middleware/validator";

const router = express.Router();

const validateNft = [
    body('image')
        .isURL()
        .withMessage('invalid URL')
        .optional({ nullable: true, checkFalsy: true }),
    validate
]

router.get('/', isAuth, nftController.getNfts);
router.get('/:id', isAuth, nftController.getNft);
router.post('/', isAuth, validateNft, nftController.createNft); 
router.put('/:id', isAuth, validateNft, nftController.updateNft);

export default router;