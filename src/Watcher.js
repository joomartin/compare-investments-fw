class Watcher {
    constructor(fs, eventEmitter, files) {
        this.fs = fs;
        this.files = files;
        this.eventEmitter = eventEmitter;
    }

    watch() {
        const folder = this.getFolder();
        const filenames = this.getShortFilenames();

        this.fs.watch(folder, (event, filename) => {
            if (filenames.includes(filename)) {
                this.eventEmitter.emit('file-changed');
            }
        });

        console.log('Watching files ', filenames);
    }

    getFolder() {
        const parts = this.files[0].split("\\");
        parts.pop();

        return parts.join("\\");
    }

    getShortFilenames() {
        return this.files.map((f) => {
            const parts = f.split("\\");
            return parts[parts.length - 1];
        });
    }
}

module.exports = Watcher;