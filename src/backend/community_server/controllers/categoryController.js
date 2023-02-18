const category = require('../models/Category')
const { isAdmin } = require('../utils/ulits');



module.exports = {
    //카테고리 생성 (권한 제외)
    categoryCreate: async(req, res) => {
        const {categoryName, communityId, userId} = req.body;
        if (!categoryName) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            if(await isAdmin(communityId, userId)){
                category.create(categoryName, communityId);
                res.json({
                    success: true,
                    message: 'Category Creation Success',
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

    //카테고리 정보 변경(이름)
    categoryRename: async(req, res) => {
        const {categoryName, communityId, categoryId, userId} = req.body;
        if (!categoryName || !communityId || !categoryId || !userId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            if(await isAdmin(communityId, userId)){
                category.rename(categoryName, categoryId);
                res.json({
                    success: true,
                    message: `Category ID : ${categoryId} Rename to: ${categoryName}`,
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

    //카테고리 삭제
    categoryDelete: async (req, res) => {
        const {categoryId, userId} = req.body;
        if (!categoryId) {
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            if(await isAdmin(communityId, userId)){
                category.delete(categoryId);
                res.json({
                    success: true,
                    message: `Category ID : ${categoryId} Deleted`,
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

    //카테고리 조회
    loadList: async(req, res)=>{
        const{communityId} = req.query;
        if(!communityId){
            res.json({
                success: false,
                message: 'ERROR: Invalid parmas',
                data: null,
            })
        } else {
            const response = await category.load(communityId);
            res.json({
                success: true,
                message: 'List Call Success',
                data: response,
            });
        }
    }
};