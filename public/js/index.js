
var socket = io();
socket.on('connect',function(){
    console.log("connected to  server");
});
socket.on('disconnect',function(){
    console.log("disconnected from server");
});

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
socket.on('generatelocation',function(location){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank"> My current location</a>');
    li.text(`${location.from}`);
    a.attr('href',location.url);
    li.append(a);
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
jQuery('#locationButton').on('click',function (e) {
   if(!navigator.geolocation)
   {
       return alert("geo location not supported by your browser");
   }
   navigator.geolocation.getCurrentPosition(function (position) {
    var a=position.coords.latitude;


      console.log(a);
     var  b= position.coords.longitude;
       console.log(b);
       socket.emit('createlocation',{
          latitude : a,
          longitude :b
       });


      var request = new XMLHttpRequest();
       request.open('GET', 'http://localhost:3010/server/getlocation', true);
       request.onload = function () {
         var ab = this.response;
        // console.log("a",a.result);
          // var b =JSON.stringify(a);
           //console.log("b",b);
           var c = JSON.parse(ab);
           console.log("c",c.result);
           jQuery('#weather').val(c.result);
          // jQuery('#weather').append(c.result);
       };
       request.send( null );

       var data = new FormData();
       data.append('user', 'person');
       data.append('pwd', 'password');
       data.append('organization', 'place');
       data.append('requiredkey', 'key');
     //  var params = `latitude=${a}&longitude=${b}`;
       var request1 = new XMLHttpRequest();

       var params = {latitude:a , longitude:b};
       console.log(params);


       request1.open('POST', 'http://localhost:3010/server/getlocation', true);
       request1.setRequestHeader('Content-type', 'application/json');

       request1.onload = function () {
           console.log(this.responseText);


       };
       request1.send(JSON.stringify(params));
       /*fetch('http://localhost:3010/server/getlocation',
                  {
                  method:'POST',
                  header :new Headers(),
                  body:JSON.stringify({latitude:a,longitude:b})
              }).then((res) => res.json())
                  .catch((err)=>console.log("err",err));*/

   },function () {
       alert("unable to fetch data ");
   });

});