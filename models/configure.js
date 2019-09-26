var Configure = require('../lib/mongo').Configure;

module.exports = {
  create: function (data) {
    data.createTime = data.modifyTime = new Date();
    return Configure.insert(data).exec();
  },
  clear: function () {
    return Configure.drop().exec();
  },
  getDatas: function () {
    return Configure
      .find()
      .exec();
  },
  getDataByKey: function (key) {
    return Configure
      .findOne({key})
      .exec();
  },
  // 更新一行数据
  update: function (data) {
    data.modifyTime = new Date();
    return Configure.findOneAndUpdate({key: data.key}, {$set: data})
      .exec();
  },
  createOrUpdate: async function (data) {
    let key = data.key;
    let val = await this.getDataByKey(key);
    if (val) {
      this.update(data);
    } else {
      this.create(data);
    }
  }
};
