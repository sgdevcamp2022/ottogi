require('dotenv').config();

const config = {
    development: {
        host: process.env.host,
        port: process.env.port,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
}

module.exports = config;