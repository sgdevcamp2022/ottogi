const express = require("express");
const cors = require('cors')
const app = express();
const routes = require('./routes/routes')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());

app.use("/", routes);

app.listen(3000, () => console.log('서버가 실행됩니다. http://localhost:3000'));

//라우트 로그 남기기 추가 예정