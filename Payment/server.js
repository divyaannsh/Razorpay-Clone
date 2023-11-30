// server.js

const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');

const app = express();
const port = 3000;

const razorpay = new Razorpay({
  key_id: 'your_key_id',
  key_secret: 'your_key_secret',
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount,
    currency: currency,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
