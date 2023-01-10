//import  express and redis libraries

const express = require('express');
const redis = require('redis');

//new instance of express app and make a connection to redis client
const app = express();
const client = redis.createClient({
    // connect to redis container
    host: 'redis-server', 
    port: 6379
});

// initialise redis database
client.set('visits', 0);

//route handler, call this function when website is visted
app.get('/', (req, res) => {
    //get value in redis
  client.get('visits', (err, visits) => {
      //send resposne back to the user
    res.send('Number of visits is ' + visits);
    // update redis data
    client.set('visits', parseInt(visits) + 1);
  });
});

//set port 
app.listen(8081, () => {
  console.log('Listening on port 8081');
});
