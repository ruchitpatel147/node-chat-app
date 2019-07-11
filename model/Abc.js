const mongoose = require('mongoose'),schema = mongoose.Schema;

const userschema =schema({
    latitude :{
        type:Number
    },
    longitude:{
        type:Number
    }
});
const a = mongoose.model('Latitude',userschema);
module.exports={
    a
};