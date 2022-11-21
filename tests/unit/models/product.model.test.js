const connection = require('../../../src/models/connection');
const sinon = require("sinon");
const productsModel = require('../../../src/models/products.model');
const { expect } = require('chai');

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

const mockInsertProduct = [
  {
    insertId: 4,
  },
];

describe('test unit products model', () => {

  describe('testando comunicação com banco de dados', () => {
    it('testando chamada de todos os produtos', async () => {
      // a
      sinon.stub(connection, 'execute').resolves([mockProduct]);

      // a
      const result = await productsModel.findAll();

      // a
      expect(result).to.be.deep.equal(mockProduct);
    });

    it('testando a chamada de um produto por id', async () => {
      // a
      sinon.stub(connection, 'execute').resolves([[mockProduct[0]]]);

      // a
      const result = await productsModel.findById(1);

      // a
      expect(result).to.be.deep.equal(mockProduct[0])
    });

    it("testando a inserção de um produto", async () => {
      // a
      sinon.stub(connection, "execute").resolves(mockInsertProduct);

      // a
      const result = await productsModel.insertProduct({ name: 'ProdutoX' });

      // a
      expect(result).to.equal(4);
    });
  });

    afterEach(function () {
      sinon.restore();
    });
});