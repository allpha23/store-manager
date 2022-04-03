const { expect } = require('chai');
const sinon = require('sinon');
const ProductModel = require('../../../models/productModel');
const connection = require('../../../models/connection');

const fakeProduct = [
  {
    id: 1,
    name: 'Martelo de Thor',
    quantity: 10
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
    quantity: 20
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
    quantity: 30
  },
]

describe("inserir um produto na tabela StoreManager.products", () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }])
  })
  after(() => {
    connection.execute.restore();
  })

  it("deve retornar um produto", async () => {
    const [{ name, quantity }] = fakeProduct;
    const result = await ProductModel.create(name, quantity);

    expect(result.name).to.be.equals('Martelo de Thor')
    expect(result.quantity).to.be.equals(10)
  });
});
