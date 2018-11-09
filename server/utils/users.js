class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
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
}

module.exports = {Users};