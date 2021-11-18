
const { config } = require('./config')
const express = require('express');
const app = express();
const PORT = config.port || 3000;
const serverRouter = require('./routes/');
const handlebars = require('express-handlebars');
const  path  = require('path');
const { Server: HttpServer } = require('http');
let {Server: IOServer} = require('socket.io');
let httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const fs = require('fs');
const file = "messages.txt"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'public'));
app.use(express.static('public'));

let products = [
    {
        id: 1,
        title: 'Apple',
        price: 1000,
        link: 'https://i5.walmartimages.com/asr/f46d4fa7-6108-4450-a610-cc95a1ca28c5_3.38c2c5b2f003a0aafa618f3b4dc3cbbd.jpeg',
    },
    {
        id: 2,
        title: 'Orange',
        price: 2000,
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8MFerjCnYQolq5Vy7TiD-DWt0Q6NDbeRFVFwyRVDfBC2Xcvey7dhx-q1pbqRr0bPYAs4&usqp=CAU',
    }

]

let messages = [];

io.on('connection', (socket)=>{
    console.log(`a user connected ${socket.id}`);
    socket.emit('init',{messages, products});

    socket.on('create_products', (data)=>{
        products.push(data);
        io.sockets.emit('products_all',products);
    });

    socket.on('send_msg', (data)=>{
        data.id = messages.length + 1;
        data.user_id = socket.id;
        messages.push(data);
        io.sockets.emit('msg_all',messages);
        saveFileAsync(file, JSON.stringify(messages));
    });

})


app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
}
);

httpServer.listen(PORT, ( err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is listening on port ${PORT}`);
    }
});

    // ////HANDLEBARS
app.engine('hbs',handlebars({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: path.join(__dirname, 'public')
}));

async function saveFileAsync(file, dataToWrite) {
    try{
        await fs.promises.writeFile('./messages.txt', dataToWrite);
        console.log('file saved');
    }
    catch(err){
        console.log(err);
    }
}

serverRouter(app);