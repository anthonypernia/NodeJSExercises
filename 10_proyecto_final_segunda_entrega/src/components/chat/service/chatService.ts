import { Database } from '../../../../config/database'


class ChatService{

    private static database =  Database.getDB();

    private static async getChatsFromDB(){
        return await this.database.getAllData('chats')
    }

    private static async insertMessageToDB(data){
        return await this.database.insertData('chats', data)
    }

    private static async createTable(){
        await this.database.createTable('chats', function (table) {
            table.increments('id').primary();
            table.string('timestamp');
            table.string('message');
            table.string('sender');
        });
    }

    static async getChats(){
        return await this.getChatsFromDB()
    }

    static async createChat(){
        console.log('creating chat serv')
        await this.createTable();
    }

    static async insertMessage(data){
        data.timestamp = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
        return await this.insertMessageToDB(data)
    }

}

export { ChatService };