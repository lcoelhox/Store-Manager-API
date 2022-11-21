const salesService = require('../services/sales.service');
const salesModel = require('../models/sales.model');

const salesProductCreate = async (req, res) => {
  const allSales = await salesService.getAllSales();
  const contAllSales = allSales.message.length;
  const saleId = await salesModel.insertSales(contAllSales + 1);
  const { type } = await salesService.newProductSales(req.body, saleId);
  if (!type) {
    return res.status(201).json({ id: saleId, itemsSold: req.body });
  }
};

const findSalesProductsAll = async (_req, res) => {
  const { type, message } = await salesService.findAllSalesProducts();
  if (!type) {
    return res.status(200).json(message);
  } 
};

const findSalesProductsById = async (req, res) => {
  const { id } = req.params;
  const { message } = await salesService.findSalesProductsById(Number(id));
  if (message.length < 1) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  if (message.length > 0) {
    return res.status(200).json(message);
  }
};

const deleteNewSalesId = async (req, res) => {
  const { id } = req.params;
  const { message, type } = await salesService.deleteSalesId(Number(id));
  if (!type) {
    return res.status(204).json(message);
  }
  return res.status(404).json({ message });
};

module.exports = {
  salesProductCreate,
  findSalesProductsAll,
  findSalesProductsById,
  deleteNewSalesId,
};
