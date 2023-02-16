const channel = require('../models/Channel')
const { isAdmin } = require('../utils/ulits');



module.exports = {
    //채널 생성 (권한 제외)
    channelCreate: (req, res) => {
        const {channelName, categoryId, type} = req.body;
        if (!channelName) {
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            channel.create(channelName, categoryId, type)
            res.send('create success');
        }
    },

    //채널 정보 변경(이름)
    channelRename: async(req, res) => {
        const {channelName, communityId, channelId, userId} = req.body;
        if (!channelName || !channelId || !userId) {
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            if(await isAdmin(communityId, userId)){
                const response = channel.rename(channelName, channelId);
                res
                    .status(200)
                    .send(`channel ID : ${channelId} Rename to ${channelName}`);
            }
        }
    },
    //채널 삭제
    channelDelete: (req, res) => {
        const {channelId} = req.body;
        if (!channelId) {
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            const response = channel.delete(channelId);
            res
                .status(200)
                .send(`channel ID : ${channelId} deleted`);
        }
    },

    //채널 참가(보류)
    // channelJoin: (req, res)=>{
    //     const {channelId, userId} = req.body;
    //     if(!channelId || !userId){
    //         res
    //             .status(400)
    //             .send('Invalid parmas');
    //     } else {
    //         channel.join(channelId, userId);
    //         res
    //             .status(200)
    //             .send(`channel ID : ${channelId} joined`);
    //     }
    // },

    loadList: async(req, res)=>{
        const{categoryId} = req.body;
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