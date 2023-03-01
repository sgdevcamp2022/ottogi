const db = require('../db/index');

module.exports = {
  invite: (communityId, userId, shortUrl) =>{
    console.log(`초대장 요청 [IN] userId : ${userId}, communityId : ${communityId}`)
    let sql = `INSERT INTO url(user_id, community_id, shorturl) VALUES(${db.escape(userId)},${db.escape(communityId)}, ${db.escape(shortUrl)})`
    db.query(sql);
    console.log(`초대장 요청 [DONE] userId : ${userId}, communityId : ${communityId}`)

  },

  geturl: (shortUrl)=>{
    console.log(`초대장으로 커뮤니티 가입 요청(geturl) [IN] shortUrl : ${shortUrl}`)
    let url = [];
    let findsql = `SELECT community_id FROM url WHERE shorturl = ${db.escape(shortUrl)}`;
    let deletesql = `DELETE FROM url WHERE shorturl = ${db.escape(shortUrl)}`;

    return new Promise((resolve, reject) => {
      db.query(findsql, (err, res) => {
          if (err) {
              reject(err);
          } else {
            for(let data of res){
              url.push(Object.values(data));
            }
            resolve(url.flat());
            db.query(deletesql);
            console.log(`초대장 DB에서 삭제`)
            console.log(`초대장으로 커뮤니티 가입 요청(geturl) [DONE] shortUrl : ${shortUrl}`)
          }
      })
  })
  }
} 