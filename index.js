const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 6000;

app.use(cors());

app.get('/fetch-medium-posts', async (req, res) => {
  const rssUrl = 'https://medium.com/feed/@solarmails2';
  try {
    const response = await axios.get(rssUrl);
    res.set('Content-Type', 'application/rss+xml');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Medium posts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
