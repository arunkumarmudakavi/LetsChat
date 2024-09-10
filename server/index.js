import http from "http"
import express from "express"
import {Server} from "socket.io"
import cors from "cors"
import dotenv from "dotenv"
import { createServer } from "http"

dotenv.config({
    path: ".env"
})


const app = express();
const port = 5000 || process.env.PORT;

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
// }))

app.get("/", (req, res) => {
    res.send("It's Working...")
})

const users = [{}]

// io: It's full one circuit
io.on("connection", (socket) => {
    console.log("New Connection...")
    console.log("Id: ", socket.id)

    // these are the different users
    socket.on('joined', (user) => {
        users[socket.id] = user
        console.log("45: ",{user})
        console.log(socket.id)
        console.log(users)
        socket.broadcast.emit('userJoined', {user: "Admin", message: `${users[socket.id]} has joined`})
        socket.emit('welcome', {user: "Admin", message: `Welcome to the chat ${users[socket.id]}`})
    })

    socket.on('message', ({message, id, userData}) => {
        // To send message to full circuit
        io.emit('sendMessage', { message, id, userData })
    })

    socket.on('disconnectt', () => {
        socket.broadcast.emit('leave', {user: "Admin", message: `${users[socket.id]} has left`})
        console.log("user left")
    })

})

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})