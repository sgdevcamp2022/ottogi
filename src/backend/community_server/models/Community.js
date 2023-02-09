const db = require('../db/index');
const category = require('./Category')

const findCommunityId = (communityName)=>{
    let communityId = [];
    let findsql = `SELECT id FROM list WHERE name = ${db.escape(communityName)}`;

    return new Promise((resolve, reject) => {
        db.query(findsql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                for (let data of res) {
                    communityId.push(data.id);
                };
                resolve(communityId);
            }
        })
    })
}

const findCommunityList = (communityId)=>{
    let nameList = [];
    let findsql = `SELECT JSON_OBJECT ('id', id, 'name', name, 'img', img) FROM list WHERE id = ${db.escape(communityId)}`;

    return new Promise((resolve, reject) => {
        db.query(findsql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                for (let data of res) {
                    console.log()
                    nameList.push(Object.values(data));
                };
                resolve(nameList);
            }
        })
    })
}

const insertMember =  (communityId, userId) => {
    let sql = `INSERT INTO member(user_id, role, community_id) VALUES(${db.escape(userId)}, 1, ${db.escape(communityId)});`;
    db.query(sql, (err, res) => {
        if (err) 
            console.log(err);
        else
            publicCategory(communityId);
            console.log(`멤버 추가 성공`);
        }
    );
}

const publicCategory =  async(communityId) => {
    let sql = `INSERT INTO category(community_id, name) VALUES(${db.escape(communityId)}, '음성 채널');`;
    let sql2 = `INSERT INTO category(community_id, name) VALUES(${db.escape(communityId)}, '채팅 채널');`;
    
    db.query(sql, async(err, res) => {
        if (err)
            console.log(err);
        else{
            const categoryId = await findCategoryId(`${communityId}`);
            console.log(categoryId);
            for(let i of categoryId){
                publicChannel(i, 1);
            }
        }
    });
    db.query(sql2, async(err, res) => {
        if (err)
            console.log(err);
        else{
            const categoryId = await findCategoryId(`${communityId}`);
            console.log(categoryId);
            for(let i of categoryId){
                publicChannel(i, 2);
            }
        }
    });
}

const findCategoryId = (communityId)=>{
    let categoryId = [];
    let findsql = `SELECT id FROM category WHERE community_id = ${communityId};`;
    
    return new Promise((resolve, reject) => {
        db.query(findsql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                for (let data of res) {
                    categoryId.push(data.id);
                };
                resolve(categoryId);
            }
        })
    })
}

const publicChannel = (categoryId, type)=>{
    let sql = `INSERT INTO channel(category_id, name, type) VALUES(${db.escape(categoryId)}, '일반', ${type});`;
    db.query(sql,(err, res)=>{
        if(err) console.log(err);
        else console.log(`최종 성공`);
    })
}

const getCommunityId = (userId)=>{
    let communityList = [];
    let findsql = `SELECT community_id FROM member WHERE user_id = ${db.escape(userId)}`;
    return new Promise((resolve, reject) => {
        db.query(findsql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                for (let data of res) {
                    communityList.push(data.community_id);
                };
                resolve(communityList);
            }
        })
    })
}

module.exports = {
    //커뮤니티 생성 디비 명령어? (모델)
    create: (communityName, img, userId) => {
        let sql = `INSERT INTO list(name, img) VALUES('${communityName}', ${img});`;
        db.query(sql, async (err, res) => {
            if (err) {
                console.log(err);
            } else {
                const communityId = await findCommunityId(communityName);
                await insertMember(communityId, userId);
                console.log(`생성 성공`);
            }
        });
    },

    //커뮤니티 참가 명령어
    join: (communityId, uesrId, profile) => {
        let name = [];
        let sql = `INSERT INTO member (community_id, user_id, profile) VALUES (${db.escape(communityId)}, ${db.escape(uesrId)}, ${profile})`;
        db.query(sql);
        let findsql = `SELECT name FROM list WHERE id = ${db.escape(communityId)}`;
        return new Promise((resolve, reject) => {
            db.query(findsql, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    for (let data of res) {
                        name.push(data.name);
                    };
                    resolve(name);
                }
            })
        })
    },

    //커뮤니티 정보 변경 명령어
    rename: (communityName, communityId) => {
        let sql = `UPDATE list SET name = ${db.escape(communityName)} WHERE id = ${db.escape(communityId)}`;
        return db.query(sql);
    },

    //커뮤니티 삭제 명령
    delete: (communityId) => {
        let sql = `DELETE FROM list WHERE id = ${communityId}`;
        let sql2 = `DELETE FROM member WHERE community_id = ${communityId}`;
        db.query(sql);
        db.query(sql2);
        const response = findCategoryId(communityId);
        response.then(result => {
            for(let data of result){
                category.dependenciesDelete(communityId, data);
            }
        }).catch(err => console.log(`의존성 카테고리id 값 못받아옴`));
    },

    profile : (communityId, userId, profile) => {
        let sql = `UPDATE member SET profile = ${db.escape(profile)} WHERE id = ${db.escape(communityId)} AND user_id = ${db.escape(userId)}`;
        return db.query(sql);
    },

    load: async(userId)=>{
        let list = [];
        const response = await getCommunityId(userId);
        for(let data of response){
            list.push(await findCommunityList(data));
        }
        return list;
    },
};