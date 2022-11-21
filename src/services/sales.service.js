const salesModel = require('../models/sales.model');
// const validateDeleteSales = require('../middlewares/validateDeleteSales');

const newProductSales = async (body, saleId) => {
  const salesProduct = await Promise.all(salesModel.ProductsSales(body, saleId));
  if (salesProduct) {
    return { type: null, message: salesProduct };
  }  
};

const getAllSales = async () => {
  const All = await salesModel.findAll();
  return { type: null, message: All };
};

const findAllSalesProducts = async () => {
  const All = await salesModel.findAllSalesProducts();
  return { type: null, message: All };
};

const findSalesProductsById = async (id) => {
  const result = await salesModel.findByIdSalesProducts(id);
  if (!result) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: null, message: result };
};

const deleteSalesId = async (id) => {
  const result = await salesModel.findByIdSalesProducts(id);

  // validateDeleteSales(id);

  if (!result) {
    return { type: 404, message: 'Sale not found' };
  }
  
  if (result) {
    await salesModel.deleteSales(id);
    const sales = await salesModel.findByIdSalesProducts(id);
    return { type: null, message: sales };
  }
};

module.exports = {
  newProductSales,
  getAllSales,
  findSalesProductsById,
  findAllSalesProducts,
  deleteSalesId,
};