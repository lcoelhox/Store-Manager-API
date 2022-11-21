const connection = require('./connection');

const insertSales = async (sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (id) VALUE (?)',
    [sales],
  );
  return insertId;
};

const ProductsSales = (sales, saleId) => {
  if (sales && sales.length > 0) {
    return sales.map(async (sal) => connection.execute(
      'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUE (?, ?, ?)',
      [saleId, sal.productId, sal.quantity],
    ));
  }
  return [];
};

const findAll = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM StoreManager.sales',
  );
  const validateDateSales = !sales ? [] : sales;
  return validateDateSales;
};

const findAllSalesProducts = async () => {
  const [sale] = await connection.execute(
    `SELECT id AS saleId, date, product_id AS productId,
    quantity from StoreManager.sales_products AS sala
    INNER JOIN StoreManager.sales AS salb
    ON sala.sale_id = salb.id ORDER BY sale_id, product_id`,
  );
  return sale;
};

const findByIdSalesProducts = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id AS productId, quantity
    FROM StoreManager.sales_products AS sala
    INNER JOIN StoreManager.sales AS salb
    ON sala.sale_id = salb.id
    WHERE id = (?) ORDER BY sale_id, product_id`,
    [id],
  );
  // console.log(sale);
  return sale;
};

const deleteSales = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = (?)',
    [id],
  );
};

module.exports = {
  insertSales,
  ProductsSales,
  findAll,
  findByIdSalesProducts,
  findAllSalesProducts,
  deleteSales,
};