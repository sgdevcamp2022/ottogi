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


    stateChangeLogout: async (req, res) => {
        const {channelId, userId, status} = req.body;
        
        if (!userId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            state.changeLogout(channelId, userId, status);
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
                data: `${response}`,
            });
        }
    },

    loadchannelId: async (req, res) => {
        const {userId} = req.query;

        if (!userId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
<<<<<<< HEAD
            const response = await state.load(userId);
=======
            const response = await state.loadChannel(userId);
>>>>>>> 69f76bb1527d1206c06c29960199ecc6ea952e7d
            res.json({
                success: true,
                message: 'State Change Success',
                data: `${response}`,
            });
        }
    },

    connect: async (req, res) => {
        const {channelId, userId, sessionId} = req.body;

        if (!userId || !channelId || !sessionId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            state.con(channelId, userId, sessionId);
            res.json({
                success: true,
                message: 'State Change Success',
                data: null,
            });
        }
    },

    Disconnect: (req, res) => {
        const {sessionId} = req.body;

        if (!sessionId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            state.discon(sessionId);
            res.json({
                success: true,
                message: 'State Change Success',
                data: null,
            });
        }
    },
};