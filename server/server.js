const path = require('path');
const express = require('express');
const http = require('http');
const pathBuilder = path.join(__dirname,'../public');
const fs = require('fs');
const socketIO = require('socket.io');
const {isRealString} = require('./utils/isRealString');

const app = express();
const port = process.env.PORT || 3010;
const server = http.createServer(app);
const io = socketIO(server);
const {getlocation} = require('./getlocation');
const {message,generatelocation} = require('./utils/message');
const {a} = require('../model/Abc');
const {mongoose} =require('./../db/dbconnect');
const bodyparse = require('body-parser');
const cors =require('cors');
const {Users} = require('./utils/Users');
app.use(express.static(pathBuilder),);
app.use(bodyparse.json());
app.use(cors());
var user = new Users();
io.on('connection',(socket)=>{
   console.log("new user connected");

   socket.on('disconnect',()=>{
       console.log("user was disconnected");
       var a = user.removeUser("1");
       console.log(a);
       console.log(user.users);
   });
   socket.on('join',function (result,callback) {
       if(!isRealString(result.name) || !isRealString(result.room)){

           callback("name and room are required");

       }
       user.addUser("1",result.name,result.room);
       console.log(user.users);
       socket.join(result.room);
       socket.emit('newMessage',message("admin","welcome to the chat application"));
       socket.broadcast.to(result.room).emit('newMessage',message("admin",`${result.name} has joined`));
       callback();
   });
    socket.on('createMessage',function (message1,callback) {
        console.log("createMessage",message1);
        //socket.broadcast.emit('broadcast',message(message1.from,message1.text));
        io.emit('newMessage',message(message1.from,message1.text));
        callback();

    });
    socket.on('createlocation',function (result) {

        io.emit('generatelocation',generatelocation('admin',result.latitude,result.longitude));
       // app.use(cors());
        app.get("/server/getlocation", async(req, res, next) => {
            //res.send("sadasda");
            getlocation(result.latitude,result.longitude,(error,result)=>{
                if(result){
                    //a = result;
                    console.log(result);
                    res.json({result});
                }if(error){
                    console.log(error);
                }
            });
    })

});
    socket.on('createlocation2',function (result) {

        app.get("/server/getlocation", async(req, res, next) => {
            //res.send("sadasda");
            getlocation(result.latitude,result.longitude,(error,result)=>{
                if(result){
                    //a = result;
                    console.log(result);
                    res.json({result});
                }if(error){
                    console.log(error);
                }
            });
        })

    });

});
app.post("/server/getlocation",(req,res)=>{

    var user = new a(req.body);

    user.save().then((result)=>{
        console.log(result);
        res.send(result);
    },(err)=>{
        console.log("error",err);
        //res.status(400).send(err);
    });
});

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});