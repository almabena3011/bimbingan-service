var express = require('express');
var router = express.Router();

const progressHandler = require('./handler/progress');

router.put('/:id/updateprogress', progressHandler.updateProgress);




module.exports = router;
