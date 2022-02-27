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
});