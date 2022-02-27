const io = require('socket.io')(process.env.PORT || 3000, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('message', (message) => {
        io.emit('message', message);
    });

    socket.on('login', (nickname) => {
        console.log(nickname)
        socket.emit('signedIn', true);
    });

    socket.emit('some event', 'some data');

    io.emit('some event', 'some data');

    socket.broadcast.emit('some event', 'some data');

    socket.on('disconnect', () => {
        console.log('disconnected');
    });
});