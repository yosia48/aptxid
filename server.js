const express = require('express');
const request = require('request');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const UPSTREAM_URL = 'https://op-group1-swiftservehd-1.dens.tv';

// Serve semua file public (index.html, japan.html, css, dll)
app.use(express.static(path.join(__dirname, 'public')));

// Proxy streaming Indo
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

// Route tambahan buat halaman /japan
app.get('/japan', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/japan.html'));
});

app.listen(PORT, () => {
  console.log(`Proxy jalan di port ${PORT}`);
});

