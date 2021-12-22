import redis from 'redis';
import { db } from '../index'
class RedisConnection {
  private static redisClient;

    static connect() {
        if (!RedisConnection.redisClient) {
            RedisConnection.redisClient = redis.createClient({
                host: db.redis_host,
                port: db.redis_port
            });
        }
        return RedisConnection.redisClient;
    }


}