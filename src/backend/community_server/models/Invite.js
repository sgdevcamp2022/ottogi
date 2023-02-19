const db = require('../db/index');

module.exports = {
  invite: (communityId, userId, shortUrl) =>{
    let sql = `INSERT INTO url(user_id, community_id, shorturl) VALUES(${db.escape(userId)},${db.escape(communityId)}, ${db.escape(shortUrl)})`
    db.query(sql);
  },

  geturl: (shortUrl)=>{
    let url = [];
    let findsql = `SELECT community_id FROM url WHERE shorturl = ${db.escape(shortUrl)}`;

    return new Promise((resolve, reject) => {
      db.query(findsql, (err, res) => {
          if (err) {
              reject(err);
          } else {
            for(let data of res){
              url.push(Object.values(data));
            }
            resolve(url.flat());
          }
      })
  })
  }
} 