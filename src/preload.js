const { Color, Titlebar } = require("custom-electron-titlebar");
const { join } = require('path');
const { format } = require("url");

window.addEventListener('DOMContentLoaded', () => {

    console.log("cai aqui");
    new Titlebar({
        backgroundColor: Color.fromHex('#2f3241'),
        icon: format(join(__dirname, '/images', '/icon.png'))
    })

    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', electron]) {
        replaceText(`${type}-version`, process.versions[type])
    }
})