var express = require('express');
var router = express.Router();

const bimbinganHandler = require('./handler/bimbingan');

router.post('/', bimbinganHandler.assignBimbingan);
router.get('/:dosenId/bimbingandosen/:batchId', bimbinganHandler.getAllBimbinganByDosenIdBatchId);
router.get('/:batchId/allbimbingan', bimbinganHandler.getAllBimbinganByBatchId);
router.get('/:mahasiswambkmid/mybimbingan/:batchid', bimbinganHandler.getMyBimbingan);
router.get('/:id/allprogress', bimbinganHandler.getAllProgress);
router.get('/', bimbinganHandler.getAllBimbingan);
router.put('/:id/upload-laporan-akhir', bimbinganHandler.inputLaporanAKhir);



module.exports = router;
