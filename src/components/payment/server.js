// server.js or app.js
const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const secretKey = 'your-secret-key-here';

app.post('/verify-payment', async (req, res) => {
  const { reference } = req.body;

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    if (response.data.status === 'success') {
      // Handle successful verification
      res.status(200).json(response.data);
    } else {
      // Handle verification failure
      res.status(400).json(response.data);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while verifying the payment' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
