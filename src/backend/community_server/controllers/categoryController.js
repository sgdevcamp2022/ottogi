const category = require('../models/Category')
const { isAdmin } = require('../utils/ulits');



module.exports = {
    //카테고리 생성 (권한 제외)
    categoryCreate: async(req, res) => {
        const {categoryName, communityId, userId} = req.body;
        if (!categoryName) {
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            if(await isAdmin(communityId, userId)){
                category.create(categoryName, communityId);
                res.send('create success');
            }
        }
    },

    //카테고리 정보 변경(이름)
    categoryRename: async(req, res) => {
        const {categoryName, communityId, categoryId, userId} = req.body;
        if (!categoryName || !communityId || !categoryId || !userId) {
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            if(await isAdmin(communityId, userId)){
                const response = category.rename(categoryName, categoryId);
                res
                    .status(200)
                    .send(`category ID : ${categoryId} Rename to ${categoryName}`);
            }
        }
    },

    //카테고리 삭제
    categoryDelete: async (req, res) => {
        const {categoryId, userId} = req.body;
        if (!categoryId) {
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            if(await isAdmin(communityId, userId)){
                const response = category.delete(categoryId);
                res
                    .status(200)
                    .send(`category ID : ${categoryId} deleted`);
            }
        }
    },

    //카테고리 조회
    loadList: async(req, res)=>{
        const{communityId} = req.body;
        if(!communityId){
            res
                .status(400)
                .send('Invalid parmas');
        } else {
            const response = await category.load(communityId);
            res.status(200).send(`${response}`);
        }
    }
};