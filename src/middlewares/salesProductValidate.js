const productModel = require('../models/products.model');

const validateId = async (req, res, next) => {
  const message = [];
  await Promise.all(req.body.map(async (id) => {
    const resultValidate = await productModel.findById(id.productId);
    if (!resultValidate) message.push({ message: 'Product not found' });
  }));

  if (message.length > 0) {
    return res.status(404).json({ message: message[0].message });
  }

  return next();
};

module.exports = validateId;