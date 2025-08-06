const canvasContainer = document.getElementById("canvas");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;
canvas.style.backgroundColor = "#fff";
canvas.style.cursor = "crosshair";

canvasContainer.appendChild(canvas);

// Tools
const pencilButton = document.getElementById("pencilbutton");
const eraserButton = document.getElementById("eraserbutton");
const undoButton = document.getElementById("undobutton");
const redoButton = document.getElementById("redobutton");
const clearButton = document.getElementById("clear_allbutton");
const colorPicker = document.getElementById("colorpicker");
const range = document.getElementById("range");

// Drawing States
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let strokeColor = "#000000";
let strokeWidth = 5;
let isEraser = false;

const undoStack = [];
const redoStack = [];

function startDraw(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    saveState(undoStack);
    redoStack.length = 0;
}

function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = isEraser ? "#ffffff" : strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDraw() {
    isDrawing = false;
}

// Events
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseout", stopDraw);

pencilButton.addEventListener("click", () => {
    isEraser = false;
});

eraserButton.addEventListener("click", () => {
    isEraser = true;
});

colorPicker.addEventListener("input", (e) => {
    strokeColor = e.target.value;
});

range.addEventListener("input", (e) => {
    strokeWidth = e.target.value;
});

clearButton.addEventListener("click", () => {
    saveState(undoStack);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redoStack.length = 0;
});

undoButton.addEventListener("click", () => {
    if (undoStack.length > 0) {
        saveState(redoStack);
        const imgData = undoStack.pop();
        ctx.putImageData(imgData, 0, 0);
    }
});

redoButton.addEventListener("click", () => {
    if (redoStack.length > 0) {
        saveState(undoStack);
        const imgData = redoStack.pop();
        ctx.putImageData(imgData, 0, 0);
    }
});

function saveState(stack) {
    stack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}
