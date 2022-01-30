const chatService = require('../Service/');
const { loggerErr} = require('../../../utils/logger');

class ChatController{

    async getChats(req, res, next){
        try{
            let result = await chatService.getChats();
            res.status(200).json(result);
        }catch(err){
            loggerErr.error(err);
            res.status(500).json({error: err});
        }  
    }

    async deleteById(req, res, next){
        try{
            let result = await chatService.deleteById(req.params.id);
            res.status(200).json(result);
        }catch(err){
            loggerErr.error(err);
            res.status(500).json({error: err, controller:1});
        }
    }

    async insertMessage(req, res, next){
        try{
            let data = req.body;
            let result = await chatService.insertMessage(data);
            res.status(200).json(result);
        }catch(err){
            loggerErr.error(err);
            res.status(500).json({error: err});
        }
    }

}

module.exports = new ChatController();