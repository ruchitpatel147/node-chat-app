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
app.use(express.static(pathBuilder),);
io.on('connection',(socket)=>{
   console.log("new user connected");

   socket.on('disconnect',()=>{
       console.log("user was disconnected");
   });
   /*socket.emit('newEmail',{
       from :"ruchit44patel@gmail.com",
       text : "hello how are u ?"
   });*/
    socket.on('createEmail',function (email) {
        console.log(email);
    });
    socket.on('createMessage',function (message) {
        console.log("createMessage",message);
        io.emit('broadcast',{
            from : message.from,
            text :message.text,
            completedAt : new Date().getTime()
        });

    });
 /*   socket.emit('newMessage',{
       text:"hello how are u?"
    });*/
});

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});