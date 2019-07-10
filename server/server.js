const path = require('path');
const express = require('express');
const http = require('http');
const pathBuilder = path.join(__dirname,'../public');
const fs = require('fs');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3010;
const server = http.createServer(app);
const io = socketIO(server);
const {message} = require('./utils/message');

app.use(express.static(pathBuilder),);
io.on('connection',(socket)=>{
   console.log("new user connected");

   socket.on('disconnect',()=>{
       console.log("user was disconnected");
   });
   socket.emit('newMessage',message("admin","welcome to the chat application"));
   socket.broadcast.emit('newMessage',message("admin","new user joined"));
   /*socket.emit('newEmail',{
       from :"ruchit44patel@gmail.com",
       text : "hello how are u ?"
   });
    socket.on('createEmail',function (email) {
        console.log(email);
    });*/
    socket.on('createMessage',function (message1,callback) {
        console.log("createMessage",message1);
        //socket.broadcast.emit('broadcast',message(message1.from,message1.text));
        io.emit('newMessage',message(message1.from,message1.text));
        callback('this is from the server');

    });
 /*   socket.emit('newMessage',{
       text:"hello how are u?"
    });*/
});

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});