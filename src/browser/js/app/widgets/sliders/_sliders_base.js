var {clip, mapToScale} = require('../utils')
var _canvas_base = require('../common/_canvas_base')

var _sliders_base = module.exports = function(){

    this.widget = $(`
        <div class="slider">
            <div class="wrapper">
                <canvas></canvas>
            </div>
            <div class="input"></div>
        </div>
    `)

    _canvas_base.apply(this, arguments)

    this.wrapper = this.widget.find('.wrapper')
    this.input = this.widget.find('.input').fakeInput({align:'center'})
    this.value = undefined
    this.percent = 0

    this.unit = this.widgetData.unit ? ' ' + this.widgetData.unit : ''


    this.rangeKeys = []
    this.rangeVals = []
    this.rangeLabels = []

    for (k in this.widgetData.range) {
        var key = k=='min'?0:k=='max'?100:parseInt(k),
            val = typeof this.widgetData.range[k] == 'object'?
                        this.widgetData.range[k][Object.keys(this.widgetData.range[k])[0]]:
                        this.widgetData.range[k],
            label = typeof this.widgetData.range[k] == 'object'?
                        Object.keys(this.widgetData.range[k])[0]:
                        val

        this.rangeKeys.push(key)
        this.rangeVals.push(val)
        this.rangeLabels.push(label)
    }
    this.rangeValsMax = Math.max.apply(Math, this.rangeVals),
    this.rangeValsMin = Math.min.apply(Math, this.rangeVals)

    this.originValue = this.widgetData.origin=='auto'?
                            this.rangeValsMin:
                            clip(this.widgetData.origin,[this.rangeValsMin,this.rangeValsMax])
    this.springValue = this.widgetData.value != '' ? this.widgetData.value :  this.originValue

    this.widget.on('fake-right-click',function(e){
        if (!EDITING) {
            e.stopPropagation()
            e.preventDefault()
            this.input.focus()
        }
    }.bind(this))

    this.widget.on('mousewheel',this.mousewheelHandleProxy.bind(this))
    this.canvas.on('draginit',this.draginitHandleProxy.bind(this))
    this.canvas.on('drag',this.dragHandleProxy.bind(this))

    if (this.widgetData.spring) {
        this.canvas.on('dragend', ()=>{
            this.setValue(this.springValue,{sync:true,send:true,fromLocal:true})
        })
    }

    this.input.change(function(){
        this.setValue(parseFloat(this.input.val()),{sync:true,send:true})
    }.bind(this))


    this.setValue(this.originValue)

}

_sliders_base.prototype = Object.create(_canvas_base.prototype)

_sliders_base.prototype.constructor = _sliders_base


_sliders_base.prototype.mousewheelHandleProxy = function() {
    this.mousewheelHandle.apply(this,arguments)
}

_sliders_base.prototype.draginitHandleProxy = function() {
    this.draginitHandle.apply(this,arguments)
}

_sliders_base.prototype.dragHandleProxy = function() {
    this.dragHandle.apply(this,arguments)
}


_sliders_base.prototype.mousewheelHandle = function(e, data, traversing) {
    if (e.originalEvent.wheelDeltaX) return

    e.preventDefault()
    e.stopPropagation()

    var direction = e.originalEvent.wheelDelta / Math.abs(e.originalEvent.wheelDelta),
        increment = e.ctrlKey?0.25:1

    this.percent = clip(this.percent +  Math.max(increment,10/Math.pow(10,this.widgetData.precision)) * direction  ,[0,100])

    this.setValue(this.percentToValue(this.percent), {sync:true,send:true,dragged:true})


}

_sliders_base.prototype.draginitHandle = function(e, data, traversing) {

}

_sliders_base.prototype.dragHandle = function(e, data, traversing) {

}


_sliders_base.prototype.resizeHandle = function(e, width, height, checkColors) {
    if (!this.visible || checkColors) {
        var style =  getComputedStyle(this.widget[0])
        this.colors.track = style.getPropertyValue('--color-track')
        this.colors.gauge = style.getPropertyValue('--color-gauge')
        this.colors.knob = style.getPropertyValue('--color-knob')
    }
    _canvas_base.prototype.resizeHandle.apply(this, arguments)
}


_sliders_base.prototype.percentToValue = function(percent) {
    var h = clip(percent,[0,100])
    for (var i=0;i<this.rangeKeys.length-1;i++) {
        if (h <= this.rangeKeys[i+1] && h >= this.rangeKeys[i]) {
            return mapToScale(h,[this.rangeKeys[i],this.rangeKeys[i+1]],[this.rangeVals[i],this.rangeVals[i+1]],false,this.widgetData.logScale)
        }
    }
}
_sliders_base.prototype.valueToPercent = function(value) {
    for (var i=0;i<this.rangeVals.length-1;i++) {
        if (value <= this.rangeVals[i+1] && value >= this.rangeVals[i]) {
            return mapToScale(value,[this.rangeVals[i],this.rangeVals[i+1]],[this.rangeKeys[i],this.rangeKeys[i+1]],false,this.widgetData.logScale,true)
        }
    }
}

_sliders_base.prototype.setValue = function(v,options={}) {
    if (typeof v != 'number') return

    var value = clip(v,[this.rangeValsMin,this.rangeValsMax])

    if ((options.dragged || options.fromLocal) && this.value.toFixed(this.widgetData.precision) == value.toFixed(this.widgetData.precision)) options.send = false

    this.value = value

    if (!options.dragged) this.percent = this.valueToPercent(this.value)

    if (!this.noDraw) this.draw()

    this.showValue()

    if (options.sync) this.widget.trigger({type:'sync',id:this.widgetData.id,widget:this.widget, linkId:this.widgetData.linkId, options:options})
    if (options.send) this.sendValue(v)
}

_sliders_base.prototype.showValue = function() {
    this.input.val(this.value.toFixed(this.widgetData.precision) + this.unit)
}
