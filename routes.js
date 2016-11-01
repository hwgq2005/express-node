var express = require('express');
var router = express.Router();
var controls = require('./controllers');
var api=require('./database/example');

router.get('/', controls.home.index);
router.get('/example', controls.example.index);

// api
router.get('/acticle/getData',api.post);
router.post('/acticle/insert',api.addPost);
router.post('/acticle/update/:id',api.updatePost);
router.post('/acticle/delete/:id',api.deletePost);

module.exports = router;