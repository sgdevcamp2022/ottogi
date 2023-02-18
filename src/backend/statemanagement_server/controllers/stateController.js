const state = require('../models/State')
module.exports = {
    stateChange: async (req, res) => {
        const {channelId, userId, status} = req.body;
        
        if (!userId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            state.change(channelId, userId, status);
            res.json({
                success: true,
                message: 'State Change Success',
                data: null,
            });
        }
    },

    loadstate: async (req, res) => {
        const {userId} = req.query;

        if (!userId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            const response = await state.load(userId);
            res.json({
                success: true,
                message: 'State Change Success',
                data: response,
            });
        }
    },
};