var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

let users = 0

io.on('connection', (socket) => {
  io.emit('chat message', 'a user connect')
  console.log('user connected');
  users++
  io.emit('chat message', 'users connect: ' + users);
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log();
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    users--;
    io.emit('chat message', 'users connect: ' + users);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
