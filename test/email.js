/**
 * Created by Administrator on 2017/7/14.
 */
var sendMail = require('../lib/mail');
var Mock = require('mockjs');
var Random = Mock.Random;

sendMail('635676703@qq.com', Random.cparagraph(1), Random.cparagraph(1, 3));
