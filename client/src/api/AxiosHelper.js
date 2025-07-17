import axios from 'axios';
import Config from '../config';

const baseURL = `${Config.URL_SERVER}/api`;

const instance = axios.create({
    baseURL,
    headers: { Accept: 'application/json'},
    withCredentials: true,
});

class AxiosHelper {
    static async getLicenseKeys() {
        return await instance.get('/license-keys');
    }

    static async generate(data) {
        return await instance.post('/license-keys/create', data);
    }

    static async download(filename, headers) {
        return await instance.get('/license-keys/download/'+filename, headers);
    }

    static async delete(filename) {
        return await instance.delete('/license-keys/delete/'+filename);
    }
}

export default AxiosHelper;