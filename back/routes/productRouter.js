import { Router } from 'express';
import productController from '../controllers/productController.js';
import checkRole from '../middleware/checkRoleMiddleware.js';

const router = Router();

router.post('/', checkRole('ADMIN'), productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.delete('/:id', checkRole('ADMIN'), productController.delete);

export default router;
