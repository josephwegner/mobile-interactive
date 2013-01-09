var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

io.set('log level', 0);

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
    res.render('index.jade');
});
app.get('/mobile/:id', function(req, res){
    res.render('mobile.jade', {id: req.params.id});
});

server.listen(process.env.PORT);

var regUsers = {};

io.sockets.on('connection', function(socket) {
    socket.on('desktop-register', function(data) {
        regUsers[data.id] = socket;
    });
    
    socket.on('mobile-register', function(data) {
        console.log("got mobile register", Date.now());
        if(typeof(regUsers[data.id]) !== "undefined") {
            var deskSocket = regUsers[data.id];
            
            deskSocket.emit('mobile-on');
            console.log("sent mobile register to desktop", Date.now());
        }
    });
});