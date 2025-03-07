var path = require('path'),
    {BrowserWindow} = require('electron'),
    shortcut = require('electron-localshortcut'),
    settings = require('./settings')

module.exports = function(options={}) {

    var window

    window = new BrowserWindow({
        width: options.width || 800,
        height: options.height || 600,
        title: options.title || settings.read('appName'),
        backgroundColor:'#202329',
        type:options.type
    })

    window.loadURL(options.address)

    window.on('closed', function() {
        window = null
    })

    window.setMenuBarVisibility(false)

    if (options.shortcuts) {

        shortcut.register(window,'CmdOrCtrl+R',function(){
            window.reload()
        })

        shortcut.register(window,'F11',function(){
            window.setFullScreen(!window.isFullScreen())
        })

        shortcut.register(window,'F12',function(){
            window.toggleDevTools();
        })

    } else {
        shortcut.register(window,'CmdOrCtrl+R',function(e){
            return false
        })
    }

    return window

}
