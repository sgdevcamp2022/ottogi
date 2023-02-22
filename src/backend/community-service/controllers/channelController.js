const channel = require('../models/Channel')
const { isAdmin } = require('../utils/ulits');



module.exports = {
    //채널 생성 (권한 제외)
    channelCreate: async (req, res) => {
        const {channelName, categoryId, type, communityId, userId} = req.body;
        if (!channelName) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            if(await isAdmin(communityId, userId)){
                channel.create(channelName, categoryId, type)
                res.json({
                    success: true,
                    message: 'Channel Creation Success',
                    data: null,
                });
            }else {
                res.json({
                    success: false,
                    message: 'ERROR: NOT ADMIN',
                    data: null,
                })
            }
        }
    },

    //채널 정보 변경(이름)
    channelRename: async(req, res) => {
        const {channelName, communityId, channelId, userId} = req.body;
        if (!channelName || !channelId || !userId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            if(await isAdmin(communityId, userId)){
                channel.rename(channelName, channelId);
                res.json({
                    success: true,
                    message: `Channel ID : ${channelId} Rename to: ${channelName}`,
                    data: null,
                });
            }else {
                res.json({
                    success: false,
                    message: 'ERROR: NOT ADMIN',
                    data: null,
                })
            }
        }
    },
    //채널 삭제
    channelDelete: async (req, res) => {
        const {channelId} = req.body;
        if (!channelId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            if(await isAdmin(communityId, userId)){
                const response = channel.delete(channelId);
                res.json({
                    success: true,
                    message: `Channel ID : ${channelId} Deleted`,
                    data: null,
                });
            }else {
                res.json({
                    success: false,
                    message: 'ERROR: NOT ADMIN',
                    data: null,
                })
            }
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
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            const response = await channel.load(categoryId);
            res.json({
                success: true,
                message: 'List Call Success',
                data: response,
            });
        }
    }
};