/**
 * Created by Administrator on 2017/1/6 0006.
 */
module.exports = {
    port: 80,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    upload:{
      path: process.cwd() + '/uploads'
    },
    mongodb: 'mongodb://localhost:27018/myblog'
};
