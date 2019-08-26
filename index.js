const Redis = require('ioredis');

const redisOptions = process.env.REDIS_SENTINEL_HOST ? {
  sentinels: [
    {
      host: process.env.REDIS_SENTINEL_HOST,
      port: process.env.REDIS_SENTINEL_PORT || 26379,
    },
  ],
  name: process.env.REDIS_SENTINEL_MASTER || 'mymaster',
} : {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
};

const redisSub = new Redis(redisOptions);
const redisPub = new Redis(redisOptions);

redisSub.subscribe('news', 'music', (err, count) => {
  // Now we are subscribed to both the 'news' and 'music' channels.
  // `count` represents the number of channels we are currently subscribed to.
  if (err) { console.error(Date.now(), err); }
  console.log(`Subscribed to ${count} channels`);
});

redisSub.on('message', (channel, message) => {
  // Receive message Hello world! from channel news
  // Receive message Hello again! from channel music
  console.log(Date.now(), `Receive message ${message} from channel ${channel}`);
});

// // There's also an event called 'messageBuffer', which is the same as 'message' except
// // it returns buffers instead of strings.
// redisSub.on('messageBuffer', (channel, message) => {
//   // Both `channel` and `message` are buffers.
// });

setInterval(() => {
  redisPub.publish('news', 'Hello world!');
  redisPub.publish('music', 'Hello again!');
}, 1000);
