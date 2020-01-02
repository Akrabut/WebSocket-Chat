var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

function userChange(userConnectedString) {
  const date = new Date()
  io.emit('user change', `User ${userConnectedString}connected at ${date.getHours()}:${date.getMinutes()}`)
}

io.on('connection', socket => {
  console.log('user connected');
  userChange('');
  socket.on('disconnect', () => {
    console.log('user disconnected');
    userChange('dis')
  });
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});