import { Database } from '../../../../config/db'


class ChatService{

    private static sqliteDB =  Database.getSqlite3()

    static async getChats(){
        try{
            let res = await ChatService.sqliteDB.from('chats')
            return res;
        }catch(err){
            return err;
        }
    }

    static async createChat(){
        try{
            await ChatService.sqliteDB.schema.hasTable('chats').then( async function(exists) {
                if (!exists) {
                     await ChatService.sqliteDB.schema.createTable('chats', function (table) {
                        table.increments('id').primary();
                        table.string('timestamp');
                        table.string('message');
                        table.string('sender');
                    }).then(function () {
                        console.log('Created Table');
                    }).catch(function (err) {
                        console.error('Unable to create table', err);
                    });
                }
            });
        }catch(err){
            return err;
        }
    }

    static async insertMessage(data){
        await ChatService.createChat();
        try{
            data.timestamp = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
            try{
                let resp = await ChatService.sqliteDB.insert(data).into('chats')
                return resp;
            }catch(err){
                return err;
            }
        }catch(err){
            return err;
        }
    }

}

export { ChatService };