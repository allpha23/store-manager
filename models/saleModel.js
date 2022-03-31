const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id AS saleId, product_id As productId, quantity, date 
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS s
    WHERE sp.sale_id = s.id
    ORDER BY sp.sale_id, sp.product_id;`,
  );
  return result;
};
  
const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT sale_id AS saleId, product_id As productId, quantity, date 
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS s
    WHERE sp.sale_id = s.id
    AND s.id = (?)
    ORDER BY sp.sale_id, sp.product_id;`, [id],
  );
  
  const newResult = result.map((e) => ({
    productId: e.productId,
    quantity: e.quantity,
    date: e.date,
  }));

  return newResult;
};

const buy = async (buys) => {
  const [result] = await connection.execute(`INSERT INTO StoreManager.sales (date)
  VALUES (NOW());`);

  return {
    id: result.insertId,
    itemsSold: [...buys],
  };
};

const buyProduct = async (id, productId, quantity) => {
  await connection.execute(`INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?);`, [id, productId, quantity]);
};
  
module.exports = { getAll, getById, buy, buyProduct };