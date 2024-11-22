import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Proxy endpoint to fetch articles from NY Times API
app.get('/api/articles', async (req, res) => {
  const { query } = req.query;
  const apiKey = process.env.NYT_API_KEY;
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from NY Times');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
