
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
   // console.log("msg",msg);
    var li = jQuery('<li></li>');
    const date = moment(msg.createdAt).format('h:mm a');
    li.text(`${msg.from} : ${msg.text} : ${date}`);
    jQuery('#messages').append(li);
});
socket.on('generatelocation',function(location){
    var li = jQuery('<li></li>');
    const date = moment(location.createdAt).format('h:mm a');
    var a = jQuery('<a target="_blank"> My current location</a>');
    li.text(`${location.from} :`);
    a.attr('href',location.url);
    li.append(a, ` ${date}`);
    jQuery('#messages').append(li);

});


jQuery('#Myform1').on('submit',function (e) {
    e.preventDefault();
    socket.emit('createMessage',{
        from:"User",
        text:jQuery('[name=message]').val()
    },function (data1) {
        jQuery('[name=message]').val('');
    });
});
jQuery('#locationButton').on('click',function (e) {
   if(!navigator.geolocation)
   {
       return alert("geo location not supported by your browser");
   }
    jQuery('#locationButton').attr('disabled','disabled').text("sending");
   navigator.geolocation.getCurrentPosition(function (position) {
       jQuery('#locationButton').removeAttr('disabled').text("send location");
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


           var c = JSON.parse(ab);
           console.log("c",c);

           jQuery('#weather').val(c.result);
           //jQuery('[name=message]').val(c.result);

       };
       request.send(null);
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
       jQuery('#locationButton').removeAttr('disabled').text("send location");
       alert("unable to fetch data ");
   });

});

jQuery('#currentWeather').on('click',function (e) {
    jQuery('#currentWeather').attr('disabled','disabled').text("sending");
    navigator.geolocation.getCurrentPosition(function (position) {
        var a = position.coords.latitude;
        console.log(a);
        var b = position.coords.longitude;
        console.log(b);
        socket.emit('createlocation2',{
            latitude : a,
            longitude :b
        });
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:3010/server/getlocation', true);
        request.onload = function () {
            var ab = this.response;
            var c = JSON.parse(ab);
            console.log("c", c);

            jQuery('#message').val(c.result);
            jQuery('#currentWeather').removeAttr('disabled').text("send weather");
            //jQuery('[name=message]').val(c.result);

        };
        request.send(null);
    },function (e) {
        console.log("unable to fetch data");

    });
});
