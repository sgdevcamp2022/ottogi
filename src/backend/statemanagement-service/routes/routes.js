const express = require("express");
const router = express.Router();
const management = require('../controllers/stateController')

router.get('/state/test', (req, res) => {
    res.send('good connect!');
})

//상태 업데이트
router.post('/state/login', management.stateChange);
router.post('/state/logout', management.stateChangeLogout);

router.get('/state/get', management.loadstate);
router.get('/state/getchannel', management.loadchannelId);
router.post('/state/connect', management.connect);
router.delete('/state/disconnect', management.Disconnect);

module.exports = router;