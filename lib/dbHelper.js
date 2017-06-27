/**
 * Created by Administrator on 2017/6/15 0015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

var pageQuery = function (Model, config, callback) {
  var {page = 1, pageSize = 20,populate = '', queryParams = {}, sortParams = {},start = (page - 1) * pageSize} = config;
  var $page = {
    pageNumber: page
  };
  async.parallel({
    count: function (done) {  // 查询数量
      Model.count(queryParams).exec(function (err, count) {
        done(err, count);
      });
    },
    records: function (done) {   // 查询一页的记录
      Model.find(queryParams).skip(parseInt(start)).limit(parseInt(pageSize)).populate(populate).sort(sortParams).exec(function (err, doc) {
        done(err, doc);
      });
    }
  }, function (err, results) {
    // console.log(results);
    var count = results.count;
    $page.pageCount = Math.floor((count - 1) / pageSize) + 1;
    $page.results = results.records;
    $page.count = count;
    callback(err, $page);
  });
};

module.exports = {
  pageQuery: pageQuery
};
