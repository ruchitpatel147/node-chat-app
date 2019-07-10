//const {message} = require('../../server/utils/message');
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
    var li = jQuery('<li></li>');
    li.text(`${msg.from} : ${msg.text}`);
    jQuery('#messages').append(li);
});


jQuery('#Myform1').on('submit',function (e) {
    e.preventDefault();
    socket.emit('createMessage',{
        from:"User",
        text:jQuery('[name=message]').val()
    },function (data1) {
        console.log('Got it',data1);
    })
});