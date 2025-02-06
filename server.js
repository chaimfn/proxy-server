require('dotenv').config(); // טוען את משתני הסביבה מתוך קובץ .env

const https = require('https');
const fs = require('fs');
const httpProxy = require('http-proxy');


// יצירת אובייקט פרוקסי
const proxy = httpProxy.createProxyServer({});

// קריאה למשתני הסביבה מתוך קובץ ה- .env
const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY),       // נתיב המפתח הפרטי
  cert: fs.readFileSync(process.env.SSL_CERT),     // נתיב תעודת ה-SSL
};

// יצירת שרת HTTPS
https
  .createServer(sslOptions, (req, res) => {
    // תיעוד הפניות
    const log = `${req.method}: ${req.url}`
    console.log(log);
    // הפניית הבקשה לשרת HTTP
    proxy.web(req, res, {
      target: `${process.env.OLLAMA_SERVER_URL}:${process.env.OLLAMA_SERVER_PORT}`, // הפניית הבקשות לשרת ה-HTTP על פי משתני הסביבה
      changeOrigin: true,
    });

  })
  .listen(process.env.LOCAL_PORT, () => {
    console.log(`HTTPS server running on https://${process.env.LOCAL_URL}:${process.env.LOCAL_PORT}`);
  });
