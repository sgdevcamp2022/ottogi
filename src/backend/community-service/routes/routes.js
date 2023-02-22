const express = require("express");
const router = express.Router();
const {upload} = require('../confing/s3');
const category = require('../controllers/categoryController');
const channel = require('../controllers/channelController');
const community = require('../controllers/communityController');
const invite = require('../controllers/invitationController');

router.get('/community/test', (req, res) => {
    res.send('community good connect!');
})

//커뮤니티 하위 카테고리, 채널 조회 -> json 형식으로 보내주기
router.get('/community/getlist', community.loadList);
router.get('/community/getoption', category.loadList);

//초대관련
router.post('/invite/member', invite.inviteMember);
router.get('/invite/:shortUrl/:userId', invite.redirect);

//커뮤니티(서버) 생성
router.post('/community/create', upload.single('img'), community.communityCreate);
//커뮤니티 참가
router.post('/community/join', community.communityJoin);
//커뮤니티 정보 변경(이름)
router.patch('/community/update', community.communityRename);
//커뮤니티 이미지 변경
router.patch('/community/imgupload', upload.single('img'), community.communityImage);
//커뮤니티 정보 변경(프로필)
router.patch('/community/profile', community.updateProfile);
//커뮤니티 삭제 
router.patch('/community/delete', community.communityDelete);
//커뮤니티 나가기
router.post('/community/out', community.goOut);

// 카테고리 생성 
router.post('/community/category/create', category.categoryCreate);
// 카테고리 정보 변경(이름) 
router.patch('/community/category/update', category.categoryRename);
// 카테고리 삭제
router.delete('/community/category/delete', category.categoryDelete);

//채널 생성
router.post('/community/channel/create', channel.channelCreate);
//채널 참가 만들기
// router.post('/channel/join',channel.channelJoin);
//채널 정보 변경(이름) 
router.patch('/community/channel/update', channel.channelRename);
//채널 삭제
router.delete('/community/channel/delete', channel.channelDelete);

module.exports = router;