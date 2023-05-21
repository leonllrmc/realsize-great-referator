const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const meter = document.getElementById("meter");

const shapeInput = document.getElementById("shapeType"); // TODO: mask inputs when selecting shapes
shapeInput.addEventListener("change", selectShape);
const circleDiameterInput = document.getElementById("circleDimensions");
circleDiameterInput.addEventListener("change", render);

const rectWidthInput = document.getElementById("rectWidth");
rectWidthInput.addEventListener("change", render);
const rectHeightInput = document.getElementById("rectHeight");
rectHeightInput.addEventListener("change", render);

const circleInputs = document.getElementsByClassName("circle");
const rectInputs = document.getElementsByClassName("rect");

document.addEventListener('DOMContentLoaded', render);
window.addEventListener('resize', render);

const preventDefault = (e) => e.preventDefault();
document.getElementById("optionForm").addEventListener("submit", preventDefault);

function selectShape()
{
    let type = shapeInput.value;
    

    const pxpmm = meter.clientWidth/10; // pixel per mm

    if (type == "rect")
    {
        Array.from(rectInputs).forEach((el) => 
        {
            el.style.display = "block";
        })

        Array.from(circleInputs).forEach((el) => 
        {
            el.style.display = "none";
        })
    }
    else
    {
        Array.from(rectInputs).forEach((el) => 
        {
            el.style.display = "none";
        })
        
        Array.from(circleInputs).forEach((el) => 
        {
            el.style.display = "block";
        })
    }
    render();
}

function render() 
{
    // put canvas to proper size
    canvas.width = window.screen.availWidth;
    canvas.height = window.screen.availHeight;

    const pxpmm = meter.clientWidth/10; // pixel per mm

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#282933";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#00F0FF';
    // ctx.strokeRect(0, 0, canvas.width, canvas.height);
    let type = shapeInput.value;

    ctx.strokeText(`pixel reference: ${pxpmm}px/mm`, 5, 15, 5000);

    if (type == "rect")
    {
        let width = rectWidthInput.value;
        let height = rectHeightInput.value;
        ctx.strokeRect(canvas.width / 2 - (width * 2), canvas.height / 2 - (height * 2.2), pxpmm * width, pxpmm * height);
    }
    else
    {
        ctx.arc(canvas.width / 2, canvas.height / 2 - (circleDiameterInput.value/2), (circleDiameterInput.value/2) * pxpmm, 0, 2 * Math.PI);
        ctx.stroke();
    }
}