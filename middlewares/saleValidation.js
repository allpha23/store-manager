const validProductId = (req, res, next) => {
  const buys = req.body;
  buys.forEach((sale) => {
    if (sale.productId === undefined) {
      return res.status(400).json({
        message: '"productId" is required',
      });
    }
  });

  next();
};

const validQuantity = (req, res, next) => {
  const buys = req.body;
  buys.forEach((sale) => {
    if (sale.quantity === undefined) {
      return res.status(400).json({
        message: '"quantity" is required',
      });
    }
  
    if (Number(sale.quantity) <= 0) {
      return res.status(422).json({
        message: '"quantity" must be greater than or equal to 1',
      });
    }
  });

  next();
};
  
module.exports = [validProductId, validQuantity];