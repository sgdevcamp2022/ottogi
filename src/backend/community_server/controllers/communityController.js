const community = require('../models/Community');
const { isAdmin } = require('../utils/ulits');

module.exports = {
    //커뮤니티(서버) 생성
    communityCreate: (req, res) => {
        const {communityName, img, userId, profile} = req.body;

        if (!communityName || !userId) {
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            community.create(communityName, img , userId, profile);
            res.send('create success');
        }
    },

    //커뮤니티 참가
    communityJoin: (req, res) => {
        const {communityId, userId, profile} = req.body;
        if (!communityId || !userId) {
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            //유저 아이디 유효성 검사 추가 예정
            const response = community.join(communityId, userId, profile);
            response.then(result => {
                res.send(`Community ${result}, joined communityID: ${communityId}`);
            })
        }
    },

    //커뮤니티 정보 변경(이름)
    communityRename: async(req, res) => {
        const {communityName, communityId, userId} = req.body;
        if (!communityName || !communityId || !userId) {
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            if(await isAdmin(communityId, userId)){
                const response = community.rename(communityName, communityId);
                res
                    .status(200)
                    .send(`community ID : ${communityId} Rename to ${communityName}`);
            }
        }
    },

    //커뮤니티 삭제
    communityDelete: async (req, res) => {
        const {communityId, userId} = req.body;
        if (!communityId) {
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            if(await isAdmin(communityId, userId)){
                const response = community.delete(communityId);
                res
                .status(200)
                .send(`community ID : ${communityId} deleted`);
            }
        }
    },
    
    //커뮤니티 멤버 프로필 변경
    updateProfile: async (req, res)=>{
        const{communityId, userId, profile} = req.body;
        if(!communityId || !userId || !profile){
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            const response = await community.profile(communityId, userId, profile);
            console.log(response);
            if(response == 'succes'){
                res.status(200).send(`update profile`)
            }else {
                res.status(400).send('ERROR')
            }
        }
    },

    loadList: async (req, res)=>{
        const{userId} = req.body;
        if(!userId){
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            const response = await community.load(userId);
            res.status(200).send(`Community List :  ${response}`);
            
        }
    },
};