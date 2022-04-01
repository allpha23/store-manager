const saleModel = require('../models/saleModel');

const getAll = async () => {
  const result = await saleModel.getAll();
  return result; 
};

const getById = async (id) => {
  const result = await saleModel.getById(id);
  return result;
};

const buy = async (buys) => {
  const result = await saleModel.buy(buys);

  buys.forEach(async (product) => {
    await saleModel.buyProduct(result.id, product.productId, product.quantity);
  });
  return result;
};

const update = async (id, productId, quantity) => {
  const result = await saleModel.update(id, productId, quantity);
  return result;
};

module.exports = { getAll, getById, buy, update };