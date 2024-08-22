// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Mock data
const markers = [
  { lat: 37.7749, lng: -122.4194, topic: 'Marker 1', explanation: 'Explanation 1' },
  { lat: 34.0522, lng: -118.2437, topic: 'Marker 2', explanation: 'Explanation 2' },
];

io.on('connection', (socket) => {
  console.log('New client connected');

  // Send initial markers data
  socket.emit('update', markers);

  // Optional: Handle incoming data and broadcast updates
  socket.on('update', (data) => {
    io.emit('update', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
