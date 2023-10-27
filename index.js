//const { Socket } = require('dgram');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server =http.createServer(app);
const io = socketIO(server);

const PORT = 5000;

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on("connect", (socket) => {
    console.log("User connected");
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    })

    socket.on("disconnect", () => {
        console.log("User disconnected");
    })
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})