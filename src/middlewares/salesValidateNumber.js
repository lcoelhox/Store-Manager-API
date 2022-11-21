const validateNumber = (req, res, next) => {
  const procutBody = req.body;
  const arrayResult = [];

  procutBody.forEach((product) => {
    if (product.quantity < 1) {
      arrayResult.push({
        message: '"quantity" must be greater than or equal to 1',
      });
    }
  });

  if (arrayResult.length > 0) {
    return res.status(422).json({ message: arrayResult[0].message });
  }

  return next();
};

module.exports = validateNumber;