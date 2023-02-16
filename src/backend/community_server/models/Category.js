const db = require('../db/index');
const channel = require('./Channel');

const getCategoryId = (communityId)=>{
  let categoryId = [];
  let findsql = `SELECT id FROM category WHERE community_id = ${db.escape(communityId)}`;

  return new Promise((resolve, reject) => {
      db.query(findsql, (err, res) => {
          if (err) {
              reject(err);
          } else {
              for (let data of res) {
                categoryId.push(Object.values(data));
              };
              resolve(categoryId);
          }
      })
  })
}

const getCategory = (communityId)=>{
  let categoryList = [];
  let findsql = `SELECT JSON_OBJECT ('categoy_id', id, 'name', name) FROM category WHERE community_id = ${db.escape(communityId)}`;

  return new Promise((resolve, reject) => {
      db.query(findsql, (err, res) => {
          if (err) {
              reject(err);
          } else {
              for (let data of res) {
                categoryList.push(Object.values(data));
              };
              resolve(categoryList);
          }
      })
  })
}

module.exports = {
    //카테고리 생성 디비 명령어? (권한 x)
    create: (categoryName, communityId) => {
        let sql = `INSERT INTO category(name, community_id) VALUES('${categoryName}', ${communityId});`;
        db.query(sql, async(err,res)=>{
          if(err) console.log(err);
          else {
            console.log(`카테고리 생성 성공`);
          }
        });
    },

    //카테고리 정보 변경 명령어
    rename: (categoryName, communityId) => {
        let sql = `UPDATE category SET name = ${db.escape(categoryName)} WHERE id = ${db.escape(communityId)}`;
        return db.query(sql);
    },

    //카테고리 삭제 명령
    delete: (categoryId) => {
        let sql = `DELETE FROM category WHERE id = ${categoryId}`;
        db.query(sql);
    },
    //카테고리, 채널 조회
    load: async(communityId)=>{
      let list = [];
      let channelList = [];
      let categorryList = [];

      const response = await getCategory(communityId);
      for(let data of response){
          categorryList.push(data);
      }
      const getChannel = await getCategoryId(communityId);
      for(let data of getChannel){
        channelList.push(await channel.load(data));
      }

      list.push(`카테고리 : ${categorryList}`,`채널 : ${channelList}`);
      return list;
  },
};