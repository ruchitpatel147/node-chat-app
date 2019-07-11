const axios = require('axios');
exports.getlocation = (a,b,callback) => {
    var url = `https://api.darksky.net/forecast/a99beb112ef6bc554c3cca10bc800b64/21.170240,72.831062`;
    axios.get(url).then((resp)=>{
       // console.log(resp.data.currently.summary);
        callback(undefined,resp.data.currently.summary);
    }).catch((error)=>{
        if(error.response.status ===400)
        {
            //console.log("wrong api");
            callback("wrong api");
        }
        if(error.code === 'ENOTFOUND')
        {
            callback('unable to connect with server');
           // console.log('unable to connect with server');
        }
        else{
            callback("error");
         //   console.log("error " ,error);
        }

    });


};












