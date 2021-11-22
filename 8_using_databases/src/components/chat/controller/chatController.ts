import { ChatService } from '../service/chatService'

class ChatController{

    static async getChats(req, res, next){
        try{
            let result = await ChatService.getChats();
            res.status(200).json(result);
        }catch(err){
            res.status(500).json({error: err});
        }
        
    }

    static async createChat(req, res, next){
        try{
            let result = await ChatService.createChat();
            res.status(200).json(result);
        }catch(err){
            res.status(500).json({error: err});
        }
    }

    static async insertMessage(req, res, next){
        try{
            let data = req.body;
            let result = await ChatService.insertMessage(data);
            res.status(200).json(result);
        }catch(err){
            res.status(500).json({error: err});
        }
    }

}

export { ChatController };