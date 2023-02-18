const db = require('../db/index');

const getState = (userId)=>{
    let list = [];
    let findsql = `SELECT JSON_OBJECT ('idx', id, 'user_id', user_id, 'location', location, 'status', status) FROM state WHERE id = ${db.escape(userId)}`;

    return new Promise((resolve, reject) => {
        db.query(findsql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                for (let data of res) {
                    list.push(Object.values(data));
                };
                resolve(list.flat());
            }
        })
    })
}

const getmem = (userId)=>{
    let findsql = `SELECT user_id FROM state WHERE user_id = ${db.escape(userId)}`;

    return new Promise((resolve, reject) => {
        db.query(findsql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if(res.length>0) resolve(true);
                else resolve(false);
            }
        })
    })
}

module.exports = {
    change: async(channelId, userId, status) => {
        if(await getmem(userId)){
            let sql = `UPDATE state SET status = ${db.escape(status)} WHERE user_id = ${db.escape(userId)}`;
            db.query(sql);
        } else{
            let sql = `INSERT INTO state(user_id, location, status) VALUES(${db.escape(userId)}, ${db.escape(channelId)}, ${db.escape(status)});`;
            db.query(sql);
        }
    },

    load: async(userId)=>{
        const response = await getState(userId);
        console.log(response);
        return response;
    },
};