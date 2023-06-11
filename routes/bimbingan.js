var express = require('express');
var router = express.Router();

const bimbinganHandler = require('./handler/bimbingan');

router.post('/', bimbinganHandler.assignBimbingan);


module.exports = router;
