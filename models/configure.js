var Configure = require('../lib/mongo').Configure;

module.exports = {
  // 注册一个用户
  create: function create (conf) {
    return Configure.insert(conf).exec();
  },
  clear: function clear () {
    return Configure.drop().exec();
  },
  getDatas: function getDatas () {
    return Configure
      .find()
      .exec();
  },
  getDataByKey: function (key) {
    return Configure
      .findOne({key})
      .exec();
  }
};
