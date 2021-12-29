const path = require('path');
const redis = require('../../../config/db/RedisDB');
let default_session_expire = 10;

class UserService {


    async getUserFromDB(key) {
        let result = await redis.get( key );
        return result;
    }

    async addUserToDB(key, data) {
        let result = await redis.set( key, data );
        return result;
    }

    async addUserToDBWithExpiration(key, data, expire) {
        let result = await redis.setexp( key, expire, data );
        return result;
    }

    
    async  getUser(key) {
        return await this.getUserFromDB(key);
    }

    async addUser(key, data) {
        return await this.addUserToDB(key, data);
    }

    async addUserWithExpiration(key, data, expire) {
        return await this.addUserToDBWithExpiration(key, data, expire);
    }

    async updateUser(key) {

    }

    async deleteUser(key) {

    }
}

module.exports = new UserService();

