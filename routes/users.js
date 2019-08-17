var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.json([{id:1, body:"hello"}, {id:2, body:"world"}]);
});

module.exports = router;
