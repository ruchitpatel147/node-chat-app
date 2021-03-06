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
const {nameValidation} = require('./utils/nameValidation');
app.use(express.static(pathBuilder),);
app.use(bodyparse.json());
app.use(cors());
var user = new Users();
io.on('connection',(socket)=>{
   console.log("new user connected");

   socket.on('disconnect',()=>{
       console.log("user was disconnected");
    var user1 = user.removeUser(socket.id);
    if(user1){
        io.to(user1.room).emit('updatelist',user.getuserlist(user1.room));
        io.to(user1.room).emit('newMessage',message("admin",`${user1.name} has left`));
    }
   });
   socket.on('join',async function (result,callback) {
       var a = user.getuserlist(result.room);
     //  var name = nameValidation(result.name,a);
      // console.log("return from function",name);
       if(!isRealString(result.name) || !isRealString(result.room)){

           callback("name and room are required");

       }
       else if(nameValidation(result.name,a))
       {

           console.log("name already available");
           callback("name already available try with different name ");
       }
       else
           {

               socket.join(result.room);
               user.removeUser(socket.id);
               user.addUser(socket.id,result.name,result.room);
               io.to(result.room).emit('updatelist',user.getuserlist(result.room));
               socket.emit('newMessage',message("admin","welcome to the chat application"));
               socket.broadcast.to(result.room).emit('newMessage',message("admin",`${result.name} has joined`));
             //  var b =user.getuserlist(result.room);
              // console.log(b);
               callback();
           }

   });
    socket.on('createMessage',function (message1,callback) {
        var getuser = user.getuser(socket.id);
        console.log("createMessage",message1);
        //socket.broadcast.emit('broadcast',message(message1.from,message1.text));
        io.to(getuser.room).emit('newMessage',message(message1.from,message1.text));
        callback();

    });
    socket.on('createlocation',function (result) {
        var getuser = user.getuser(socket.id);
        io.to(getuser.room).emit('generatelocation',generatelocation('admin',result.latitude,result.longitude));
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