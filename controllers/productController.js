const productService = require('../services/productService');

const get = async (_req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json(products);  
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const post = async (req, res) => {
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
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const product = await productService.getById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const result = await productService.update(id, name, quantity);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await productService.deleteById(id);

    return res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

module.exports = { get, getById, post, put, deleteById };