const { Bimbingan } = require('../../../models');

module.exports = async (req, res) => {
    try {
        let filter = {};
        if (req.query.mahasiswambkm) {
            filter.mahasiswa_mbkm_id = req.query.mahasiswambkm;
        }

        const bimbingan = await Bimbingan.findAll({
            where: filter
        });

        // All processes finished successfully
        return res.status(200).json({
            status: 'success',
            data: bimbingan
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
