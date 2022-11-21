const salesModel = require('../models/sales.model');

const ValidateDeleteSales = async (id) => {
  const findId = salesModel.findAllSalesProducts(id);
  const positiveFind = findId.find((idSales) => idSales === Number(id));
  if (!positiveFind) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: 204, message: '' };
};

module.exports = ValidateDeleteSales;