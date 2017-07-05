var Language = require('../lib/mongo').Language;
var dbHelper = require('../lib/dbHelper');

module.exports = {
  // 创建新的一行国际化键值
  create: function create(data) {
    return Language.insert(data).exec();
  },
  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getDatas: function getDatas(config, callback, errFun) {
    if (config.search) {
      var reg = new RegExp(config.search);
      //实现多条件查询
      config.queryParams = {
        $or: [ //多条件，数组
          {"zh": {$regex: reg}},
          {"en": {$regex: reg}},
          {"code": {$regex: reg}}
        ]
      };
    }
    return dbHelper.pageQuery(Language, config, function (err, $page) {
      if (err) {
        return errFun(err);
      } else {
        callback({
          "recordsTotal": $page.count,
          "recordsFiltered": $page.count,
          "data": $page.results
        });
      }
    });
  },
  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getAllDatas: function getAllDatas(config) {
    var query = {};
    if (config.search) {
      var reg = new RegExp(config.search);
      //实现多条件查询
      query = {
        $or: [ //多条件，数组
          {"zh": {$regex: reg}},
          {"en": {$regex: reg}},
          {"code": {$regex: reg}}
        ]
      };
    }
    return Language
      .find(query)
      .exec();
  },
  // 更新一行数据
  updateLanguageById: function updateLanguageById(id, data) {
    data.modifyTime = new Date();
    return Language.findOneAndUpdate({_id: id}, {$set: data})
      .exec();
  },

  // 通过用户 id 和文章 id 删除一行数据
  delLanguageByIds: function delLanguageByIds(ids) {
    return Language.remove({_id: {$in: ids}});
  }
};
