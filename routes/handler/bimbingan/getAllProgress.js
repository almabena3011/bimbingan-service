const { Bimbingan, ProgressMingguan } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const bimbingan = await Bimbingan.findByPk(id, {
            include: [
                {
                    model: ProgressMingguan,
                    as: 'progressMingguan',
                },
            ],
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
