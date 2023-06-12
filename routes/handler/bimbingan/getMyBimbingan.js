const { Bimbingan } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const mahasiswambkmid = req.params.mahasiswambkmid;
        const batchId = req.params.batchid;
        const bimbingan = await Bimbingan.findAll({
            where: {
                mahasiswa_mbkm_id: mahasiswambkmid,
                batchId: batchId
            }
        });

        return res.status(200).json({
            status: 'success',
            data: bimbingan
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
