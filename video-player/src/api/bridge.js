const {
    contextBridge,
    ipcRenderer
} = require('electron');

contextBridge.exposeInMainWorld("winAction", {
    //Method to put app into fullscreen
    async setFullscreen(b) {
        const res = await ipcRenderer.invoke('fullscreen', b)
        return res;
    },

    //Method to put app into fullscreen
    async action(a) {
        const res = await ipcRenderer.invoke('winAction', a)
        return res;
    }
})

contextBridge.exposeInMainWorld("loader", {
    //Method to put app into fullscreen
    async getFile() {
        const res = await ipcRenderer.invoke('getFile')
        return res;
    }
})