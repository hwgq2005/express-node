var express = require('express');
var router = express.Router();
var controls = require('./controllers');

router.get('/', controls.home.index);

module.exports = router;