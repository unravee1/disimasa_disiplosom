import Router from 'express'
const router = new Router()
import brandController from '../controllers/brandController.js'


router.post('/', brandController.create)
router.get('/', brandController.getAll)
router.delete('/',brandController.delete)
router.put('/:id',brandController.updateBrand)

export default router
