class Users{
    constructor(){
        this.users = [];
    }
    addUser(id,name,room){
        var user= {id,name,room};
        this.users.push(user);
        return user;
    };
    getuser(id){
        var getuser=this.users.filter((user)=>user.id===id)[0];
        return getuser;

    }
    removeUser(id){
        var user = this.getuser(id);
        if(user)
        {
            this.users = this.users.filter((user)=>user.id!==id)
        }
        return user;
    }
    getuserlist(room){
        var userlist = this.users.filter((user)=>user.room === room);
        var nameArray = userlist.map((user)=>user.name);
        return nameArray;
    }
}
module.exports={
  Users
};