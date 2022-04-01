const productModel = require('../models/productModel');

const getAll = async () => {
  const result = await productModel.getAll();
  return result; 
};

const getById = async (id) => {
  const result = await productModel.getById(id);
  return result;
};

const create = async (name, quantity) => {
  const result = await productModel.create(name, quantity);
  return result;
};
  
const getByName = async (name) => {
  const result = await productModel.getByName(name);
  return result;
};

const update = async (id, name, quantity) => {
  const result = await productModel.update(id, name, quantity);
  return result;
};

module.exports = { getAll, getById, create, getByName, update };