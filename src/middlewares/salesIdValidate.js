const salesIdValidate = (req, res, next) => {
  const productId = req.body;
  const arrayResul = [];

  productId.forEach((id) => {
    if (!Number.isInteger(id.productId)) {
      arrayResul.push({ message: '"productId" is required' });
    }
  });

  if (arrayResul.length > 0) {
    return res.status(400).json({ message: arrayResul[0].message });
  }

  return next();
};

module.exports = salesIdValidate;