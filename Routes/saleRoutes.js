const router = require('express').Router();
const saleController = require('../controllers/saleController');
const saleValidation = require('../middlewares/saleValidation');

router.get('/', saleController.get);
router.get('/:id', saleController.getById);
router.post('/', saleValidation, saleController.post);
router.put('/:id', saleValidation, saleController.put);

module.exports = router;