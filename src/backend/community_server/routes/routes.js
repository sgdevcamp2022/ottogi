const express = require("express");
const router = express.Router();
const category = require('../controllers/categoryController');
const channel = require('../controllers/channelController');
const community = require('../controllers/communityController');

router.get('/test', (req, res) => {
    res.send('good connect!');
})

//커뮤니티(서버) 생성
router.post('/community/create', community.communityCreate);
//커뮤니티 참가
router.post('/community/join', community.communityJoin);
//커뮤니티 정보 변경(이름)
router.patch('/community/update', community.communityRename);
//커뮤니티 정보 변경(프로필)
router.patch('/community/profile', community.updateProfile);
//커뮤니티 삭제 
router.delete('/community/delete', community.communityDelete);

//커뮤니티 하위 카테고리, 채널 조회 -> json 형식으로 보내주기
router.get('/getlist', community.loadList);
router.get('/getoption', category.loadList);

// 카테고리 생성 
router.post('/category/create', category.categoryCreate);
// 카테고리 정보 변경(이름) 
router.patch('/category/update', category.categoryRename);
// 카테고리 삭제
router.delete('/category/delete', category.categoryDelete);

//채널 생성
router.post('/channel/create', channel.channelCreate);
//채널 참가 만들기
router.post('/channel/join',channel.channelJoin);
//채널 정보 변경(이름) 
router.patch('/channel/update', channel.channelRename);
//채널 삭제
router.delete('/channel/delete', channel.channelDelete);

module.exports = router;