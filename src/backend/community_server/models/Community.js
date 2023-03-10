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
            console.log(`?????? ?????? ??????`);
        }
    );
}

const inMember =  (communityId, userId, profile) => {
    let sql = `INSERT INTO community_member(user_id, role, community_id, profile) VALUES(${db.escape(userId)}, 1, ${db.escape(communityId)}, '${profile}');`;
    db.query(sql, (err, res) => {
        if (err) 
            console.log(err);
        else
            console.log(`?????? ?????? ??????`);
        }
    );
}

const publicCategory =  async(communityId) => {
    let sql = `INSERT INTO category(community_id, name) VALUES(${db.escape(communityId)}, '?????? ??????');`;
    let sql2 = `INSERT INTO category(community_id, name) VALUES(${db.escape(communityId)}, '?????? ??????');`;
    
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
    let sql = `INSERT INTO channel(category_id, name, type) VALUES(${db.escape(categoryId)}, '??????', ${type});`;
    db.query(sql,(err, res)=>{
        if(err) console.log(err);
        else console.log(`?????? ?????? ??????`);
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

const getmem = (userId, communityId)=>{
    let findsql = `SELECT user_id FROM community_member WHERE user_id = ${db.escape(userId)} AND community_id = ${db.escape(communityId)}`;

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

const checkprofile = (userId, communityId)=>{
    let findsql = `SELECT profile FROM community_member WHERE user_id = ${db.escape(userId)} AND community_id = ${db.escape(communityId)}`;

    return new Promise((resolve, reject) => {
        db.query(findsql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if(res.length>0) resolve(false);
                else resolve(true);
            }
        })
    })
}

module.exports = {
    //???????????? ?????? ?????? ?????????? (??????)
    create: (communityName, img, userId, profile) => {
        
        let sql = `INSERT INTO community(name, img) VALUES('${communityName}', '${img}');`;
        db.query(sql, async (err, res) => {
            if (err) {
                console.log(err);
            } else {
                const communityId = await findCommunityId(communityName);
                await insertMember(communityId, userId, profile);
                console.log(`???????????? ?????? ??????`);
            }   
        });
    },

    //???????????? ?????? ?????????
    join: async(communityId, userId, profile) => {
        await inMember(communityId, userId, profile);
        let name = [];
        let getProfile = JSON.stringify(profile);
        //????????? ?????? ??????????????????
        if(await getmem(userId, communityId) && await checkprofile(userId, communityId)){
            let sql = `UPDATE community_member SET profile = '${getProfile}' WHERE community_id = '${communityId}' AND user_id = '${userId}'`;
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
        }
    },

    //???????????? ?????? ?????? ?????????
    rename: (communityName, communityId) => {
        let sql = `UPDATE community SET name = ${db.escape(communityName)} WHERE id = ${db.escape(communityId)}`;
        return db.query(sql);
    },

    //???????????? ?????? ??????
    delete: (communityId) => {
        let sql = `DELETE FROM community WHERE id = ${communityId}`;
        db.query(sql);
    },

    //????????? ????????????
    profile : (communityId, userId, profile) => {
        let getProfile = JSON.stringify(profile);
        let sql = `UPDATE community_member SET profile = '${getProfile}' WHERE community_id = '${communityId}' AND user_id = '${userId}'`;
        
        return new Promise((resolve, reject) => {
            db.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`succes`);
                }
            })
        })
    },

    //???????????? ??????
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

    //???????????? ?????? ??????
    checkMember: async(communityId)=>{
        const response = await findMember(communityId);
        return response;
    },

    //???????????? ?????????
    out: (userId, communityId) => {
        let sql = `DELETE FROM community_member WHERE user_id = ${userId} AND community_id = ${communityId}`;
        db.query(sql);
    }
};