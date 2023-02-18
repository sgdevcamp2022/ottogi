const db = require('../db/index');

const findCommunityId = (communityName)=>{
    let communityId = [];
    let findsql = `SELECT id FROM community WHERE name = ${db.escape(communityName)}`;

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
    let findsql = `SELECT JSON_OBJECT ('community_id', id, 'name', name, 'img', img) FROM community WHERE id = ${db.escape(communityId)}`;

    return new Promise((resolve, reject) => {
        db.query(findsql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                for (let data of res) {
                    nameList.push(Object.values(data));
                };
                resolve(nameList);
            }
        })
    })
}

const findMember = (communityId)=>{
    let memberList = [];
    let findsql = `SELECT JSON_OBJECT ('user_id', user_id, 'role', role, 'profile', profile) FROM community_member WHERE community_id = ${db.escape(communityId)}`;

    return new Promise((resolve, reject) => {
        db.query(findsql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                for (let data of res) {
                    memberList.push(Object.values(data));
                };
                resolve(memberList.flat());
            }
        })
    })
}

const insertMember =  (communityId, userId, profile) => {
    let sql = `INSERT INTO community_member(user_id, role, community_id, profile) VALUES(${db.escape(userId)}, 1, ${db.escape(communityId)}, '${profile}');`;
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
    let findsql = `SELECT community_id FROM community_member WHERE user_id = ${db.escape(userId)}`;
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
    create: (communityName, img, userId, profile) => {
        
        let sql = `INSERT INTO community(name, img) VALUES('${communityName}', '${img}');`;
        db.query(sql, async (err, res) => {
            if (err) {
                console.log(err);
            } else {
                const communityId = await findCommunityId(communityName);
                await insertMember(communityId, userId, profile);
                console.log(`생성 성공`);
            }   
        });
    },

    //커뮤니티 참가 명령어
    join: (communityId, uesrId, profile) => {
        let name = [];
        let getProfile = JSON.stringify(profile);

        let sql = `INSERT INTO community_member (community_id, user_id, profile) VALUES (${db.escape(communityId)}, ${db.escape(uesrId)}, '${getProfile}')`;
        db.query(sql);
        let findsql = `SELECT name FROM community WHERE id = ${db.escape(communityId)}`;
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
        let sql = `UPDATE community SET name = ${db.escape(communityName)} WHERE id = ${db.escape(communityId)}`;
        return db.query(sql);
    },

    //커뮤니티 삭제 명령
    delete: (communityId) => {
        let sql = `DELETE FROM community WHERE id = ${communityId}`;
        db.query(sql);
    },

    //프로필 업데이트
    profile : (communityId, userId, profile) => {
        let getProfile = JSON.stringify(profile);
        let sql = `UPDATE community_member SET profile = '${getProfile}' WHERE community_id = '${communityId}' AND user_id = '${userId}'`;
        
        return new Promise((resolve, reject) => {
            db.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`성공: ${res}`);
                    resolve(`succes`);
                }
            })
        })
    },

    //커뮤니티 조회
    load: async(userId)=>{
        let list = [];
        let communityList = [];

        const response = await getCommunityId(userId);
        for(let data of response){
            communityList.push(await findCommunityList(data));
        }
        list.push(`${communityList}`);
        return list;
    },

    //커뮤니티 멤버 조회
    checkMember: async(communityId)=>{
        const response = await findMember(communityId);
        return response;
    },

};