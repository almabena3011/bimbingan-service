const { Bimbingan } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const bimbingan = await Bimbingan.findAll();

        // All processes finished successfully
        return res.status(200).json({
            status: 'success',
            data: bimbingan
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
