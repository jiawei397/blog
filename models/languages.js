var Language = require('../lib/mongo2').Language;
var utils = require('../lib/util');
var dbHelper = require('../lib/dbHelper');
var fs = require('fs');

// 将 post 的 content 从 markdown 转换成 html
// Language.plugin('contentAfter', {
//   afterFind: function (datas) {
//     return datas.map(function (data) {
//       data["DT_RowId"] = data["_id"];
//       return data;
//     });
//   },
//   afterFindOne: function (data) {
//     if (data) {
//       data["DT_RowId"] = data["_id"];
//     }
//     return data;
//   }
// });

var transfData = function (data) {
  console.log(data);
  if(!data){
    return;
  }
  data = data.toObject({virtuals: true});
  data.en = data.en || '';
  data.zh = data.zh || '';
  data.createTime = data.createTime.format('yyyy-MM-dd HH:mm:ss');
  data.modifyTime = data.modifyTime.format('yyyy-MM-dd HH:mm:ss');
  // console.log(data);
  return data;
};

module.exports = {
  // 创建新的一行国际化键值
  create: function create(data, callback, errFun) {
    console.error("111111111111111111111");
    console.error(data);
    // data.createTime = data.modifyTime = new Date();
    return Language.create(data, function (err, doc) {
      var result = {"success":false,"data":[]};
      console.error("--------------22222222")
      if (err) {
        // throw new Error(err);
        // console.error(err);
        errFun({"success":false,"message":err.message});
      } else {
        result = transfData(doc);
        callback(result);
      }
    });
  },
  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getDatas: function getDatas(config,callback) {
    var query = {};
    // if (author) {
    //   query.author = author;
    // }
    // var config = {
    //   page:3
    // };
    if(config.search){
      // config.queryParams = {'zh': new RegExp(config.search)};
      var reg = new RegExp(config.search);
      //实现多条件查询
      config.queryParams = {
        $or : [ //多条件，数组
          {"zh" : {$regex : reg}},
          {"en" : {$regex : reg}},
          {"code" : {$regex : reg}}
        ]
      };
    }
    return dbHelper.pageQuery(Language,config, function(err, $page){
      if(err){
        throw new Error(err);
      }else{
        // res.render('index'{
        //   records: $page.results,
        //     pageCount: $page.pageCount
        // });
        // console.log($page);
        result = $page.results;
        // console.log(result);
        result = result.map(function (data) {
          return transfData(data);
        });
        // console.log(result);
        callback({
          "recordsTotal": $page.count,
          "recordsFiltered": $page.count,
          "data":result
        });
      }
    });

    // return Language
    //   .find(query)
    //   .limit(20)
    //   .skip(1)
    //   // .populate({ path: 'author', model: 'User' })
    //   // .sort({ _id: -1 })
    //   // .addCreatedAt()
    //   // .contentAfter()
    //   .exec(function (err, result) {
    //     if (err) {
    //       throw new Error(err);
    //     } else {
    //       result = result.map(function (data) {
    //         return transfData(data);
    //       });
    //       console.log(result);
    //       callback(result);
    //     }
    //   });
  },
  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getAllDatas: function getAllDatas(config,callback) {
    var query = {};
    if(config.search){
      // config.queryParams = {'zh': new RegExp(config.search)};
      var reg = new RegExp(config.search);
      //实现多条件查询
      query = {
        $or : [ //多条件，数组
          {"zh" : {$regex : reg}},
          {"en" : {$regex : reg}},
          {"code" : {$regex : reg}}
        ]
      };
    }
    return Language
      .find(query)
      .exec(function (err, result) {
        if (err) {
          throw new Error(err);
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
  updateLanguageById: function updateLanguageById(id, data, callback) {
    data.modifyTime = new Date();
    return Language.findByIdAndUpdate({_id: id}, {$set: data}, function (err, result) {
      if (err) {
        throw  new Error(err);
      }
      result = transfData(result);
      utils.combine(result, data);
      // console.log(result);
      callback(result);
    });
  },

  // 通过用户 id 和文章 id 删除一行数据
  delLanguageById: function delLanguageById(id, callback) {
    return Language.remove({_id: id}, function (err, doc) {
      if (err) {
        throw  new Error(err);
        return MongodbError(res, err);
      }
      callback(doc);
    });
  },

  // 通过用户 id 和文章 id 删除一行数据
  delLanguageByIds: function delLanguageByIds(ids, callback) {
    return Language.remove({_id: { $in: ids }}, function (err, doc) {
      if (err) {
        throw  new Error(err);
      }
      callback(doc);
    });
  }
};
