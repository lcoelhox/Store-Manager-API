const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const productsController = require("../../../src/controllers/products.controller");
const productsService = require("../../../src/services/products.service");

const { expect } = chai;
chai.use(sinonChai);

const mockProduct = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const mockProductsReturnAll = { type: null, message: mockProduct }
const mockProductsReturnId = { type: null, message: mockProduct[0] }

const productNew = { name: 'ProdutoX', id: 4 }
const productUpdate = { name: "Martelo do Batman", id: 1 };

const mockInsert = { type: null, message: productNew };
const mockUpdate = { type: null, message: productUpdate };

describe("test unit products controller", () => {

  describe("Teste de unidade do products.controller", () => {
    it("testando chamada de todos os produtos", async () => {
      // a
      const req = { body: {} };
      const res = {};

      // a
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "findAllProductsService")
        .resolves(mockProductsReturnAll);
      await productsController.getAllProductsController(req, res);
      
      // a
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockProductsReturnAll.message);
    });

    it("testando chamada de um produto por id", async () => {
      // a
      const req = { params: {id: 1} };
      const res = {}

      // a
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "findProductsById")
        .resolves(mockProductsReturnId);
      await productsController.getProductsById(req, res);

      // a
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(
        mockProductsReturnId.message
      );
    });

   it("testando a inserção de um produto", async () => {
     // a
    const req = { body: { name: 'ProdutoX' } };
    const res = {};
     
    // a
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, "newProductId").resolves(mockInsert);
    await productsController.insertNewProductController(req, res);

    // a
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mockInsert.message);
   });
    
   it("testando a atualização de um produto", async () => {
      // a
    const req = { body: { name: "Martelo do Batman" }, params: { id: "1" } };
    const res = {}
      // a
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, "updateProductId").resolves(mockUpdate);
    await productsController.newUpdateProductId(req, res);

     // a
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockUpdate.message);
    });
  });

    afterEach(function () {
      sinon.restore();
    });
});
