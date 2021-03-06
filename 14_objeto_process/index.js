const express = require('express');
const express_session = require('express-session');
const mongoStore = require('connect-mongo')
const  path  = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server: HttpServer } = require('http');
const {Server: IOServer} = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const { config, db } = require('./config/index');
const ServerRouter = require('./routes/index');
const socketConponent = require('./Components/Sockets');
const yargs = require('yargs')(process.argv.slice(2));
const argv = yargs
.default({
    port: config.port
})
.alias({
    p: 'port',
    m: 'mode',
    d: 'debug',
})
.argv;
const PORT= argv.port;
const {fork} = require('child_process');
let child = fork('child.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'public'));
app.use(express.static('public'));


httpServer.listen(8080, () => {
    console.log(`Server listening on port ${PORT}`);
    });

socketConponent(io);
const advancedOption = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
 }
app.use(express_session({
    store: mongoStore.create({
        mongoUrl: db.mongo_db_uri,
        mongoOptions: advancedOption,
        dbName: db.database,
        collection: 'sessions',
    }),
    databaseName: db.database,
    secret: 'comision',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10000 * 60 ,
        httpOnly: true,
        secure: false,
    },
}));

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get( '/login', ( req, res, next ) => {
    res.sendFile(__dirname + '/public/login.html');
});
app.get( '/register', ( req, res, next ) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.get( '/info', ( req, res, next ) => {
    res.json({
        argIn: yargs.argv,
        env: process.env,
        nodeVersion: process.version,
        os: process.platform,
        memoryReserve: process.memoryUsage(),
        pathExec: process.execPath,
        processId: process.pid,
        folderProcess: process.cwd(),
    });
});

app.get( '/randoms/:number?', ( req, res, next ) => {
    let {number} = req.params;
    if (!number) {
       number = 100000000;
    }
    child.send({"number":number});
    child.on('message', (data) => {
        res.json(data);
    }
    );
});

ServerRouter(app);
