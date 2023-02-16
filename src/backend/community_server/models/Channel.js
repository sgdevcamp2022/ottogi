const db = require('../db/index');

const getChannel = (categoryId)=>{
  let channelList = [];
  let findsql = `SELECT JSON_OBJECT ('channel_id', id, 'name', name, 'type', type) FROM channel WHERE category_id = ${db.escape(categoryId)}`;

  return new Promise((resolve, reject) => {
      db.query(findsql, (err, res) => {
          if (err) {
              reject(err);
          } else {
              for (let data of res) {
                channelList.push(Object.values(data));
              };
              resolve(channelList);
          }
      })
  })
}

module.exports = {
    //채널 생성 디비 명령어? (권한 x)
    create: (channelName, categoryId) => {
        let sql = `INSERT INTO channel(name, community_id) VALUES('${channelName}', ${categoryId});`;
        db.query(sql, async(err,res)=>{
          if(err) console.log(err);
          else {
            console.log(`채널 생성 성공`);
          }
        });
    },

    join: (channelId, userId) => {
      let sql = `INSERT INTO channelmember (channelId, user_id) VALUES (${db.escape(channelId)}, ${db.escape(userId)})`;
      db.query(sql)
  },

    //채널 정보 변경 명령어
    rename: (channelName, categoryId) => {
        let sql = `UPDATE channel SET name = ${db.escape(channelName)} WHERE id = ${db.escape(categoryId)}`;
        return db.query(sql);
    },

    //채널 삭제 명령
    delete: (channelId) => {
        let sql = `DELETE FROM channel WHERE id = ${channelId}`;
        db.query(sql);
    },

  load: async(categoryId)=>{
    let list = [];
    const response = await getChannel(categoryId);
    for(let data of response){
        list.push(data);
    }
    return list;
},
};