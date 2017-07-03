/**
 * Created by Administrator on 2017/1/6 0006.
 */
var path = require('path');
module.exports = {
    port: 80,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    uploadDir:path.join(__dirname, '../public/img'),// 上传文件目录
    mongodb: 'mongodb://127.0.0.1:27018/myblog'
};
