const expect = require('expect');
const {Users} = require('./Users');

describe("check User class",()=>{
    var users;
    beforeEach(()=> {
        users = new Users();
        users.users = [{
            id: "1",
            name: "abc",
            room: "A"
        }, {
            id: "2",
            name: "xyz",
            room: "B"
        }, {
            id: "3",
            name: "pqr",
            room: "A"
        }];
    });
   it('addUser',()=>{
       var users = new Users();
       var user = {
           id : "1212",
           name : "ruchit",
           room : "sadasd"
       }
       var message = users.addUser(user.id,user.name,user.room);
       expect(users.users).toEqual([user]);
   });
   it('getuserlist',()=>{
       var message = users.getuserlist("A");
       expect(message).toEqual(["abc","pqr"]);
   });
    it('removeuser',()=>{
        var message = users.removeUser("1");
        expect(message.id).toBe("1");
    });
    it('getuser',()=>{
        var message = users.getuser("1");
        expect(message.id).toBe("1");
    });
});