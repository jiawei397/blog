var Language = require('../lib/mongo').Language;
var utils = require('../lib/util');
var dbHelper = require('../lib/dbHelper');

// var transfData = function (data) {
//   // if(!data || !data.toObject){
//   //   return {"success":false,"message":"数据错误！"};
//   // }
//   // data = data.toObject({virtuals: true});
//   data.DT_RowId = data._id;
//   data.en = data.en || '';
//   data.zh = data.zh || '';
//   data.author = data.author || '';
//   data.createTime = data.createTime.format('yyyy-MM-dd HH:mm:ss');
//   data.modifyTime = data.modifyTime.format('yyyy-MM-dd HH:mm:ss');
//   console.log(data);
//   return data;
// };

// 给 post 添加留言数 commentsCount
// Language.plugin('addCreateTime', {
//   afterFind: function (results) {
//     results = results.forEach(function (item) {
//       item.createTime = item.modifyTime = new Date();
//     });
//     return results;
//   },
//   afterFindOne: function (result) {
//     if (result) {
//       result.createTime = result.modifyTime = new Date();
//     }
//     return result;
//   }
// });

module.exports = {
  // 创建新的一行国际化键值
  create: function create(data, callback, errFun) {
    return Language.insertOne(data).exec()
      .then(callback)
      .catch(errFun);
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
        // throw new Error(err);
      } else {
        result = $page.results;
        // console.log(result);
        callback({
          "recordsTotal": $page.count,
          "recordsFiltered": $page.count,
          "data": result
        });
      }
    });
  },
  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getAllDatas: function getAllDatas(config, callback, errFun) {
    var query = {};
    if (config.search) {
      // config.queryParams = {'zh': new RegExp(config.search)};
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
      .exec(function (err, result) {
        if (err) {
          return errFun(err);
          // throw new Error(err);
        } else {
          result = result.map(function (data) {
            return transfData(data);
          });
          console.log(result);
          callback(result);
        }
      });
  },
  // 通过code获取当前行数据
  getLanguageById: function getLanguageById(id) {
    return Language
      .findOne({_id: id})
      // .contentAfter()
      .exec();
  },
  // 更新一行数据
  updateLanguageById: function updateLanguageById(id, data, callback, errFun) {
    data.modifyTime = new Date();
    return Language.findByIdAndUpdate({_id: id}, {$set: data}, function (err, result) {
      if (err) {
        return errFun(err);
      }
      result = transfData(result);
      utils.combine(result, data);
      // console.log(result);
      callback(result);
    });
  },

  // 通过用户 id 和文章 id 删除一行数据
  delLanguageById: function delLanguageById(id, callback, errFun) {
    return Language.remove({_id: id}, function (err, doc) {
      if (err) {
        return errFun(err);
      }
      callback(doc);
    });
  },

  // 通过用户 id 和文章 id 删除一行数据
  delLanguageByIds: function delLanguageByIds(ids, callback, errFun) {
    return Language.findAndRemove({_id: { $in: ids }}).exec(callback).catch(function (e) {
      console.log(e);
    });
  }
};
