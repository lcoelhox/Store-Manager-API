const productsModel = require('../models/products.model');

const findAllProductsService = async () => {
  const result = await productsModel.findAll();
  return { type: null, message: result };
};

const findProductsById = async (id) => {
  const result = await productsModel.findById(id);
  if (result) {
    return { type: null, message: result };
  }
  return { type: 404, message: 'Product not found' };
};

const newProductId = async (product) => {
  await productsModel.insertProduct(product);
  // const newProduct = await productsModel.findById(productId);
  const allProducts = await findAllProductsService();
  const newProduct = await findProductsById(allProducts.message.length);
  // console.log(newProduct);
  return newProduct;
};

const updateProductId = async (id, name) => {
  const result = await productsModel.findById(id);
  // console.log(result);

  if (!result) {
    return { type: 404, message: 'Product not found' };
  }

  if (result) {
    await productsModel.upateProduct(id, name);
    const product = await productsModel.findById(id);
    return { type: null, message: product };
  }
};

const deleteProductId = async (id) => {
  const result = await productsModel.findById(id);

  if (!result) {
    return { type: 404, message: 'Product not found' };
  }

  if (result) {
    await productsModel.deleteProduct(id);
    const product = await productsModel.findById(id);
    // console.log(product);
    return { type: null, message: product };
  }
};

module.exports = {
  findAllProductsService,
  findProductsById,
  newProductId,
  updateProductId,
  deleteProductId,
};
