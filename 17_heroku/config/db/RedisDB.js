const redis = require('redis');
const { db } = require('../index');




class Redis {
    constructor() {
        this.client = null;
        this.connect();
        this.client.connect();
    }

    connect() {
        this.client = redis.createClient({
            host: db.redis_host,
            port: db.redis_port
        });
        this.client.on('connect', () => {
            // console.log('Redis connected');
        });
        this.client.on('error', err => {
            // console.log('Redis error: ' + err);
        });
    }

    async get(key) {
        return await this.client.get(key);
    }

    async set(key, value) {
        return await this.client.set(key, value);
    }

    async setexp(key, expire, value ) {
        let result = await this.client.set(key, value)
        await this.client.expire(key, expire);
        return result;

    }

    async getAllKeys() {
        return await this.client.keys('*');
    }

    async del(key) {
        return await this.client.del(key);
    }
}

module.exports = new Redis();