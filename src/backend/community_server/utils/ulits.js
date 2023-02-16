const db = require('../db/index');

const isAdmin = (communityId, userId) => {
    let findsql = `SELECT role FROM community_member WHERE community_id = ${communityId} AND user_id = ${userId};`;
    return new Promise((resolve, reject) => {
        let result = [];
        db.query(findsql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                for (let data of res) {
                    result.push(data.role);
                };
                if(result == '1') resolve(true);
                else resolve(false);
            }
        })
    })
}

module.exports = {isAdmin};