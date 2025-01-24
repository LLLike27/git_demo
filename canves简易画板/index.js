
const container = document.querySelector('.canvas-box')
const cursorDom = document.querySelector('.cursor')
const fileDom = document.querySelector('input[type="file"]')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d', { willReadFrequently: true })
const cursor = document.querySelector('.cursor')
const usePencil = document.querySelector('button[name="usePencil"]')
const useEraser = document.querySelector('button[name="useEraser"]')
const pencilRange = document.querySelector('input[name="pencil"]')
const eraserRange = document.querySelector('input[name="eraser"]')
const qualityRange = document.querySelector('input[name="quality"]')
const colorPick = document.querySelector('input[name="color"]')
const waterMarkColorPick = document.querySelector('input[name="waterMarkColor"]')
const waterMarkOpacityRange = document.querySelector('input[name="waterMarkOpacity"]')
const imgTypeRadios = document.querySelectorAll('input[data-type="imgType"]')
const imgRuleRadios = document.querySelectorAll('input[data-type="imgRule"]')
const fontSizeRange = document.querySelector('input[name="fontSize"]')
const xRange = document.querySelector('input[name="x"]')
const yRange = document.querySelector('input[name="y"]')
const rotateRange = document.querySelector('input[name="rotate"]')
const offsetRangeX = document.querySelector('input[name="offsetX"]')
const offsetRangeY = document.querySelector('input[name="offsetY"]')
const maxWidthRange = document.querySelector('input[name="maxWidth"]')
const reset = document.querySelector('button[name="reset"]')
const undo = document.querySelector('button[name="undo"]')
const redo = document.querySelector('button[name="redo"]')
const save = document.querySelector('button[name="save"]')
const upload = document.querySelector('button[name="upload"]')
const waterMark = document.querySelector('button[name="waterMark"]')

const canvasDefaultSize = 600
canvas.width = canvasDefaultSize
canvas.height = canvasDefaultSize
let pencil = 20
let eraser = 20
let quality = 0.8
let imgType = 'png'
let imgRule = 'long'
let isPencil = true
let isEraser = false
let isDrawingLine = false
let colors = '#000'
let historyIdx = 0
let history = []
let canvasArea = [0, 0, canvas.width, canvas.height]
let text = '大吉大利，今晚吃鸡'
let rotate = -25
let maxWidth = 200
let offsetX = 50
let offsetY = 50
let gap = [100, 100]

const setCursorSize = size => {
    cursor.style.width = size + 'px'
    cursor.style.height = size + 'px'
}

pencilRange.oninput = e => {
    if (!e.target.value) e.target.value = 20
    pencil = e.target.valueAsNumber
    isPencil && setCursorSize(pencil)
}

eraserRange.oninput = e => {
    if (!e.target.value) e.target.value = 20
    eraser = e.target.valueAsNumber
    isEraser && setCursorSize(eraser)
}

qualityRange.oninput = e => {
    if (!e.target.value) e.target.value = 0.8
    quality = e.target.valueAsNumber
}

fontSizeRange.oninput = e => {
    if (!e.target.value) e.target.value = 14
    ctx.font = `500 ${e.target.valueAsNumber}px sans-serif`
}

xRange.oninput = e => {
    if (!e.target.value) e.target.value = 100
    gap[0] = e.target.valueAsNumber
}

yRange.oninput = e => {
    if (!e.target.value) e.target.value = 100
    gap[1] = e.target.valueAsNumber
}

rotateRange.oninput = e => {
    if (Number.isNaN(e.target.valueAsNumber)) e.target.value = -25
    rotate = e.target.valueAsNumber
}

offsetRangeX.oninput = e => {
    if (Number.isNaN(e.target.valueAsNumber)) e.target.value = 50
    offsetX = e.target.valueAsNumber
}

offsetRangeY.oninput = e => {
    if (Number.isNaN(e.target.valueAsNumber)) e.target.value = 50
    offsetY = e.target.valueAsNumber
}

maxWidthRange.oninput = e => {
    if (Number.isNaN(e.target.valueAsNumber)) e.target.value = 200
    maxWidth = e.target.valueAsNumber
}

waterMarkOpacityRange.oninput = e => {
    const [r, g, b] = hex2Rgb(waterMarkColorPick.value)
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${waterMarkOpacityRange.valueAsNumber})`
}

fileDom.oninput = e => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(e.target.files[0])
    fileReader.onload = e => {
        const img = document.createElement('img')
        img.src = e.target.result
        img.onload = () => {
            let wh = [img.width, img.height]
            let canvasWh = [canvasDefaultSize, canvasDefaultSize]
            if (imgRule === 'long') {
                const ratio = canvasDefaultSize / Math.max(...wh)
                wh = [img.width * ratio, img.height * ratio]
            } else if (imgRule === 'short') {
                const ratio = canvasDefaultSize / Math.min(...wh)
                wh = [img.width * ratio, img.height * ratio]
            } else {
                canvasWh = [img.width, img.height]
            }
            ctx.clearRect(...canvasArea)
            canvasArea = [0, 0, ...canvasWh]
            canvas.width = canvasWh[0]
            canvas.height = canvasWh[1]
            ctx.drawImage(img, 0, 0, ...wh)
        }
    }
}

imgTypeRadios.forEach(el => {
    el.onclick = () => {
        imgTypeRadios.forEach(el2 => el2.checked = false)
        el.checked = true
        imgType = el.name
    }
})

imgRuleRadios.forEach(el => {
    el.onclick = () => {
        imgRuleRadios.forEach(el2 => el2.checked = false)
        el.checked = true
        imgRule = el.name
    }
})

colorPick.oninput = e => (colors = e.target.value)

waterMarkColorPick.oninput = e => {
    const [r, g, b] = hex2Rgb(e.target.value)
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${waterMarkOpacityRange.valueAsNumber})`
}

