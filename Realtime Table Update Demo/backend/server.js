const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mysql = require('mysql');
var cors = require('cors');

const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer, {
    cors: {
        origin: '*',
    },
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
});

db.connect();

app.use(cors());

// Create an API endpoint to fetch data
app.get('/api/students', (req, res) => {
    const query = 'SELECT * FROM students';

    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});

// Socket.IO integration
io.on('connection', (socket) => {
    console.log('A user connected');

    // Emit data to the client when changes occur
    const emitData = () => {
        const query = 'SELECT * FROM students';

        db.query(query, (error, results) => {
            if (!error) {
                io.emit('updateData', results);
            }
        });
    };

    // Listen for changes in the database
    db.on('change', () => {
        emitData();
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 5000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});