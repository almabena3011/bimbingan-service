const { Bimbingan, ProgressMingguan } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const { getMahasiswaMBKMById } = require('../AdministrasiService');

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const ONE_WEEK_MS = 7 * ONE_DAY_MS;

async function createWeeklyProgress(bimbinganId, start, end) {
    return ProgressMingguan.create({
        bimbinganId,
        startWeek: start,
        endWeek: end
    });
}

const schema = {
    mahasiswa_mbkm_id: { type: "number", positive: true, integer: true },
    dosenId: { type: "number", positive: true, integer: true },
};

module.exports = async (req, res) => {
    let { mahasiswa_mbkm_id, dosenId, batchId } = req.body;
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

        const isExistBimbingan = await Bimbingan.findOne({
            where: {
                mahasiswa_mbkm_id: mahasiswa_mbkm_id,
            }
        })

        if (isExistBimbingan) {
            return res.status(409).json({
                status: 'error',
                message: 'Sudah diassign dengan dosen pembimbing'
            })
        }

        const bimbingan = await Bimbingan.create({
            mahasiswa_mbkm_id: mahasiswa_mbkm_id,
            dosenId: dosenId,
            batchId: mahasiswaMbkm.batchId
        });

        const startDate = new Date(mahasiswaMbkm.tanggal_mulai);
        const endDate = new Date(mahasiswaMbkm.tanggal_berakhir);
        let currentStartWeekDate = startDate;

        while (currentStartWeekDate <= endDate) {
            const currentEndWeekDate = new Date(currentStartWeekDate.getTime() + ONE_WEEK_MS - ONE_DAY_MS > endDate.getTime()
                ? endDate
                : currentStartWeekDate.getTime() + ONE_WEEK_MS - ONE_DAY_MS);

            await createWeeklyProgress(bimbingan.id, new Date(currentStartWeekDate), new Date(currentEndWeekDate));

            // Update the currentStartWeekDate for the next loop
            currentStartWeekDate = new Date(currentStartWeekDate.getTime() + ONE_WEEK_MS);
        }

        // All processes finished successfully
        return res.status(200).json({
            status: 'success',
            message: 'Bimbingan berhasil dibuat'
        });

    } catch (error) {
        const statusCode = error.message === 'Mahasiswa MBKM not found' ? 404 : error.message === 'User service is not available' ? 503 : 500;
        return res.status(statusCode).json({ error: error.message });
    }
}
