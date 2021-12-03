import path from 'path';
import { serverRouter } from './routes';
import  express from "express";
import { config } from  '../config'
import cors from 'cors';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { ChatService } from './components/chat/service/chatService';
import { ProductsService } from './components/products/service/productsService';
import { createSchemas } from './utils/utils';

const app = express();

let server = new HttpServer(app);
let io = new IOServer(server);

const PORT = config.port;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'public'));
app.use(express.static('public'));



io.on('connection', (socket)=>{
    console.log(`a user connected ${socket.id}`);

    socket.on('add_product', async (data)=>{
        console.log(data);
        await ProductsService.insertProducts(data);
        io.emit('products_all', {"update":"yes"});
    });

    socket.on('send_msg', async (data)=>{
        let message = {
            message: data.msg,
            sender: data.mail,
        }
        await ChatService.insertMessage(message);
        io.emit('msg_all', {"update":"yes"});
    });

})


app.get('/', (req, res) => {
    res.send('Hi anthony!');
});

server.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
})


app.set('views', './public');
app.set('view engine', 'ejs');
app.get('/home', (req, res) => {
res.render('./index.ejs', {});

});

serverRouter(app);