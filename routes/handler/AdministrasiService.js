const axios = require('axios');
const { URL_SERVICE_ADMINISTRASI } = process.env;


async function getMahasiswaMBKMById(id) {
    try {
        const response = await axios.get(`${URL_SERVICE_ADMINISTRASI}/mahasiswambkm/${id}`);
        if (!response.data) {
            throw new Error('Mahasiswa MBKM not found');
        }
        return response.data.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(error.response.data.error);
        } else if (error.response && error.response.status === 404) {
            throw new Error('Mahasiswa MBKM not found');
        } else {
            throw new Error('User service is not available');
        }
    }
}

async function giveStatusTrue(id) {
    try {
        const response = await axios.put(`${URL_SERVICE_ADMINISTRASI}/mahasiswambkm/${id}/assigntrue`);
        if (!response.data) {
            throw new Error('Mahasiswa MBKM not found');
        }
        return response.data.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(error.response.data.error);
        } else if (error.response && error.response.status === 404) {
            throw new Error('Mahasiswa MBKM not found');
        } else {
            throw new Error('User service is not available');
        }
    }
}

module.exports = { getMahasiswaMBKMById, giveStatusTrue };