// 撤销
undo.onclick = () => {
    historyIdx--
    if (historyIdx <= -1) {
        historyIdx = -1
        ctx.clearRect(...canvasArea)
    } else {
        ctx.putImageData(history[historyIdx], 0, 0)
    }
}

// 恢复
redo.onclick = () => {
    historyIdx++
    if (historyIdx > history.length - 1) historyIdx = history.length - 1
    else ctx.putImageData(history[historyIdx], 0, 0)
}

save.onclick = () => {
    const a = document.createElement('a')
    a.href = canvas.toDataURL(`image/${imgType}`, quality)
    a.download = `save_${Date.now()}`
    document.body.append(a)
    a.click()
    a.remove()
}

upload.onclick = () => {
    fileDom.value = ''
    fileDom.click()
}

usePencil.onclick = () => {
    isPencil = true
    isEraser = false
    setCursorSize(pencil)
}

useEraser.onclick = () => {
    isPencil = false
    isEraser = true
    setCursorSize(eraser)
}

reset.onclick = () => {
    history = []
    historyIdx = -1
    ctx.clearRect(...canvasArea)
    canvas.width = canvasDefaultSize
    canvas.height = canvasDefaultSize
    canvasArea = [0, 0, canvas.width, canvas.height]
    const [r, g, b] = hex2Rgb(waterMarkColorPick.value)
    waterMarkOpacityRange.oninput()
    ctx.font = `500 ${fontSizeRange.valueAsNumber}px sans-serif`
}
waterMark.onclick = () => {
    let [x, y] = gap
    let [, , w, h] = canvasArea
    const xLine = Math.ceil((w - offsetX) / x)
    const yLine = Math.ceil((h - offsetY) / y)
    waterMarkOpacityRange.oninput()
    ctx.font = `500 ${fontSizeRange.valueAsNumber}px sans-serif`
    for (let i = 0; i <= xLine; i++) {
        const x0 = x * i + offsetX
        for (let j = 0; j <= yLine; j++) {
            drawWaterMark(x0, y * j + offsetY)
        }
    }
}
const drawWaterMark = (x, y) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotate / 180 * Math.PI)
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0, maxWidth)
    ctx.restore()
}

canvas.onmousedown = e => {
    // 只允许左键
    if (e.button) return
    if (!isPencil && !isEraser) return false
    isDrawingLine = true
    ctx.beginPath()
    ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over'
    ctx.strokeStyle = isEraser ? '#fff' : colors
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = isEraser ? eraser : pencil
    ctx.moveTo(e.offsetX, e.offsetY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    canvas.onmousemove = composeCanvasMousemove
}

canvas.onmouseup = () => {
    if (!isPencil && !isEraser) return false
    isDrawingLine = false
    canvas.onmousemove = null
    // 使用了橡皮时，必须存在历史记录，否则不做任何事
    if (isEraser && !history.length) return false
    addOneHistory(lineToAlpha())
}

container.onmouseenter = (e) => {
    if (!container.contains(e.toElement)) return
    if (isPencil || isEraser) {
        // 离开画布时，若正在使用划线功能，重新开启一个路径
        if (isDrawingLine) {
            ctx.beginPath()
            ctx.moveTo(e.offsetX, e.offsetY)
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
        }
        canvas.style.cursor = 'none'
        cursorDom.style.opacity = '1'
        cursorDom.style.left = e.offsetX + 'px'
        cursorDom.style.top = e.offsetY + 'px'
        cursorDom.style.boxShadow = `0 0 0 2px ${isPencil ? colors : '#ccc'} inset`
    } else canvas.style.cursor = 'default'
}

container.onmousemove = e => {
    if (isPencil || isEraser) {
        cursorDom.style.opacity = '1'
        cursorDom.style.left = e.offsetX + 'px'
        cursorDom.style.top = e.offsetY + 'px'
        return false
    }
}

container.onmouseout = (e) => {
    if (!container.contains(e.fromElement)) return
    cursorDom.style.opacity = '0'
}

const composeCanvasMousemove = (e) => {
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
}

const lineToAlpha = () => {
    const imageData = ctx.getImageData(...canvasArea)
    // if (isPencil) {
    //   const data = imageData.data
    //   for (let i = 0; i < data.length - 1; i += 4) {
    //     if (data[i + 3] > colors[3]) data[i + 3] = colors[3]
    //   }
    //   ctx.putImageData(imageData, 0, 0)
    // }
    return imageData
}

// 添加一项历史记录
const addOneHistory = (json) => {
    if (history.length - 1 !== historyIdx) {
        history = history.slice(0, historyIdx + 1)
    }
    historyIdx = history.push(json) - 1
}

// hex 2 rgb
const hex2Rgb = hex => {
    const red = hex.substring(1, 3)
    const green = hex.substring(3, 5)
    const blue = hex.substring(5, 7)
    return [
        parseInt(red, 16),
        parseInt(green, 16),
        parseInt(blue, 16)
    ]
}

// 鼠标抬起时，发现不处于画布内，调用画笔结束
const handleLeaveCanvas = (e) => {
    if (!isDrawingLine) return
    if (!container.contains(e.target)) canvas.onmouseup()
}
window.addEventListener('mouseup', handleLeaveCanvas)

setCursorSize(pencil)
