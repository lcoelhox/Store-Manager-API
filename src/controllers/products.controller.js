const productsService = require('../services/products.service');

const getAllProductsController = async (_req, res) => {
  const { message } = await productsService.findAllProductsService();
  res.status(200).json(message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { message, type } = await productsService.findProductsById(id);
  if (type) {
    return res.status(404).json({ message });
  } 
  res.status(200).json(message);
};

const insertNewProductController = async (req, res) => {
  const { name } = req.body;
  const { message, type } = await productsService.newProductId(name);
  if (!type) {
    return res.status(201).json(message);
  }
};

const newUpdateProductId = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { message, type } = await productsService.updateProductId(Number(id), name);
  // console.log(message);
  // console.log(type);

  if (!type) {
    return res.status(200).json(message);
  }
  return res.status(404).json({ message });
};

const deleteNewProductId = async (req, res) => {
  const { id } = req.params;
  const { message, type } = await productsService.deleteProductId(Number(id));

  if (!type) {
    return res.status(204).json(message);
  }
  return res.status(404).json({ message });
};

module.exports = {
  getAllProductsController,
  getProductsById,
  insertNewProductController,
  newUpdateProductId,
  deleteNewProductId,
};