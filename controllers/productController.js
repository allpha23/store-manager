const router = require('express').Router();
const productService = require('../services/productService');

router.get('/', async (req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json(products);  
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productService.getById(id);

    if (!products) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

module.exports = router;