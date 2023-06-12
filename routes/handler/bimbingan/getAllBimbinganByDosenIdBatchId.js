const { Bimbingan } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const dosenId = req.params.dosenId;
        const batchId = req.params.batchId;
        const bimbingan = await Bimbingan.findAll({
            where: {
                dosenId: dosenId,
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
