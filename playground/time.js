const moment = require('moment');

/*var date = moment();
console.log("date",date);
console.log(date.format('dddd, MMMM Do YYYY, h:mm:ss '));
//console.log(date.format('MM'));
console.log(moment().add(7, 'days').subtract(1, 'months').year(2009).hours(0).minutes(0).seconds(0));*/

const createdAt = new Date();
const date = moment(createdAt);

console.log(date.format('h:mm a'));
