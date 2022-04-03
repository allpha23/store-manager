const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./Routes/ProductRoutes');
const saleRoutes = require('./Routes/saleRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
