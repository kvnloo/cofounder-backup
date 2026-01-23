const http = require('http');
const socketIO = require('socket.io');

let io;

const initWebSocket = (app) => {
    const server = http.createServer(app);
    io = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });

        socket.on('new video', (video) => {
            io.emit('new video', video);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return server;
};

module.exports = { initWebSocket };