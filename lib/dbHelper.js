/**
 * Created by Administrator on 2017/6/15 0015.
 */
var async = require('async');
var Q = require('q');

var pageQuery = function (Model, config) {
  var deferred = Q.defer();
  var {page = 1, pageSize = 20, queryParams = {}, sortParams = {}, start = (page - 1) * pageSize} = config;
  var $page = {
    pageNumber: page
  };
  async.parallel({
    count: function (done) { // 查询数量
      Model.count(queryParams).exec(function (err, count) {
        done(err, count);
      });
    },
    records: function (done) { // 查询一页的记录
      Model.find(queryParams).skip(parseInt(start)).limit(parseInt(pageSize)).sort(sortParams).exec(function (err, doc) {
        done(err, doc);
      });
    }
  }, function (err, results) {
    if (err){
      deferred.reject(new Error(err));
      return;
    }
    // console.log(results);
    var count = results.count;
    $page.pageCount = Math.ceil(count / pageSize);
    $page.results = results.records;
    $page.count = count;
    deferred.resolve($page);
  });
  return deferred.promise;
};

module.exports = {
  pageQuery: pageQuery
};
