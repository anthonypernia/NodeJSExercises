const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const express_session = require('express-session');
const mongoStore = require('connect-mongo')
const path = require('path');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'public'));
app.use(express.static('public'));
app.use(cors());

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('not authenticated');
}

let users = [];

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
const advancedOption = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
 }
app.use(express_session({
    store: mongoStore.create({
        mongoUrl: "mongodb+srv://root:cualquiera@cluster0.6f4bv.mongodb.net/AnthonyStoreProject?retryWrites=true&w=majority",
        mongoOptions: advancedOption,
        dbName: "shop",
        collection: 'sessions',
    }),
    databaseName: "shop",
    secret: 'pruebas',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10000 * 60 , // 10 minutos
        httpOnly: true,
        secure: false,
    },

    // ///usando local
    // secret: 'pruebas',
    // resave: false,
    // saveUninitialized: true,
    // cookie: {
    //     maxAge: 10000 * 60 , // 10 minutos
    // },
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    let user = users.find(user => user.username === username);
    done(null, user);
});

passport.use('register', new LocalStrategy({
    passReqToCallback: true,
}, (req, username, password, done) => {
    let { email } = req.body;

    let user = users.find(user => user.username === username);

    if (user) {
        return done(null, false, { message: 'El usuario ya existe' });
    }

    let userNew = {
        username,
        email,
        password,
    };

    users.push(userNew);
    return done(null, userNew);
}
));

passport.use('login', new LocalStrategy((username, password, done) => {
    let user = users.find(user => user.username === username);
    console.log(user);
    if (user){
        return done(null, user);
    }
    return done(null, false, { message: 'El usuario no existe' });
}));


// app.post('/registro', (req, res, next) => {
//     let {email, username, password } = req.body;
//     if (email && username && password) {
//         const user = users.find(user => user.username === username);
//         if(user){
//             res.status(400).send('El user ya existe');
//         }else{
//             users.push({email, username, password});
            
//             res.status(201).send('user creado');
//         }
//     }else {
//         console.log('faltan datos');
//         res.status(400).send('Faltan datos');
//     }
// });

//version nueva
app.post('/register', passport.authenticate('register'), (req, res) => {
    res.status(201).send('user creado');
});


// app.post('/login', (req, res, next) => {
//     let {email, password} = req.body;
//     const user = users.find(user => user.email === email && user.password === password);
//     if(user){
//         req.session.user = user;
//         req.session.contador = 0;
//         res.status(200).send('user logueado');

//     }else{
//         res.status(400).send('user no existe');
//     }
// });

///version nueva
app.post('/login', passport.authenticate('login'), (req, res) => {
    res.status(200).send('user logueado');
});

// app.get('/datos', (req, res, next) => {
//     if(req.session.user){
//         req.session.contador++;
//         res.status(200).send({
//             username: req.session.user.username,
//             contador: req.session.contador,
//             users: users
//         });
//     }else{
//         res.status(400).send('No hay user logueado');
//     }
// });

//version nueva
app.get('/datos', isAuth,(req, res, next) => {
    if(req.user.contador){
        req.user.contador++;
        res.status(200).send({
            username: req.user.username,
            contador: req.user.contador,
            users: users
        });
    }else{
        req.user.contador = 1;
        res.status(200).send({
            username: req.user.username,
            contador: req.user.contador,
            users: users
        });
    }
});

app.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.status(200).send('user deslogueado');
});





app.listen(3000, () => {
    console.log('app listening on port 3000!');
});
