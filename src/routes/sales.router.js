const express = require('express');
const salesControllers = require('../controllers/sales.controller');
const salesValidationId = require('../middlewares/salesProductValidate');
const salesIdValidate = require('../middlewares/salesIdValidate');
const salesValidateNumber = require('../middlewares/salesValidateNumber');
const salesValidateQuanty = require('../middlewares/salesValidationQuanty');

const router = express.Router();

router.post('/',
  salesIdValidate,
  salesValidateQuanty,
  salesValidateNumber,
  salesValidationId,
  salesControllers.salesProductCreate);

router.get('/', salesControllers.findSalesProductsAll);

router.get('/:id', salesControllers.findSalesProductsById);

router.delete('/:id', salesControllers.deleteNewSalesId);

module.exports = router;