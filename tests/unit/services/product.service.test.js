const { expect } = require("chai");
const sinon = require("sinon");
const productsService = require("../../../src/services/products.service");
const productsModel = require("../../../src/models/products.model");


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

describe("test unit products service", () => {

  describe("Teste de unidade do products.service", () => {
    it("testando chamada de todos os produtos", async () => {
      // a
      sinon.stub(productsModel, 'findAll').resolves(mockProduct);

      // a
      const response = await productsService.findAllProductsService();

      // a
      expect(response.message).to.deep.equal(mockProduct);
      expect(response.type).to.equal(null);
    });

    it("testando chamada de um produto por id", async () => {
       // a
       sinon.stub(productsModel, "findById").resolves(mockProduct[0]);

       // a
      const response = await productsService.findProductsById(1);
      // a
      expect(response.message).to.deep.equal(mockProduct[0]);
      expect(response.type).to.equal(null);
    });
  });

    afterEach(function () {
      sinon.restore();
    });
});