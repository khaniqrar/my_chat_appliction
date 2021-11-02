var createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const app = express();
const routes = require('./routes');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var cookieParser = require('cookie-parser');
var users = {};
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const connection = require("./utils/dbConnection");

app.use(express.urlencoded({ extended: false }));
app.use(session({
    name: 'session',
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600 * 1000, // 1hr
    }
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.use((err, req, res, next) => {
    // console.log(err);
    return res.send('Internal Server Error');
});

var groups = ['group1'];

io.on('connection', (socket) => {
    console.log('a user connected');
    
    connection.query("select * from chats", function (error, result) {
        socket.emit('load old msgs', result);     
    });
    socket.on('new user', function (data ,callback) {
        console.log(data);
        if (data in users){
            callback(false);
        }
        else {
            console.log(data.Name+"khan");
            callback(true);
            
            socket.name = data.Name;
            users[socket.name] = socket;
            updatenames();


            socket.group = 'group1';
            socket.join('group1');
            socket.emit('updatechat', 'SERVER', 'you have connected to group1');
            socket.broadcast.to('group1').emit('updatechat', 'SERVER', socket.name + ' has connected to this my chats');
            socket.emit('updategroups', groups, 'group1');
        }

    })


   


    function updatenames() {
        io.sockets.emit('usernames', Object.keys(users));
    }

    //creating a chat group
    socket.on('create', function(group) {
        groups.push(group);
        socket.emit('updategroups', groups, socket.group);
    });


    socket.on('send message', function (data, callback) {
        var msg = data.trim();
        if(msg.substr(0,3) === '/w '){
            msg = msg.substr(3);
            var ind = msg.indexOf(' ');
            if(ind !== -1) {
                var name = msg.substring(0, ind);
                var msg  = msg.substring(ind+1);

                if(name in users){
                    users[name].emit('whisper', {msg: msg ,nick: socket.name});
                    console.log('Private Message!');
                }else {
                    callback('Error! Enter a valid user');
                }
                console.log('Whisper');
            }else {
                callback('Error! Please enter a message for your whisper');
            }
        }
        else {
            var newMsg ={msg: msg, nick: socket.name};
            console.log(newMsg);
            connection.query("INSERT INTO chats (username, message) VALUES ('" + socket.name + "', '" + msg + "')", function (error, result) {
                io.sockets.in(socket.group).emit('new message', {message: msg, username: socket.name})
            });
        }
    })




    socket.on('switchgroup', function(newgroup){
        socket.leave(socket.group);
        socket.join(newgroup);
        socket.emit('updatechat', 'SERVER', 'you have connected to '+ newgroup);
        // sent message to OLD group
        socket.broadcast.to(socket.group).emit('updatechat', 'SERVER', socket.name+' has left this group');
        // update socket session group title
        socket.group = newgroup;
        socket.broadcast.to(newgroup).emit('updatechat', 'SERVER', socket.name+' has joined this group');
        socket.emit('updategroups', groups, newgroup);
    });



    socket.on('disconnect', function (data) {
       if (!socket.name) return;
       delete  users[socket.name];
      
        socket.broadcast.emit('updatechat', 'SERVER', socket.name + ' has disconnected');
        socket.leave(socket.group);

        updatenames();
    });

  });
  
  server.listen(3000, () => {
    console.log('listening on *:3000');
  });