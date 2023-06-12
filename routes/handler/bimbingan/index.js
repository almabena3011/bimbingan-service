const assignBimbingan = require('./assignBimbingan');
const getAllBimbingan = require('./getAllBimbingan');
const getAllBimbinganByDosenIdBatchId = require('./getAllBimbinganByDosenIdBatchId');
const getAllBimbinganByBatchId = require('./getAllBimbinganByBatchId');
const inputLaporanAKhir = require('./inputLaporanAkhir');
const getAllProgress = require('./getAllProgress');
const getMyBimbingan = require('./getMyBimbingan');

module.exports = {
    assignBimbingan,
    getAllBimbingan,
    getAllBimbinganByDosenIdBatchId,
    getAllBimbinganByBatchId,
    inputLaporanAKhir,
    getAllProgress,
    getMyBimbingan
}