require('dotenv').config({ path: './w3s-dynamic-storage/.env' });
const path = require('path');
const express = require('express');
const { saveMessage, fetchMessages } = require('./db');

const app = express();

app.use(express.static('dist'));
app.use(express.json());

app.post('/api/message', async (req, res) => {
  const status = await saveMessage(req.body);
  const statusCode = status ? 201 : 400;

  res.status(statusCode).send();
});

app.get('/api/messages', async (req, res) => {
  const messages = await fetchMessages(20);

  res.send({ messages });
});

const clientApp = express();
clientApp.use(express.static('dist'));
clientApp.use(express.json());

clientApp.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

if (process.env.NODE_ENV !== 'development') {
  clientApp.listen(8000, () => console.log('client listening on port 8000'));
}
