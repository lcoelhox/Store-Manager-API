const validationQuanty = (req, res, next) => {
  const productBody = req.body;
  const arrayResult = [];

  productBody.forEach((product) => {
    if (!Number.isInteger(product.quantity)) {
      arrayResult.push({ message: '"quantity" is required' });
    }
  });

  if (arrayResult.length > 0) {
    return res.status(400).json({ message: arrayResult[0].message });
  }
  return next();
};

module.exports = validationQuanty;