const { ProgressMingguan } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const progressId = req.params.id;
        const { progress_mingguan } = req.body;
        const progress = await ProgressMingguan.findByPk(progressId);
        if (!progress) {
            return res.status(404).json({
                status: 'error',
                message: 'Progress Mingguan not found'
            });
        }
        progress.progress_laporan = progress_mingguan;
        progress.is_submitted = true;
        await progress.save();

        return res.status(200).json({
            status: 'success',
            data: progress
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
