const express = require("express");
const cors = require('cors')
const app = express();
const routes = require('./routes/routes')
const bodyParser = require('body-parser');

// const eurekaHelper = require('./eureka-helper');
// eurekaHelper.registerWithEureka('community_server', PORT);

app.use(bodyParser.json());

app.use(cors());

app.use("/", routes);

app.listen(3000, () => console.log('상태관리 서버가 실행됩니다. http://localhost:3000'));

//라우트 로그 남기기 추가 예정