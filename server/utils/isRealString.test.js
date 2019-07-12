const expect = require('expect');
const {isRealString} = require('./isRealString');

describe("check string",()=>{
    it("String with length>0",()=>{
        const a = "asdas";
        var message = isRealString(a);
        expect(message).toBe(true);

    });
    it("Number",()=>{
        const a = 98;
        var message = isRealString(a);
        expect(message).toBe(false);

    });
    it("null string",()=>{
        const a = "";
        var message = isRealString(a);
        expect(message).toBe(false);

    });
});