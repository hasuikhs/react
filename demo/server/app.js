const express = require('express');
const cors = require('cors');
const SSE = require('sse');

const PORT = 3030;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
  console.log('hello')
  res.send('Hello');
});

const server = app.listen(PORT, () => {
  console.log(`express server listening on port ${ PORT }`);
});

// cors 에러
// node_modules/sse/lib/sseclient.js 23l
// 'Access-Control-Allow-Origin': '*' 추가
const sse = new SSE(server, { path: '/alarm'});
sse.on('connection', client => {
  let alarm = setInterval(() => {
    if (client.res._closed) {
      clearInterval(alarm);
    }

    client.send(Date.now().toString());
  }, 1_000);
});