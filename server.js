const express = require('express');
const request = require('request');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const UPSTREAM_URL = 'https://op-group1-swiftservehd-1.dens.tv';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/stream/*', (req, res) => {
  const targetUrl = `${UPSTREAM_URL}/${req.params[0]}`;

  req.pipe(request({
    url: targetUrl,
    headers: {
      'User-Agent': 'Mozilla/5.0 (SmartTV; Tizen 6.0)',
      'Referer': 'https://dens.tv'
    }
  })).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Proxy jalan di port ${PORT}`);
});
