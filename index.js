const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let path = []
let redostack = []
let drawing = false
let current_tool = "pencil"
let  current_color = "#00000"
let brush_size = "5"

function canvasetup (){
    const rect = canvas.getBoundingClientRect()
    const dpi = window.devicePixelRatio;

    canvas.height = rect.height*dpi;
    canvas.weight = rect.width*dpi;
}
canvasetup()

document.addEventListener('DOMContentLoaded', (event)=>{
    document.getElementById('pencilbutton').addEventListener("click", ()=>setactivateto())
    document.getElementById('eraserbutton').addEventListener("click", ()=>setactivateto())
    document.getElementById('undobutton').addEventListener("click", ()=>undolastbutton())
    document.getElementById('redobutton').addEventListener("click", ()=>redolastbutton())
    document.getElementById('clear_allbutton').addEventListener("click", ()=>clear_allbutton())
    document.getElementById('colorpicker').addEventListener("onChange",(e)=>{
        color_picker = e.target.value
    })
    document.getElementById('range').addEventListener("input",(e)=>{
        brush_size = e.target.value
    })
    canvas.addEventListener("mouseup",stopdrawing)
    canvas.addEventListener("mousedown",startdrawing)
    canvas.addEventListener("mousemove",draw)
})
