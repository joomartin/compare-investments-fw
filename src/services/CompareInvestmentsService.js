class CompareInvestmentsService {
    constructor(axios) {
        this.axios = axios;
    }    

    async signalFileChange() {
        return await this.post('transactions/sync');
    }

    async getFilesToWatch() {
        return await this.get('transactions/files-to-watch');
    }

    async get(uri) {
        const response = await this.axios.get(uri);
        return response.data;
    }

    async post(uri, data = {}) {
        const response = await this.axios.post(uri, data);
        return response.data;
    }
}

module.exports = CompareInvestmentsService;