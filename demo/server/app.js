const express = require('express');
const cors = require('cors');

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

app.get('/alarm', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');

  const alarm = setInterval(() => {
    res.write(`id: 1\n\n`)
    res.write(`data: ${ Date.now().toString() }\n\n`);
  }, 1_000);

  res.on('close', () => {
    clearInterval(alarm);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`express server listening on port ${ PORT }`);
});