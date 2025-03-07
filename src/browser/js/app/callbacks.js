var init = require('./init'),
    actions = require('./actions'),
    utils = require('./utils'),
    icon = utils.icon,
    ipc = require('./ipc'),
    osc = require('./osc')

var callbacks = module.exports = {

    receiveOsc: function(data){
        osc.receive(data)
    },

    connected:function(){
        LOADING.close()
    },

    stateLoad: function(data){
        data = JSON.parse(data)
        actions.stateSet(data,true)
        actions.stateQuickSave(data)
    },

    sessionList: function(data){

        var lobby = $(`
            <div class="main">
                <div class="header">
                    Open Stage Control
                </div>
                <div class="list"></div>
                <div class="footer"></div>
            </div>`),
            list = lobby.find('.list'),
            footer = lobby.find('.footer')

        for (i in data) {
            var max = 50
            var path = data[i],
                file = path.split('\\').pop().split('/').pop(),
                length = data[i].length
            path = path.replace(file,'')
            if (length > max - 3) {
                path = path.substr(0,Math.floor((path.length)/2)-(length-max)/2) + '...' + path.substr(Math.ceil((path.length)/2)+(length-max)/2, path.length)
            }

            list.append('<a class="btn load" data-session="'+data[i]+'">'+file+' <em style="opacity:0.45">('+path+')</em><span>'+icon('remove')+'</span></a>')
        }
        footer.append('<a class="btn browse">'+icon('folder-open')+' Browse</a>')
        footer.append('<a class="btn new">'+icon('file-o')+' New</a>')
        lobby.find('.load').click(function(e){
            e.stopPropagation()
            ipc.send('sessionOpen',{path:$(this).data('session')})
        })
        lobby.find('a span').click(function(e){
            e.stopPropagation()
            ipc.send('sessionRemoveFromHistory',$(this).parent().data('session'))
            $(this).parents('a').remove()
        })
        lobby.find('.browse').click(function(e){
            e.stopPropagation()
            actions.sessionBrowse()
        })
        lobby.find('.new').click(function(e){
            e.stopPropagation()
            module.exports.sessionNew()
        })
        $('#lobby').append(lobby)
        setTimeout(()=>{
            lobby.addClass('loaded')
        })
    },

    sessionOpen: function(data){
        var session = JSON.parse(data)
        init(session,function(){
            ipc.send('sessionOpened')
        })

    },

    sessionNew: function(){
        init([{}],function(){
            $('#open-toggle, .enable-editor').click()
            $('.editor-root').trigger('fake-click')
        })
    },

    stateSend:function(){
        var p = utils.loading('New client connecting...')

        setTimeout(function(){

            osc.syncOnly = true
            actions.stateSend()
            osc.syncOnly = false

            p.close()
        },150)
    },

    error: function(data){
        utils.createPopup(icon('warning')+'&nbsp;'+data.title,data.text,true)
    },

    applyStyle: function(data){
        var style = document.createElement('style');
        style.innerHTML = data.join('');
        document.body.appendChild(style);
        GRIDWIDTH =  getComputedStyle(document.documentElement).getPropertyValue("--grid-width")
        PXSCALE =  getComputedStyle(document.documentElement).getPropertyValue("--pixel-scale")
        INITIALZOOM = PXSCALE
    },

    reloadCss: function(){
        var queryString = '?reload=' + new Date().getTime();
        $('link[rel="stylesheet"][hot-reload]').each(function () {
            this.href = this.href.replace(/\?.*|$/, queryString);
        });
        setTimeout(()=>{
            $('canvas').trigger('resize',[0,0,true])
        },100)
        GRIDWIDTH =  getComputedStyle(document.documentElement).getPropertyValue("--grid-width")
        PXSCALE =  getComputedStyle(document.documentElement).getPropertyValue("--pixel-scale")
        INITIALZOOM = PXSCALE
    }

}

var bindCallback = function(i) {
    ipc.on(i,function(data){
        callbacks[i](data)
    })
}

for (i in callbacks) {
    bindCallback(i)
}
