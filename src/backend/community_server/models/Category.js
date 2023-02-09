const db = require('../db/index');
const channel = require('./Channel');

const findChannelId = (categoryId)=>{
  let channelId = [];
  let findsql = `SELECT id FROM channel WHERE category_id = ${categoryId};`;
  
  return new Promise((resolve, reject) => {
      db.query(findsql, (err, res) => {
          if (err) {
              reject(err);
          } else {
              for (let data of res) {
                channelId.push(data.id);
              };
              resolve(channelId);
          }
      })
  })
}

const getCategory = (communityId)=>{
  let categoryList = [];
  let findsql = `SELECT JSON_OBJECT ('id', id, 'name', name) FROM category WHERE community_id = ${db.escape(communityId)}`;

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
        channel.dependenciesDelete(categoryId)
    },

    //의존성 삭제
    dependenciesDelete: (communityId, categoryId) => {
      let sql = `DELETE FROM category WHERE community_id = ${communityId}`;
      db.query(sql);
      const response = findChannelId(categoryId);
      channel.dependenciesDelete(categoryId);
      response.then(result => {
        for(let data of result){
          channel.delete(data);
        }
    }).catch(err => console.log(`의존성 채널id 받아오기 실패`));
    },

    load: async(communityId)=>{
      let list = [];
      const response = await getCategory(communityId);
      for(let data of response){
          list.push(data);
      }
      return list;
  },
};