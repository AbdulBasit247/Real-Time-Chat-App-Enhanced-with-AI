import 'dotenv/config';
import http from 'http';
import app from './app.js';
import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL
    }
});

io.use((socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[ 1 ];
        if (!token) {
            return next(new Error('Authentication error'))
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return next(new Error('Authentication error'))
        }
        socket.user = decoded;
        next();
    } catch (error) {
        next(error)
    }
})

io.on('connection', (socket) => {
    console.log('A user is connected');

    socket.on('event', (data) => { /* Handle the event */ });
    socket.on('disconnect', () => {
        console.log('A user is disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})