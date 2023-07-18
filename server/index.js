import express from "express";
import http from 'http';
import {Server as SocketServer} from 'socket.io';

const app = express()
const server = http.createServer(app)
// const io = new SocketServer(server, {
//     cors:{
//         origin: "http://localhost:5173"
//     }
// })
const io = new SocketServer(server)

io.on('connection', socket => {
    console.log('Client connected');
    console.log(socket.id)

    // evento que el frontend escucha al backend
    socket.on('message', (body) =>{
        // console.log(data)
        // CUnado elbackend tiene el mensaje se le dice a todos los clientes
        // este evento el backend envia al frontend
        console.log(body)
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(6) // cortar a solo 6 caracteres
        })
    })
})

server.listen(3000)
console.log('Server on port', 3000)