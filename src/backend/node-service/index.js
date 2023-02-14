const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const eurekaHelper = require('./eureka-helper');

app.listen(PORT, () => {
  console.log("node-service on 3000");
})

app.get('/nodeTest/hello', (req, res) => {
 res.json("node-service test without auth")
})

app.get('/nodeAuth/hello', (req, res) =>{
  res.send("jwt auth success!")
})
eurekaHelper.registerWithEureka('node-service', PORT);