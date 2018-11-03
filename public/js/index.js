var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server.');
    socket.emit('createMessage', {
        from: 'Mihailo',
        text: 'Hi, this is Mihailo.'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server.');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
});