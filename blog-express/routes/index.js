var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get == if(method === 'GET')
// path == '/'
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
