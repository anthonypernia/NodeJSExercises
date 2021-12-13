import { Database } from "../../config/database";
import { CartController } from "../components/cart/controller/cartController";
import { Cart } from "../components/cart/model/Cart";
import { CartService } from "../components/cart/service/cartService";
import { ChatController } from "../components/chat/controller/chatController";
import { ChatService } from "../components/chat/service/chatService";
import { ProductsController } from "../components/products/controller/productsController";
import { ProductsService } from "../components/products/service/productsService";
import util from 'util';


    function validateSecurity(req, res, next) {

        if (req.method != 'GET' && !req.headers.authorization && req.url.includes('/products/')) {
            return res.status(401).send({ error: 'You must be authorized to make this request.'});
        }
        next();
    }

    async function createSchemas(req, res, next) {
        // console.log('Creating schemas...');
        // Database.connect()
        // ProductsService.createSchema();
        // CartService.createSchema();
        // ChatService.createChat();   
        next();
    }


    function print(obj){
        console.log(util.inspect(obj, false, 12, true));
    }

    export { validateSecurity, createSchemas, print };