/**
 * Created by Administrator on 2017/1/6 0006.
 */
var config = require('config-lite');
var mongoose = require('mongoose');    //引用mongoose模块
var Schema = mongoose.Schema;
mongoose.connect(config.mongodb);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + config.mongodb);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

var user = mongoose.Schema({
  name: {type: String, unique: true, index: true},
  password: String,
  avatar: String,
  gender: {type: String, enum: ['m', 'f', 'x']},
  bio: String
});
user.index({name: 1});// 按创建时间降序查看用户的文章列表

exports.User = mongoose.model('User', user);

var post = mongoose.Schema({
  author: {type: Schema.Types.ObjectId, index: true},
  title: String,
  content: String,
  pv: {type: 'number'}
});
post.index({author: 1, _id: -1});// 按创建时间降序查看用户的文章列表

exports.Post = mongoose.model('Post', post);

var comment = mongoose.Schema({
  author: {type: Schema.Types.ObjectId, index: true},
  content: String,
  postId: {type: Schema.Types.ObjectId, index: true}
});
comment.index({postId: 1, _id: 1});
comment.index({author: 1, _id: 1});

exports.Comment = mongoose.model('Comment', comment);

var lan = mongoose.Schema({
  // _id:{type:Schema.Types.ObjectId,alias:"DT_RowId"},
  code: {type: String, index: true, unique: true},
  zh: String,
  en: String,
  author: String,
  createTime: {type: Date, default: Date.now},
  modifyTime: {type: Date, default: Date.now}
}, {id: false});
lan.virtual('DT_RowId').get(function () {
  return this._id;
});

exports.Language = mongoose.model('Language', lan);
