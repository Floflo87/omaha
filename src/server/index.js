const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const mongoose = require('mongoose');
const chalk = require('chalk');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const config = require('./config');

const apiRoutes = require('./routes/api');
const appRoutes = require('./routes/app');
const socket = require('socket.io');

mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true }
);

const server = express();

var httpServer = require('http').Server(server);
var io = require('socket.io')(httpServer);

server.use(helmet());
server.use(morgan('dev'));
server.use(compression());
server.use(fileUpload());
server.use(bodyParser.json());

if (!config.IS_PRODUCTION) {
    server.use(express.static(path.join(__dirname, '../../dist')));
}

server.use(express.static(path.join(__dirname, 'public')));
server.use('/api', apiRoutes);
server.use(appRoutes);

mongoose.connection.on('connected', () => {
    console.log(chalk.blue.bold('Connected to Mongo!'));

    // this is sometimes necessary to prevent mongoose errors
    const dir = fs.readdirSync(path.join(__dirname, './models'));
    dir.forEach(model => require(`./models/${model}`));

    // server.listen(config.PORT, () => {
    //     console.log(chalk.blue.bold('Server is up and running: http://localhost:' + config.PORT));
    // });
});

httpServer.listen(3002, function() {
    console.log('server is running on port 3002');
});
// WARNING: app.listen(80) will NOT work here!

server.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('Connected User');

    socket.on('SEND_MESSAGE', data => {
        console.log('test');
        console.log(data);
        io.emit('RECEIVE_MESSAGE', data);
    });
});

// server.listen(3000, function() {
//     console.log('server is running on port 8080');
// });

// io = socket(server);

// io.on('connection', socket => {
//     console.log(socket.id);

//     socket.on('SEND_MESSAGE', function(data) {
//         io.emit('RECEIVE_MESSAGE', data);
//     });
// });
