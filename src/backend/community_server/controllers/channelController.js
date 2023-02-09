const channel = require('../models/Channel')
const { isAdmin } = require('../utils/ulits');



module.exports = {
    //채널 생성 (권한 제외)
    channelCreate: (req, res) => {
        const {channelName, categoryId} = req.query;
        if (!categoryName) {
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            channel.create(channelName, categoryId)
            res.send('create success');
        }
    },

    //채널 정보 변경(이름)
    channelRename: async(req, res) => {
        const {channelName, categoryId, userId} = req.query;
        if (!channelName || !categoryId || !userId) {
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            if(await isAdmin(communityId, userId)){
                const response = channel.rename(channelName, categoryId);
                res
                    .status(200)
                    .send(`community ID : ${categoryId} Rename to ${channelName}`);
            }
        }
    },

    //채널 삭제
    channelDelete: (req, res) => {
        const {channelId} = req.query;
        if (!channelId) {
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            const response = channel.delete(channelId);
            res
                .status(200)
                .send(`community ID : ${channelId} deleted`);
        }
    },
    //채널 참가
    channelJoin: (req, res)=>{
        const {channelId, userId} = req.query;
        if(!channelId || !userId){
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            channel.join(channelId, userId);
            res
                .status(200)
                .send(`channel ID : ${channelId} joined`);
        }
    },

    loadList: async(req, res)=>{
        const{categoryId} = req.query;
        if(!categoryId){
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            const response = await channel.load(categoryId);
            res.status(200).send(`Channel List: ${response}`);
        }
    }
};