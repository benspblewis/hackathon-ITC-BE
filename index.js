const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080 || process.env.PORT;
const dbConnection = require("./knex/knex");
const http = require('http').Server(app)


const chatRoute = require("./routes/Chat");
const userRoute = require("./routes/User");
app.use(express.json());
app.use(cors());

app.use("/chat", chatRoute);
app.use("/user", userRoute);



//--------------------------

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});


let users = [];
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });
  
  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  socket.on('newUser', (data) => {
    users.push(data);
    console.log(users);
    socketIO.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});


//-----------------------------



dbConnection.migrate
  .latest()
  .then((migration) => {
    if (migration) {
      console.log("Connected to DB", migration);
      http.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    }
  })
  .catch((err) => {
    console.log(err);
    return process.exit(1);
  });
