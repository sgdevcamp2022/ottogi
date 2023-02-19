const invite = require('../models/Invite');
const community = require('../models/Community');

module.exports = {
  //랜덤 링크 저장
  inviteMember: (req, res)=>{
    const { communityId, userId, shortUrl } = req.body;

    if(!communityId || !userId || !shortUrl){
      res.json({
        success: false,
        message: 'ERROR: Invalid parmas',
        data: null,
      })
    } else {
      invite.invite(communityId, userId, shortUrl);
      res.json({
        success: true,
        message: 'Invition Success',
        data: null,
    });
    }
  },

  //리다이렉트
  redirect: async(req, res) => {
    const { shortUrl, userId } = req.params;

    if(!shortUrl || !userId){
      res.json({
        success: false,
        message: 'ERROR: Invalid parmas',
        data: null,
      })
    } else {
      const communityId = await invite.geturl(shortUrl);
      const response = await community.join(communityId, userId, null);
      res.json({
        success: true,
        message: `Join Success community : ${response}`,
        data: null,
    });
    }
  }
}