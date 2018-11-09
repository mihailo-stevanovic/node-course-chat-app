const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Jamie',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Tester',
            room: 'test room'
        };
        var response = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var user = {
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        };
        var res = users.removeUser('1');

        expect(res).toEqual(user);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {               
        var res = users.removeUser('99');        
        expect(res).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var user  =  users.getUser(userId);

        expect(user).toBeFalsy();
    });

    it('should return names for Node Course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Jamie']);
    });

    it('should return names for React Course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    });

    it('should return a list of unique rooms', () => {
        var roomList = users.getRoomList();

        expect(roomList.length).toBe(2);
        expect(roomList).toEqual(['Node Course', 'React Course']);
    });
});
