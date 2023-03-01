require('dotenv').config();

const config = require('../confing/config');
const mysql = require('mysql');

const db = mysql.createConnection(
    config[process.env.NODE_ENV || 'development']
);

db.connect((err) => {
    if (err) {
        console.log('db 연결 에러');
        console.log(err);
    } else 
        console.log('db 연결 성공');
    }
)

module.exports = db;