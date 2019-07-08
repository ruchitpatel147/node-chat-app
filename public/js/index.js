var socket = io();
socket.on('connect',function(){
    console.log("connected to  server");
});
socket.on('disconnect',function(){
    console.log("disconnected from server");
});
/*
socket.on('newEmail',function (email) {
console.log(email);
});
socket.emit('createMessage',{
    from:"abc123@gmail.com",
    text: "fine"
});*/
socket.on('welcome',function (welcome) {
   console.log(welcome);
});
socket.on('joined',function (joined) {
   console.log(joined);
});
socket.on('newMessage',function(msg){
    console.log("msg",msg);
});
socket.on('broadcast',function (m1) {
   console.log("broadcast",m1);
});