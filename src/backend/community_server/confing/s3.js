const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const path = require('path');
require('dotenv').config();

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2'
});

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp']

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'ottogi-file-server',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const uploadDirectory = req.query.directory ?? '';
      const extension = path.extname(file.originalname);
      if(!allowedExtensions.includes(extension)){
        return cb(new Error('wrong extension'));
      }
      cb(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
  }),
});

exports.upload = multer(upload);