const redis = require('redis');
class RedisConnection {
    public static  getConnection(){
        const client = redis.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        });
        client.on('connect', () => {
            console.log('Redis connection established');
        });
        client.on('error', (err) => {
            console.log('Redis connection error ' + err);
        });
        return client;
    }

    public static getData(key: string) {
        let data = this.getConnection().get(key);
        return data;
    }

    public static setData(key: string, value: string) {
        this.getConnection().set(key, value);
    }

    public static deleteData(key: string) {
        this.getConnection().del(key);
    }
}