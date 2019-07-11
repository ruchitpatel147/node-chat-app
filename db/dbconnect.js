const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Latitude',(err,result)=>{
    if(err){
        console.log("error in connection");
    }if(result){
        console.log("successfully connected with db");
    }
});
