const express = require('express');
const app = express();
const PORT = 3000
const path = require('path');
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'my_secret_key';
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'public'));
app.use(express.static('public'));
app.use(cors());

let users = [];

app.get('/register', (req, res, next) => {
    res.status(200).send('register');
});

app.get('/login', (req, res, next) => {
    res.status(200).send('login');
});

app.post('/register', async (req, res, next) => {
    const { username, password, email } = req.body;
    if(!username || !password || !email){
        res.status(400).send('data missing');
    }
    let user = users.find(user => user.username === username);
    if(user){
        res.status(400).send('username already exists');
    }
    user = {
        username,
        password,
        email
    };
    console.log(user);
    users.push(user);
    const accessToken = await generateToken(user);
    console.log(accessToken);
    res.status(200).json({
        accessToken
    });
});

app.post('/login', async (req, res, next) => {
    let { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        res.status(400).json({
            message: 'Usuario o contraseña incorrectos'
        });
    }
    const accessToken = await generateToken(user);
    res.status(200).json({
        accessToken
    });
});

app.get('/datos', auth, (req, res, next) => {
    res.status(200).json({
        user: req.user
    });
});

async function generateToken(user){
    const token = await jwt.sign({
        user, 
        date: new Date()
        }, PRIVATE_KEY, {
            expiresIn: '1h'
            });
    return token;
}

async function auth(req, res, next){
    const authHeaders = req.headers['authorization'];
    if(!authHeaders){
        res.status(401).send('You are not authenticated');
    }
    const token = authHeaders.split(' ')[1];
    if(!token || token === ''){
        res.status(401).send('You are not authenticated');
    }
    let dataToken = await verifyToken(token, PRIVATE_KEY);
    if(dataToken.error){
        res.status(401).send('You are not authenticated');
    }
    req.user = dataToken.user;
    next();
}
app.listen(PORT, () => {
    console.log('servidor en el puerto 3000');
});