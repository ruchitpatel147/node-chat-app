var socket = io();
socket.on('connect',function(){
    console.log("connected to  server");
});
socket.on('disconnect',function(){
    console.log("disconnected from server");
});
socket.on('newEmail',function (email) {
console.log(email);
});
socket.emit('createMessage',{
    from:"abc123@gmail.com",
    text: "fine"
});
socket.on('newMessage',function(msg){
    console.log("msg",msg);
});