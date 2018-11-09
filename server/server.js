const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');    
    socket.emit('signUp', users.getRoomList());
    
    socket.on('join', (params, callback) => {

        if(!isRealString(params.name) || !isRealString(params.room)) {
           return callback('Name and room name are required');
        }

        if (users.userNameExists(params.name)){
            return callback('User with the same name already exists.');
        }

        socket.join(params.room.toLowerCase());
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room.toLowerCase()).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        socket.broadcast.to(params.room.toLowerCase()).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback();

    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
               
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
        console.log('User disconnected.')
    })
});

server.listen(port, () => {
    console.log(`Server started on PORT ${port}`);
});