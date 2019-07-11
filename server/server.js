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
const {getlocation,generatelocation} = require('./getlocation');
const {message} = require('./utils/message');
const {a} = require('../model/Abc');
const {mongoose} =require('./../db/dbconnect');
const bodyparse = require('body-parser');
app.use(express.static(pathBuilder),);
app.use(bodyparse.json());
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
    socket.on('createlocation',function (result) {
        io.emit('generatelocation',generatelocation('admin',result.latitude,result.longitude));
    })
 /*   socket.emit('newMessage',{
       text:"hello how are u?"
    });*/
});
app.get("/server/getlocation", async(req, res, next) => {
    //res.send("sadasda");
    getlocation(4,8,(error,result)=>{
         if(result){
              //a = result;
             console.log(result);
             res.send({result});
         }if(error){
             console.log(error);
         }
     });

   //console.log("result",result1);
   //  console.log("result",a);
   // res.send({a});
    //res.send("asdasd");
     //res.send(getlocation(4,8));
});
app.post("/server/getlocation",(req,res)=>{

   // console.log(req.body);
    var user = new a(req.body);
    //console.log(user);
    user.save().then((result)=>{
        console.log(result);
        res.send(result);
    },(err)=>{
        res.status(400).send(err);
    });
});
//console.log(a);
server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});