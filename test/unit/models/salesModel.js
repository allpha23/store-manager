const { expect } = require('chai');
const sinon = require('sinon');
const SalesModel = require('../../../models/saleModel');
const connection = require('../../../models/connection');

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

describe("quando uma venda é inserida na tabela StoreManager.sales_products", () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }])
  })
  after(() => {
    connection.execute.restore();
  })

  it("deve retornar uma venda", async () => {
    const result = await SalesModel.buy(fakeSales);

    expect(result.id).to.be.equals(1)
    expect(result.itemsSold.length).to.be.equals(3)
  });
});