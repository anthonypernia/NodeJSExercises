const redis = require('redis');
const client = redis.createClient();
const redisClient = redis.createClient({
    host: "192.168.0.16",
    port: 6379,
    retry_strategy: () => 1000,
  });
  const sub = redisClient.duplicate();

const express = require('express');
const app = express();
