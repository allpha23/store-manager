const { expect } = require('chai');
const sinon = require('sinon');
const ProductsServices = require('../../../services/productService');
const ProductModel = require('../../../models/productModel');

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

describe("quando product criado com sucesso", () => {
  before(() => {
    sinon.stub(ProductModel, 'create').resolves(fakeProduct[0])
  })
  after(() => {
    ProductModel.create.restore();
  })

  it("deve retornar um produto", async () => {
    const [{ name, quantity }] = fakeProduct;
    const result = await ProductsServices.create(name, quantity);

    expect(result.name).to.be.equals('Martelo de Thor')
    expect(result.quantity).to.be.equals(10)
  });
});

describe("quando busca por produto", () => {
    before(() => {
      sinon.stub(ProductModel, 'getAll').resolves(fakeProduct)
    })
    after(() => {
      ProductModel.getAll.restore();
    })
  
    it("deve retornar um product", async () => {
      const result = await ProductsServices.getAll();
  
      expect(result.length).to.be.equals(3)
    });
  });