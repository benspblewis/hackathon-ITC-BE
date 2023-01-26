const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080 || process.env.PORT;
const dbConnection = require("./knex/knex");
const http = require('http').Server(app)
const { userJoin, getCurrentUser ,getRoomUsers,userLeave} = require("./utils/users");
const {formatMessage} = require('./utils/messages')
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




//runs on clint connection 
const botName = "ChatCordBot";
socketIO.on('connection', (socket) => {
  
  socket.on('joinRoom', ({userId,roomId,userName})=>{
    const user = userJoin(socket.id, userId,roomId,userName)
    socket.join(user.roomId)
    socket.emit("message", formatMessage(botName, "Welcometo LingoChat!"));
  })
  socket.on('chatMessage', (message) => {
    console.log(message)
    const user = getCurrentUser(socket.id);
    console.log(user)
    socketIO.to(user.roomId).emit('message', formatMessage(user.userName, message));
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    
    if(user){
      socketIO.to(user.room).emit("message", formatMessage(botName,`${user.userName} has left the chat`));
    }
  });
  
  // socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  // socket.on('newUser', (data) => {
  //   users.push(data);
  //   console.log(users);
  //   socketIO.emit('newUserResponse', users);
  // });

  // socket.on('disconnect', () => {
  //   console.log('🔥: A user disconnected');
  //   users = users.filter((user) => user.socketID !== socket.id);
  //   socketIO.emit('newUserResponse', users);
  //   socket.disconnect();
  // });
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
