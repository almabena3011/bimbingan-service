const { Bimbingan } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const bimbinganId = req.params.id;
        const bimbingan = await Bimbingan.findByPk(bimbinganId);
        if (!bimbingan) {
            return res.status(404).json({
                status: 'error',
                message: 'Bimbingan not found'
            });
        }
        bimbingan.laporan_akhir_path = "test";
        await bimbingan.save();

        return res.status(200).json({
            status: 'success',
            data: bimbingan,
            message: 'Bimbingan berhasil diupdate'
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
