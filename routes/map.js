/**
 * Created by Administrator on 2017/6/29 0029.
 */
var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;

// GET /map
router.get('/', checkLogin, function (req, res, next) {
  res.render('map');
});

module.exports = router;
