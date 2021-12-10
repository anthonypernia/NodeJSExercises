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
import Faker from 'faker';


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
        
        await ProductsService.insertProducts(data);
        io.emit('products_all', {"update":"yes"});
    });

    socket.on('send_msg', async (message)=>{

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


app.get('/products-test', (req, res, next) => {

    let products : any[]  = []
    for(let i = 0; i < 5; i++){
        products.push({
            id: Faker.random.uuid(), 
            timestamp: Faker.date.recent(),
            name: Faker.commerce.productName(),
            description: Faker.lorem.sentence(),
            code: Faker.random.alphaNumeric(10),
            photo: Faker.image.imageUrl(),
            price: parseInt(Faker.commerce.price()),
            stock: Faker.random.number(100),
        })
    }
    res.json(products);
});

serverRouter(app);