var Configure = require('../lib/mongo').Configure;

module.exports = {
  create: function (data) {
    data.createTime = data.modifyTime = new Date();
    data.version = 1;
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
    if (!data.version) {
      data.version = 1;
    } else {
      data.version += 1;
    }
    return Configure.findOneAndUpdate({key: data.key}, {$set: data})
      .exec();
  },
  createOrUpdate: async function (data) {
    let key = data.key;
    let value = data.value;
    if (typeof value === 'object') {
      data.value = JSON.stringify(value);
    }
    let val = await this.getDataByKey(key);
    if (val) {
      val.value = data.value;
      this.update(val);
    } else {
      this.create(data);
    }
  }
};
