const MongoDB = require('../../../config/db/MongoDB');

class ChatService{

    database =  MongoDB

    async getChatsFromDB(){
        return await this.database.getAll('chats')
    }

    async insertMessageToDB(data){
        return await this.database.insert('chats', data)
    }

    async deleteByIdDB(id){
        return await this.database.delete('chats', id)
    }

    async deleteById(id){
        return await this.deleteByIdDB(id)
    }

    async getChats(){
        let chats =  await this.getChatsFromDB()
        return chats
        // const authorSchema = new schema.Entity('author')
        // const messageSchema = new schema.Entity('message', {
        //     author: authorSchema
        // }, { idAttribute: '_id' })
        // let normalizedChats = normalize(chats, [messageSchema])
        // return normalizedChats
    }

    async insertMessage(data){
        data.timestamp = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
        return await this.insertMessageToDB(data)
    }
}

module.exports = new ChatService();