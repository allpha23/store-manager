const { expect } = require('chai');
const sinon = require('sinon');
const ProductsServices = require('../../../services/productService');
const ProductController = require('../../../controllers/productController');

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

const response = {}
const request = {}

before(() => {
  request.body = {
    id: 1,
    name: 'Martelo de Thor',
    quantity: 10
  }
  request.params = { id: 1 }
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub().returns();
})

describe("valida requisição ao criar produto", () => {
  before(() => {
    sinon.stub(ProductsServices, 'getByName').resolves([])
    sinon.stub(ProductsServices, 'create').resolves(fakeProduct[0])
  })
  after(() => {
    ProductsServices.getByName.restore();
    ProductsServices.create.restore();
  })

  it("executou status e json esperados", async () => {
    const [product] = fakeProduct;

    await ProductController.post(request, response)

    expect(response.status.calledWith(201)).to.be.equal(true);
    expect(response.json.calledWith(product)).to.be.equal(true);
  });
});

describe("valida requisição ao atualizar produto", () => {
  before(() => {
    sinon.stub(ProductsServices, 'getById').resolves(1)
    sinon.stub(ProductsServices, 'update').resolves(fakeProduct[0])
  })
  after(() => {
    ProductsServices.getById.restore();
    ProductsServices.update.restore();
  })

  it("executou status e json esperados", async () => {
    const [product] = fakeProduct;

    await ProductController.put(request, response)

    expect(response.status.calledWith(201)).to.be.equal(true);
    expect(response.json.calledWith(product)).to.be.equal(true);
  });
});