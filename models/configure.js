var Configure = require('../lib/mongo').Configure;
const dateFormat = require('dateformat');

const now = () => {
  return dateFormat(new Date(), 'yyyymmdd HH:MM:ss');
};

module.exports = {
  create: function (data) {
    data.createTime = data.modifyTime = now();
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
    data.modifyTime = now();
    // data.createTime = now();
    return Configure.findOneAndUpdate({key: data.key}, {$set: data})
      .exec();
  },
  createOrUpdate: async function (data) {
    let key = data.key;
    if (!key) {
      return {
        success: false,
        message: 'key不能为空'
      };
    }
    let value = data.value;
    if (typeof value === 'object') {
      data.value = JSON.stringify(value);
    }
    let val = await this.getDataByKey(key);
    if (val) {
      for (let key in val) {
        if (key === '_id' || key === 'createTime') {
          data[key] = val[key];
        }
      }
      if (!data.version) {
        if (!val.version) {
          data.version = 1;
        } else {
          data.version = val.version + 1;
        }
      }
      this.update(data);
    } else {
      this.create(data);
    }
  }
};
