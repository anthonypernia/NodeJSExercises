


class RelationalDatabase {
    static connection ;
    
    static getAllData(tableName: string) {
        return this.connection.select('*').from(tableName);
    }

    static getDataById(tableName: string, id: string) {
        return this.connection.select('*').from(tableName).where('id', id);
    }

    static getDataByIdList(tableName: string, idList: any[]) {
        return this.connection.select('*').from(tableName).whereIn('id', idList);
    }
    static insertData(tableName: string, data: any) {
        return this.connection.insert(data).into(tableName);
    }
    static updateData(tableName: string, id: string, data: any) {
        return this.connection.update(data).into(tableName).where('id', id);
    }
    static deleteData(tableName: string, condition: any) {
        return this.connection.delete().from(tableName).where(condition);
    }

    static createTable(tableName: string, schema) {
        return this.connection.schema.createTableIfNotExists(tableName, schema);
    }
}

export default RelationalDatabase;