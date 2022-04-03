const router = require('express').Router();
const productController = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation');

router.get('/', productController.get);
router.get('/:id', productController.getById);
router.post('/', productValidation, productController.post);
router.put('/:id', productValidation, productController.put);
router.delete('/:id', productController.deleteById);

module.exports = router;