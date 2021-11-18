import { ChatService } from '../service/chatService'

class ChatController{

    static async getChats(req, res, next){
        let result = await ChatService.getChats();
        res.status(200).json(result);
    }

    static async createChat(req, res, next){
        let result = await ChatService.createChat();
        res.status(200).json(result);
    }

    static async insertMessage(req, res, next){
        let data = req.body;
        let result = await ChatService.insertMessage(data);
        res.status(200).json(result);
    }

}

export { ChatController };