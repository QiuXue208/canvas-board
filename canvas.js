var canvas = document.getElementById('canvas')
//获取画布上下文
var context = canvas.getContext('2d')
context.strokeStyle = 'black'

//设置画笔宽度
var lineWidth = 2


/*******设置canvas宽高*******/
autoSetCanvasSize(canvas)

/*****监听用户鼠标*******/
listenToUser(canvas)

/****橡皮擦*****/
var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
}

/******选择画笔粗细******/
brush.onclick = function () {
    eraserEnabled = false
    lineWidth = 2
    brush.classList.add('active')
    eraser.classList.remove('active')
    thickBrush.classList.remove('active')
}
thickBrush.onclick = function(){
    eraserEnabled = false
    lineWidth = 4
    brush.classList.remove('active')
    eraser.classList.remove('active')
    thickBrush.classList.add('active')
}
/******清除画布*****/
clearAll.onclick = function(){
    eraserEnabled = false
    clearAll.classList.add('act')
    save.classList.remove('act')
    eraser.classList.remove('active')
    context.clearRect(0,0,canvas.width,canvas.height)
}
/******保存图画为本地文件*****/
save.onclick = function(){
    save.classList.add('act')
    clearAll.classList.remove('act')
    var a = document.createElement('a')
    a.download = 'canvasImage.png'
    //获取图片的URL
    a.href = canvas.toDataURL()
    //a.target = '_blank'
    a.click() 
}
/*****选择画笔颜色*******/
black.onclick = function(){
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    pink.classList.remove('active')
}
red.onclick = function(){
    context.strokeStyle = 'red'
    black.classList.remove('active')
    red.classList.add('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    pink.classList.remove('active')
}
pink.onclick = function(){
    context.strokeStyle = 'pink'
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    pink.classList.add('active')
}
green.onclick = function(){
    context.strokeStyle = 'green'
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.add('active')
    pink.classList.remove('active')
}
blue.onclick = function(){
    context.strokeStyle = 'blue'
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.add('active')
    green.classList.remove('active')
    pink.classList.remove('active')
}

function autoSetCanvasSize() {
    //设置canvas宽高，其为窗口宽度
    setValue()
    //重新设置窗口大小
    window.onresize = function () {
        setValue()
    }
    //设置画布宽高
    function setValue() {
        //获取页面宽高
        var canvasWidth = document.documentElement.clientWidth
        var canvasHeight = document.documentElement.clientHeight
        //设置canvas宽高
        canvas.width = canvasWidth
        canvas.height = canvasHeight
    }
}

function listenToUser(canvas) {

    //是否使用画布或橡皮擦
    var using = false
    var lastPoint = {'x':undefined,'y':undefined}
  
    //特性检测：不是检查设备，而是检查设备是否支持某个属性
    if(document.body.ontouchstart !== undefined)
    {
        //如果是触屏设备
        canvas.ontouchstart = function (v) {
            var x = v.touches[0].clientX
            var y = v.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                //记录上一个点的坐标
                lastPoint = { "x": x, "y": y }
            }
        }
        canvas.ontouchmove = function (v) {
            var x = v.touches[0].clientX
            var y = v.touches[0].clientY
            if (!using) { return }
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            } else {
                //记录第二个点的坐标
                var newPoint = { "x": x, "y": y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function (v) {
            using = false
        }

    }else{
        //非触屏设备
        canvas.onmousedown = function (v) {
            //获取按下鼠标时的坐标
            var x = v.clientX
            var y = v.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                //记录上一个点的坐标
                lastPoint = { "x": x, "y": y }
            }
        }
        //鼠标动
        canvas.onmousemove = function (v) {
            var x = v.clientX
            var y = v.clientY
            if (!using) { return }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                //记录第二个点的坐标
                var newPoint = { "x": x, "y": y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        //松开鼠标
        canvas.onmouseup = function (v) {
            using = false
        }
    }
    //按下鼠标
   
}
//两个圆点之间画直线
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)//起点
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)//终点
    context.stroke()
    context.closePath()
}
