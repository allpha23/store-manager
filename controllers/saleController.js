const router = require('express').Router();
const saleService = require('../services/saleService');
const saleValidation = require('../middlewares/saleValidation');

router.get('/', async (_req, res) => {
  try {
    const sale = await saleService.getAll();
    return res.status(200).json(sale);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await saleService.getById(id);

    if (sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    return res.status(200).json(sale); 
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

router.post('/', saleValidation, async (req, res) => {
  try {
    const buys = req.body;
    
    const result = await saleService.buy(buys);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

router.put('/:id', saleValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const [{ productId, quantity }] = req.body;

    const result = await saleService.update(id, productId, quantity);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

module.exports = router;