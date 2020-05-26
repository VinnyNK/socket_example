var app = require('express')();//inicia express
var http = require('http').createServer(app);//inicia server http
var io = require('socket.io')(http);//inicia o socket no http server, escutando conexões de sockets recebidos

app.get('/', (req, res) => {//seta rota
  res.sendFile(__dirname + '/public/index.html');//seta DOM
});

let users = 0;//número usuários

io.on('connection', (socket) => {//inicializa a instacia do socket passando o http server, assim escutando as conexões e eventos emitidos.
  io.emit('chat message', 'a user connect')//emite mensagem de novo usuário
  console.log('user connected');
  users++;
  io.emit('chat message', 'users online: ' + users);
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);//emite para os usuários mensagem recebida
  });
  socket.on('disconnect', () => {
    io.emit('chat message', 'User Disconnect');//emite mensagem de desconexão
    console.log('user disconnected');
    users--;
    io.emit('chat message', 'Users Online: ' + users);
  });
});

http.listen(3000, () => {//http escutar porta 3000
  console.log('listening on *:3000');
});
