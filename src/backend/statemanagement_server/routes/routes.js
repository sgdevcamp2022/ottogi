const express = require("express");
const router = express.Router();
const management = require('../controllers/stateController')

router.get('/statetest', (req, res) => {
    res.send('good connect!');
})

//상태 업데이트
router.post('/state/update', management.stateChange);
router.get('/state/get', management.loadstate);

module.exports = router;