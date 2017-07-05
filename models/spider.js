var Spider = require('../lib/mongo').Spider;

module.exports = {
    // 注册一个用户
    create: function create(spider) {
        return Spider.insert(spider).exec();
    },
    clear:function clear() {
      return Spider.drop().exec();
    },
    // 通过用户名获取用户信息
    getDatas: function getDatas() {
        return Spider
            .find()
            .exec();
    }
};
