import React, { useRef, useEffect } from 'react'

var ix;
var iy;
var x;
var y;
var d;
var dx;
var dy;

const CANVASWIDTH = window.innerWidth;
const CANVASHEIGHT = 250;

const Canvas = props => {
  
    const canvasRef = useRef(null);
  
    const draw = ctx => {
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20, 0, 2*Math.PI)
        ctx.fill()
    }

    const drawWire = (ctx, l) => {
        x += dx * l;
        y += dy * l;
        ctx.lineTo(x, y);
    }

    const drawPower = ctx  => {
        var n;
        drawWire(ctx, 10);
        n = 3;
        ctx.moveTo(x + 10 * dy, y + 10 * dx);
        ctx.lineTo(x - 10 * dy, y - 10 * dx);
        x += dx * 5;
        y += dy * 5;
        while (n--) {
            ctx.moveTo(x + 15 * dy, y + 15 * dx);
            ctx.lineTo(x - 15 * dy, y - 15 * dx);
            x += dx * 5;
            y += dy * 5;
            ctx.moveTo(x + 10 * dy, y + 10 * dx);
            ctx.lineTo(x - 10 * dy, y - 10 * dx);
            if (n !== 0) {
                x += dx * 5;
                y += dy * 5;
            }
        }
        ctx.moveTo(x, y);
        drawWire(ctx, 10);
    }
    
    const beginCircuit = (ctx, a, b) => {
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        x = a;
        y = b;
        d = 0;
        dx = 1;
        dy = 0;
        ix = x;
        iy = y;
        ctx.moveTo(x, y);
        drawWire(ctx, 50);
        drawPower(ctx);
    }
    
    const endCircuit = ctx => {
        ctx.lineTo(ix, iy);
        ctx.stroke();
    }

    const turnClockwise = () => {
        d++;
        dx = Math.cos(1.570796 * d);
        dy = Math.sin(1.570796 * d);
    }
    
    const turnCounterClockwise = () => {
        d--;
        dx = Math.cos(1.570796 * d);
        dy = Math.sin(1.570796 * d);
    }
  
    const drawCapacitor = ctx => {
        drawWire(ctx, 22.5);
        ctx.moveTo(x + 10 * dy, y + 10 * dx);
        ctx.lineTo(x - 10 * dy, y - 10 * dx);
        x += dx * 5;
        y += dy * 5;
        ctx.moveTo(x + 10 * dy, y + 10 * dx);
        ctx.lineTo(x - 10 * dy, y - 10 * dx);
        ctx.moveTo(x, y);
        drawWire(ctx, 22.5);
    }
    
    const drawInductor = ctx => {
        var n, xs, ys;
        drawWire(ctx, 9);
        n = 4;
        xs = 1 + Math.abs(dy);
        ys = 1 + Math.abs(dx);
        x += dx * 6;
        y += dy * 6;
        ctx.scale(xs, ys);
        while (n--) {
            //ctx.moveTo(x/xs+5*Math.abs(dx),y/ys+5*dy);
            ctx.moveTo(x / xs + 5 * Math.abs(dx), y / ys + 5 * dy);
            ctx.arc(x / xs, y / ys, 5, Math.PI / 2 * dy, Math.PI + Math.PI / 2 * dy, 1);
            x += 6.5 * dx;
            y += 6.5 * dy;
            if (n !== 0) {
                if (dx >= 0) {
                    ctx.moveTo(x / xs - 5 * dx, y / ys - 5 * dy);
                    //ctx.lineTo(0,0);
                }
    
                ctx.moveTo(x / xs - 5 * dx, y / ys - 5 * dy);
                //alert("a"+ctx.stroke());
                ctx.arc(x / xs - 6.5 / 2 * dx, y / ys - 6.5 / 2 * dy, 1.5, Math.PI + Math.PI / 2 * dy, Math.PI / 2 * dy, 1);
            }
        }
        ctx.moveTo(x / xs - 1.75 * dx, y / ys - 1.75 * dy);
        ctx.scale(1 / xs, 1 / ys);
        ctx.lineTo(x, y);
        drawWire(ctx, 9);
    }

    const drawResistor = ctx => {
        var n;
        drawWire(ctx, 10);
        n = 5;
        x += dx * 5;
        y += dy * 5;
        while (n--) {
            ctx.lineTo(x - 5 * dy, y - 5 * dx);
            ctx.lineTo(x + 5 * dy, y + 5 * dx);
            x += 5 * dx;
            y += 5 * dy;
        }
        ctx.lineTo(x, y);
        drawWire(ctx, 10);
    }

    const drawTrimmer = ctx => {
        ctx.moveTo(x + 35 * dx - 7 * dy, y + 35 * dy - 7 * dx);
        ctx.lineTo(x + 15 * dx + 7 * dy, y + 15 * dy + 7 * dx);
        ctx.moveTo(x + 13 * dx + 4 * dy, y + 13 * dy + 4 * dx);
        ctx.lineTo(x + 17 * dx + 10 * dy, y + 17 * dy + 10 * dx);
        ctx.moveTo(x, y);
        drawCapacitor(ctx);
    }

    const clear = ctx => {
        ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
    }

    useEffect(() => {
        
        const canvas = canvasRef.current;
        canvas.height = CANVASHEIGHT;
        canvas.width = CANVASWIDTH;

        console.log(window.innerHeight);

        const context = canvas.getContext('2d');



        beginCircuit(context, 10, 10);
        drawWire(context, 50);
        turnClockwise();
        drawWire(context, 150);
        turnClockwise();
        drawWire(context, 50);
        drawInductor(context);
        drawWire(context, 50);
        turnClockwise();
        endCircuit(context);

        
        
    } )
    
    return <canvas ref={canvasRef} {...props}/>
        
}

export default Canvas