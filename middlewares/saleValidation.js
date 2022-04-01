const validProductId = (req, res, next) => {
  const buys = req.body;

  const isProductId = buys.every((product) => product.productId !== undefined);

  if (!isProductId) {
    return res.status(400).json({
      message: '"productId" is required',
    });
  }

  next();
};

const validQuantity = (req, res, next) => {
  const buys = req.body;

  const isQuantity = buys.every((product) => product.quantity !== undefined);
  const isBigEnough = buys.every((product) => Number(product.quantity) > 0);

  if (!isQuantity) {
    return res.status(400).json({
      message: '"quantity" is required',
    });
  }
  
  if (!isBigEnough) {
    return res.status(422).json({
      message: '"quantity" must be greater than or equal to 1',
    });
  }

  next();
};
  
module.exports = [validProductId, validQuantity];