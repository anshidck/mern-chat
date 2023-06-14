const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const userRouter = require('./router/userRouter');
const chatRouter = require('./router/chatRouter');
const messageRouter = require('./router/messageRouter')
const path = require('path')
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config()
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', userRouter);
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)

app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

const server = app.listen(port, () => console.log(`server started to ${port}`))

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        if (userData && userData._id) {
            socket.join(userData._id);
            socket.emit("connected");
        } else {
            console.log("Invalid userData");
        }
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED");
        socket.rooms.forEach((room) => {
            if (room !== socket.id) {
                socket.leave(room);
            }
        });
    });
});
