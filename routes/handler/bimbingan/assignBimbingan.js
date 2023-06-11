const { Bimbingan } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const { getMahasiswaMBKMById } = require('../AdministrasiService');

const schema = {
    mahasiswa_mbkm_id: { type: "number", positive: true, integer: true },
    dosenId: { type: "number", positive: true, integer: true },
};

module.exports = async (req, res) => {
    let { mahasiswa_mbkm_id, dosenId } = req.body;
    mahasiswa_mbkm_id = parseInt(mahasiswa_mbkm_id, 10);
    dosenId = parseInt(dosenId, 10);

    const validationResponse = v.validate({ mahasiswa_mbkm_id, dosenId }, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            errors: validationResponse
        });
    }
    try {
        const mahasiswaMbkm = await getMahasiswaMBKMById(mahasiswa_mbkm_id);
        console.log(mahasiswaMbkm);
        const _ = await Bimbingan.create({
            mahasiswa_mbkm_id: mahasiswa_mbkm_id,
            dosenId: dosenId
        })

        const startDate = new Date(mahasiswaMbkm.tanggal_mulai);
        const endDate = new Date(mahasiswaMbkm.tanggal_berakhir);
        const diffInTime = endDate.getTime() - startDate.getTime();
        const diffInDays = Math.ceil(diffInTime / (24 * 60 * 60 * 1000)) + 1;
        console.log("Tanggal Mulai:", startDate);
        console.log("Tanggal Berakhir:", endDate);
        console.log("Hari:", diffInDays);
        // Menghitung jumlah minggu dan sisa hari
        const totalWeeks = Math.floor(diffInDays / 7);
        console.log("Total Minggu:", totalWeeks);
        const remainingDays = diffInDays % 7;
        console.log("Total Hari:", remainingDays);

    } catch (error) {
        if (error.message === 'Mahasiswa MBKM not found') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === 'User service is not available') {
            return res.status(503).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
}