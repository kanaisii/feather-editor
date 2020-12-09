const {app,Menu,BrowserWindow} = require('electron');
const path = require('path');

function createWindow() {
    win = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            enableRemoteModule: true,
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    win.loadFile('renderer/index.html');
    return win.id;
}

function createMenu() {
    let menu_temp = [
        {
            label: 'File',
            submenu: [
                {label: 'New', click: () =>{
                    createWindow();
                }},
                {role: 'close'},
                {type: 'separator'},
                {role: 'quit'}
            ]
        },
        {role: 'editMenu'},
        {
            label: 'Theme',
            submenu: [
                {label: 'textmate', click: () => setTheme('textarea')},
                {label: 'chrome', click: () => setTheme('chrome')},
                {label: 'dracula', click: () => setTheme('dracula')},
                {label: 'tomorrow_night', click: () => setTheme('tomorrow_night')}
            ]
        },
        {
            label: 'Mode',
            submenu: [
                {label: 'text', click: () => setMode('text')},
                {label: 'markdown', click: () => setMode('markdown')}
            ]
        },
        {
            label: 'Font',
            submenu: [
                {label: '14', click: () => setFontSize(14)},
                {label: '16', click: () => setFontSize(16)},
                {label: '18', click: () => setFontSize(18)},
                {label: '20', click: () => setFontSize(20)},
                {label: '24', click: () => setFontSize(24)}
            ]
        }
    ];
    let menu = Menu.buildFromTemplate(menu_temp);
    Menu.setApplicationMenu(menu);
}

function setTheme(tname) {
    console.log("Theme Change");
    let w = BrowserWindow.getFocusedWindow();
    w.webContents.executeJavaScript('setTheme("' + tname + '")');
}
function setMode(mname) {
    console.log("Mode Chage");
    let w = BrowserWindow.getFocusedWindow();
    w.webContents.executeJavaScript('setMode("' + mname + '")');
}
function setFontSize(n) {
    console.log("Font Chage");
    let w = BrowserWindow.getFocusedWindow();
    w.webContents.executeJavaScript('setFontSize(' + n + ')');
}

createMenu();
app.whenReady().then(createWindow);