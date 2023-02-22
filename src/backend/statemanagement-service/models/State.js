const e = require('express');
const db = require('../db/index');

const getState = (userId)=>{
    let list = [];
    let findsql = `SELECT status FROM state WHERE user_id = ${db.escape(userId)}`;

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

const getChannel = (userId)=>{
    let list = [];
    let findsql = `SELECT location FROM state WHERE user_id = ${db.escape(userId)}`;

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
        console.log(`로그인 상태 요청 [IN] userId : ${userId}`)
        if(await getmem(userId)){
            let sql = `UPDATE state SET status = ${db.escape(status)} WHERE user_id = ${db.escape(userId)}`;
            db.query(sql);
            console.log(`로그인 상태 요청 (업뎃) [DONE] userId : ${userId}`)
        } else{
            let sql = `INSERT INTO state(user_id, location, status) VALUES(${db.escape(userId)}, ${db.escape(channelId)}, ${db.escape(status)});`;
            db.query(sql);
            console.log(`로그인 상태 요청 (신규) [DONE] userId : ${userId}`)
        }
    },

    changeLogout: async(channelId, userId, status) => {
        if(await getmem(userId)){
            console.log(`로그아웃 상태 요청 [IN] userId : ${userId}`)
            let sql = `UPDATE state SET location = '', session_id ='' , status = ${db.escape(status)} WHERE user_id = ${db.escape(userId)}`;
            db.query(sql);
            console.log(`로그아웃 상태 요청 [IN] userId : ${userId}`)
        } 
    },

    load: async(userId)=>{
        const response = await getState(userId);
        return response;
    },

    loadChannel: async(userId)=>{
        const response = await getChannel(userId);
        return response;
    },

    con: async(channelId, userId, sessionId)=>{
        console.log(`채팅 연결 상태 요청 [IN] userId : ${userId}, channelId : ${channelId}, sessionId : ${sessionId}`)

        let sql = `UPDATE state SET location = ${db.escape(channelId)}, session_id = ${db.escape(sessionId)} WHERE user_id = ${db.escape(userId)}`;
        db.query(sql, (err,res)=>{
            if(err) console.log('실패');
            else console.log(`채팅 연결 상태 요청 [DONE] userId : ${userId}, channelId : ${channelId}, sessionId : ${sessionId}`)
        
        });
    },


    discon: async(sessionId)=>{
        console.log(`채팅 연결 해제 상태 요청 [IN] sessionId : ${sessionId}`)
        let sql = `UPDATE state SET location = '', session_id ='' WHERE session_id = ${db.escape(sessionId)}`;
        db.query(sql, (err,res)=>{
            if(err) console.log('실패');
            else console.log(`채팅 연결 해제 상태 요청 [DONE] sessionId : ${sessionId}`)
    
        });
    },
};