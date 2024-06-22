import { Router } from 'express';
import productRouter from './productRouter.js'
import userRouter from './userRouter.js';
import brandRouter from './brandRouter.js';
import typeRouter from './typeRouter.js';


const router = Router();

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/brand', brandRouter);
router.use('/type', typeRouter);

export default router;
