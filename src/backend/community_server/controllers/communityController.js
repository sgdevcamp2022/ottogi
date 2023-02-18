const community = require('../models/Community');
const { isAdmin } = require('../utils/ulits');

module.exports = {
    //커뮤니티(서버) 생성
    communityCreate: async (req, res) => {
        const {communityName, userId, profile} = req.body;
        const img = req.file;
        
        if (!communityName || !userId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            community.create(communityName, img.location , userId, profile);
            res.json({
                success: true,
                message: 'Community Creation Success',
                data: null,
            });
        }
    },

    //커뮤니티 참가
    communityJoin: async(req, res) => {
        const {communityId, userId, profile} = req.body;
        if (!communityId || !userId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            community.join(communityId, userId, profile);
            const response = await community.checkMember(communityId)
            res.json({
                success: true,
                message: 'Community Join Success',
                data: response,
            });
        }
    },

    //커뮤니티 정보 변경(이름)
    communityRename: async(req, res) => {
        const {communityName, communityId, userId} = req.body;
        if (!communityName || !communityId || !userId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            if(await isAdmin(communityId, userId)){
                community.rename(communityName, communityId);
                res.json({
                    success: true,
                    message: `CommuintyId: ${communityId}, Renamed to: ${communityName}` ,
                    data: null,
                });
            }
            else {
                res.json({
                    success: false,
                    message: 'ERROR: NOT ADMIN',
                    data: null,
                })
            }
        }
    },

    //커뮤니티 삭제
    communityDelete: async (req, res) => {
        const {communityId, userId} = req.body;
        if (!communityId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            if(await isAdmin(communityId, userId)){
                community.delete(communityId);
                res.json({
                    success: true,
                    message: `Community ID : ${communityId} Deleted` ,
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
    
    //커뮤니티 멤버 프로필 변경
    updateProfile: async (req, res)=>{
        const{communityId, userId, profile} = req.body;
        if(!communityId || !userId || !profile){
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            const response = await community.profile(communityId, userId, profile);
            console.log(response);
            if(response == 'succes'){
                res.json({
                    success: true,
                    message: `Updated Profile` ,
                    data: null,
                });
            }else {
                res.json({
                    success: false,
                    message: 'ERROR: Profile update failed',
                    data: null,
                })
            }
        }
    },

    loadList: async (req, res)=>{
        const{userId} = req.query;
        if(!userId){
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            const response = await community.load(userId);
            res.json({
                success: true,
                message: `List Call Success` ,
                data: response,
            });
        }
    },
};