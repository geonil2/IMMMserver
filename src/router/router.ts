import express from 'express';
import 'express-async-errors';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ message : 'test!!!!' });
})

export default router;