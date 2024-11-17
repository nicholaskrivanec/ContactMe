require('dotenv').config({ path: './w3s-dynamic-storage/.env' });
const path = require('path');
const express = require('express');
const { saveMessage, fetchMessages } = require('./db');
const app = express();

// Check if we are in development mode
const isDev = process.env.NODE_ENV === 'development';

// Middleware for parsing JSON
app.use(express.json());

if (isDev) {
  // Development mode: assume Vite dev server is running
  console.log('Development mode: Ensure Vite is running on http://localhost:8000');
} else {
  // Production mode: serve static files from 'dist'
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  });
}

// Backend API routes
app.post('/api/message', async (req, res) => {
  const status = await saveMessage(req.body);
  const statusCode = status ? 201 : 400;
  res.status(statusCode).send();
});

app.get('/api/messages', async (req, res) => {
  const messages = await fetchMessages(20);
  res.send({ messages });
});

// Start the backend server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));

if (isDev) {
  console.log('Note: Use http://localhost:8000 to access the frontend served by Vite in development.');
}
