const axios = require('axios');
const fs = require('fs');
const EventEmitter = require('events');

const config = require('./config.json');
const CompareInvestmentsService = require('./src/services/CompareInvestmentsService');
const Wathcer = require('./src/Watcher');

(async () => {
    try {        
        axios.defaults.baseURL = config.apiBaseUrl;
        const service = new CompareInvestmentsService(axios, config);

        const emitter = new EventEmitter;
        emitter.on('file-changed', () => {
            service.signalFileChange();
        });

        const files = await service.getFilesToWatch();
        const wathcer = new Wathcer(fs, emitter, files);

        wathcer.watch();

    } catch (ex) {
        console.error(ex);
    }    
})();