const expect = require('expect');
const {message,generatelocation} = require('./message');


describe('generate message',()=>{
    it('hello',()=>{
       var from = 'jen';
       var text = 'Some message';
       var message1 = message(from,text);
      // expect(message1.createdAt).not.toBeNaN();
       expect(message1).toInclude({
           from,
           text
       });
    });
});
describe('generateLocation',()=>{
    it('hello',()=>{
        var from = 'jen';
        var latitude = 15;
        var longitude = 9;
        var url =`https://www.google.com/maps/?q=15,9`;
        var message2 = generatelocation(from,latitude,longitude);
        //expect(message2.createdAt).not.toBeNaN();
        expect(message2).toInclude({
            from,
            url
        });
    });
});