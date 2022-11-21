const express = require('express');
const productsController = require('../controllers/products.controller');
const validateProduct = require('../middlewares/validateProduct');

const router = express.Router();

router.get('/', productsController.getAllProductsController);

router.get('/:id', productsController.getProductsById);

router.post('/', validateProduct, productsController.insertNewProductController);

router.put('/:id', validateProduct, productsController.newUpdateProductId);

router.delete('/:id', productsController.deleteNewProductId);

module.exports = router;