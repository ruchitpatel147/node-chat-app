var isRealString = (param)=>{
    return typeof param ==='string' && param.length>0;
};
module.exports = {
  isRealString
};