const router = require('express').Router();
const productService = require('../services/productService');
const productValidation = require('../middlewares/productValidation');

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

router.post('/', productValidation, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const nameTest = await productService.getByName(name);
  
    if (nameTest.length > 0) {
      return res.status(409).json({ message: 'Product already exists' });
    }
  
    const result = await productService.create(name, quantity);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const products = await productService.getById(id);

    if (!products) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const result = await productService.update(id, name, quantity);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

module.exports = router;