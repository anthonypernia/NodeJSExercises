
const cors = require('cors');
const express = require('express');
const app = express();
const redis = require('redis');
const PORT = process.env.PORT || 3000;
const redisClient = redis.createClient({
    host: "192.168.0.16",
    port: 6379,
    retry_strategy: () => 1000,
  });


(async () => {
  redisClient.on('connect', () => {
    console.log('Redis client connected');
  });
  redisClient.on('error', (err) => {
    console.log('Redis client error: ' + err);
  });
}
)();

( async() => {
    redisClient.connect();
})();



app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));





app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
}
);

app.get('/name?', (req, res) => {
  redisClient.set('name', 'John Doe', 'EX', 10);
  redisClient.expire('name', 10);
  res.send('Hello World!');
});

app.get('/exist?', (req, res) => {
  redisClient.exists('name', (err, reply) => {
    if (err) {
      console.log(err);
    }
    res.send(reply.toString());
  }
  );
});