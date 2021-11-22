import { Database } from '../../../../config/db'


class ChatService{

    private static sqliteDB =  Database.getSqlite3();

    private static async getChatsFromDB(){
        return await this.sqliteDB.select('*').from('products');
    }

    private static async insertMessageToDB(data){
        return await ChatService.sqliteDB.insert(data).into('chats')
    }

    private static async createTable(){
        try{
            let exists = await ChatService.sqliteDB.schema.hasTable('chats')
                if (!exists) {
                     await ChatService.sqliteDB.schema.createTable('chats', function (table) {
                        table.increments('id').primary();
                        table.string('timestamp');
                        table.string('message');
                        table.string('sender');
                    });
                }
        }catch(err){
            return err;
        }
    }

    static async getChats(){
        return await this.getChatsFromDB()
    }

    static async createChat(){
        await this.createTable();
    }

    static async insertMessage(data){
        data.timestamp = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
        return await this.insertMessageToDB(data)
    }

}

export { ChatService };