const { ProgressMingguan } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const progressId = req.params.id;
        const { feedback } = req.body;
        const progress = await ProgressMingguan.findByPk(progressId);
        if (!progress) {
            return res.status(404).json({
                status: 'error',
                message: 'Progress Mingguan not found'
            });
        }
        progress.feedback_laporan = feedback;
        await progress.save();

        return res.status(200).json({
            status: 'success',
            message: 'Feedback berhasil diberikan'
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
