const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors')
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

// Middleware
app.use(cors());
app.use(express.json())

// Socket.io Connection

app.post('/api/map-data', async (req, res) => {
  const {mapData} = req.body;
  console.log(req.body);
  
  try {
      io.emit('init', mapData);
      res.status(200).send('Data received and saved');
  } catch (error) {
      res.status(500).send('Error saving data');
  }
});

app.get("/", (req, res) => {
  res.json("Hello, Rory!")
})

io.on('connection', (socket) => {
    console.log('New client connected')
    
    // socket.emit('init', messages);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
})
// Start server
const PORT = process.env.PORT || 5200;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));