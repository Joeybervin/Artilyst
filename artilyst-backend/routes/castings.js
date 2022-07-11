var express = require('express');
var router = express.Router();

// ^ Models
var userModel = require('../models/user');
var projectModel = require('../models/project');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
