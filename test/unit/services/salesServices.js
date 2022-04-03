const { expect } = require('chai');
const sinon = require('sinon');
const SalesServices = require('../../../services/saleService');
const SalesModel = require('../../../models/saleModel');

const fakeSales = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: '2022-04-01T19:55:16.000Z'
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: '2022-04-01T19:55:16.000Z'
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: '2022-04-01T19:55:16.000Z'
  }
]

describe("quando venda criada com sucesso", () => {
  before(() => {
    sinon.stub(SalesModel, 'buy').resolves({id: 1, itemsSold: [...fakeSales]})
    sinon.stub(SalesModel, 'buyProduct').resolves(fakeSales)
  })
  after(() => {
    SalesModel.buy.restore();
    SalesModel.buyProduct.restore();
  })

  it("deve retornar uma venda", async () => {
    const result = await SalesServices.buy(fakeSales);

    expect(result.id).to.be.equals(1)
    expect(result.itemsSold.length).to.be.equals(3)
  });
});