const { expect } = require('chai');
const sinon = require('sinon');
const SalesServices = require('../../../services/saleService');
const SalesController = require('../../../controllers/saleController');

const fakeSales = [
  {
    productId: 1,
    quantity: 5,
  },
  {
    productId: 2,
    quantity: 10,
  },
  {
    productId: 3,
    quantity: 15,
  }
]

const response = {}
const request = {}

before(() => {
  request.body = fakeSales
  request.params = { id: 1 }
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub().returns();
})

describe("valida requisição ao criar uma venda", () => {
  before(() => {
    sinon.stub(SalesServices, 'buy').resolves({id: 1, itemsSold: fakeSales})
  })
  after(() => {
    SalesServices.buy.restore();
  })

  it("executou status e json esperados", async () => {
    await SalesController.post(request, response)

    expect(response.status.calledWith(201)).to.be.equal(true);
    expect(response.json.calledWith({id: 1, itemsSold: fakeSales})).to.be.equal(true);
  });
});

describe("valida requisição ao atualizar uma venda", () => {
  before(() => {
    sinon.stub(SalesServices, 'update').resolves({ saleId: 1, itemUpdated: fakeSales[0]})
  })
  after(() => {
    SalesServices.update.restore();
  })

  it("executou status e json esperados", async () => {
    await SalesController.put(request, response)

    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.json.calledWith({ saleId: 1, itemUpdated: fakeSales[0]})).to.be.equal(true);
  });
});