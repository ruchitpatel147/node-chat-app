const expect = require('expect');
const {message} = require('./message');


describe('generate message',()=>{
    it('hello',()=>{
       var from = 'jen';
       var text = 'Some message';
       var message1 = message(from,text);
       expect(message1.createdAt).not.toBeNaN();
       expect(message1).toMatchObject({
           from,
           text
       });
    });
});