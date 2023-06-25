var express = require('express');
var router = express.Router();

const progressHandler = require('./handler/progress');

router.get('/:id', progressHandler.getDetailProgress);
router.put('/:id/updateprogress', progressHandler.updateProgress);
router.put('/:id/givefeedback', progressHandler.giveFeedback);




module.exports = router;
