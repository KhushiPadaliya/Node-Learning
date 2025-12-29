 class user{
    name;
    email;
    id;
    constructor(name , email,id){
        this.name = name;
        this.email = email;
        this.id = id;
    }
    
    get(){
        return {
            name:this.name,
            email:this.email,
            id:this.id,
        }
    }
}
module.exports = user;