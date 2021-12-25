const express = require('express');
const app = express();
let cookieParser = require('cookie-parser');
const express_session = require('express-session');
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // usabamos para sessiones sin file store
// app.use(cookieParser("secret"));
// app.use(express_session({
//     secret: 'comision',
//     resave: false,
//     saveUninitialized: true
// }));


// usando session file store
// const FileStore = require('session-file-store')(express_session);

// app.use(cookieParser("secret"));
// // usando filestore
// app.use(express_session({
//     store: new FileStore( { path: './sessions', ttl:60, retries:0 } ),
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 15000   // 15 segundos
//     }
// }));

///Usando redis

// usando redis (NO FUNCA)
// const redis = require('redis');
// const connectRedis = require('connect-redis');
// const RedisStore = connectRedis(express_session);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const redisClient = redis.createClient( {
//     host: 'localhost',
//     port: 6379
//     });

// redisClient.on('error', function (err) {
//     console.log('Could not establish a connection with redis. ' + err);
// });
// redisClient.on('connect', function (err) {
//     console.log('Connected to redis successfully');
// });
// app.use(express_session({
//     store: new RedisStore({ client: redisClient }),
//     secret: 'redis',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false, // if true only transmit cookie over https
//         httpOnly: false, // if true prevent client side JS from reading the cookie 
//         maxAge: 1000 * 60 * 10 // session max age in miliseconds
//     }
// }))


////usando mongo
const mongoStore = require('connect-mongo')
app.use(express_session({
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://root:cualquiera@cluster0.6f4bv.mongodb.net/AnthonyStoreProject?retryWrites=true&w=majority',
        dbName: 'sessions',
        collection: 'sessions'
    }),
    databaseName: 'sessions',
    secret: 'comision',
    resave: false,
    saveUninitialized: false,
    
}));


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
////rutas cookies
// app.get('/cookies', (req, res, next) => {
//     console.log(req.cookies);
//     console.log(req.signedCookies);
//     res.json({noFirmadas: req.cookies, firmadas: req.signedCookies});
// });

// app.post('/cookies', (req, res, next) => {
//     const {clave, valor, signed, tiempo} = req.body;

//     if (!clave || !valor) {
//         res.json({error: 'Faltan parámetros'});
//     }

//     res.cookie(clave, valor, {signed}).json({"process": true});
// });

// app.delete('/cookies/:clave', (req, res, next) => {

//     const {clave} = req.params;
//     if (clave){
//         res.clearCookie(clave).json({"process": true});
//     }else{
//         res.json({error: 'Falta la clave'});
//     }
// });

const getName = req => req.session.nombre ?? 'Anónimo';

app.get('/', (req, res, next) => {
    let {nombre} = req.query;
    if (req.session.contador){
        req.session.contador++;
        res.send(`Hola ${getName(req)} tienes (${req.session.contador}) visitas`);
    }else{
        if (nombre){
            req.session.nombre = nombre;
        }
        req.session.contador = 1;
        res.send(`Bienvenidos ${getName(req)}`);
    }
})

app.get('/olvidar', (req, res, next) => {
    req.session.destroy();
    res.send('Sesión eliminada');
}
);