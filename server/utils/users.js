class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {id, name, 
            room: room.toLowerCase()
        };
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        var currentUser = this.getUser(id);
        if (currentUser) {
            this.users = this.users.filter((user) => user.id != id);
        }       
        return currentUser;
    }
    getUser(id) {
        return this.users.find((user) => user.id === id);
    }
    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
    getRoomList(){
        return this.users.map((user) => user.room).filter((elem, pos, arr) => arr.indexOf(elem) == pos);
    }
    userNameExists(name) {
        return this.users.find((user) => user.name === name);
    }
}

module.exports = {Users};