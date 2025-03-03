require('dotenv').config(); 4

const https = require('https');
const fs = require('fs');
const httpProxy = require('http-proxy');


const proxy = httpProxy.createProxyServer({});
proxy.on('proxyRes', (proxyRes, req, res) => {
  let data = '';

  proxyRes
    .on('data', (chunk) => {
      data += chunk;
    })
    .on('end', () => {
      console.log("proxyRes.on('end'). data:", data);
    })
    .on('error', (err) => {
      console.error("proxyRes.on('err'). error:", err);
    });
});

const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY),
  cert: fs.readFileSync(process.env.SSL_CERT)
};

https
  .createServer(sslOptions, (req, res) => {
    const log = `${req.method}: ${req.url}`;
    console.log(log);
    proxy.web(req, res, {
      target: `${process.env.REMOTE_SERVER_URL}:${process.env.REMOTE_SERVER_PORT}`,
      changeOrigin: true,
    });
  })
  .listen(process.env.LOCAL_PORT, () => {
    console.log(`HTTPS server running on https://${process.env.LOCAL_URL}:${process.env.LOCAL_PORT}`);
  });
