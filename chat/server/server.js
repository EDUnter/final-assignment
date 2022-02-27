const io = require('socket.io')(process.env.PORT || 3000, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

let users = [];

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('message', (message) => {
        users.forEach(u => {
            if (u.socketId == socket.id) {
                message = `${u.nick} ${message}`;
            }
        });
        io.emit('message', message);
    });

    socket.on('login', (nickname) => {
        users.push({ nick: nickname, socketId: socket.id });
        socket.emit('signedIn', { isLoggedIn: true, nick: nickname, socketId: socket.id });
        socket.broadcast.emit('loggedIn', `${nickname} has joined the chat`);
    });

    socket.emit('some event', 'some data');

    io.emit('some event', 'some data');

    socket.broadcast.emit('some event', 'some data');

    socket.on('disconnect', () => {
        console.log('disconnected');
    });
});