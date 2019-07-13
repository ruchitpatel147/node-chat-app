

var nameValidation = (name,a)=> {
    var count = 0;
    a.forEach(function(i){
        if(i===name){
            count = count+1;
        }
    });
    if(count===1){
        return true;
    }
    else{
        return false;
    }
};
module.exports = {
  nameValidation
};