import React, { useRef, useEffect } from 'react'
import {Button, Grid, TextField, Box, Typography, Container, withStyles, spacing} from '@material-ui/core';
import {generateRandom} from './Engine.js';

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

    // based on current dx/dy
    const moveCtx = (ctx, l) => {
        x += dx * l;
        y += dy * l;
        ctx.moveTo(x, y);
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

    const beginNormal = (ctx, a, b) => {
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
    }
    
    const endCircuit = ctx => {
        ctx.lineTo(ix, iy);
        ctx.stroke();
    }

    const endHere = ctx => {
        ctx.moveTo(ix, iy);
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

    const drawFrom2DArray = (arr, ctx) => {
        var beginY = 50;
        var beginX = 550;
        for(let i = 0; i < arr.length; i++) {
            if (i % 2 == 0) {;
                for (let j = 0; j < arr.length; j++) {
                    if (j == 0) {
                        beginNormal(ctx, beginX, beginY);
                        drawWire(ctx, 50);
                        continue;
                    }

                    if (arr[i][j] === 0) {
                        drawWire(ctx, 50);
                    }
                    else if (arr[i][j] === 1) {
                        drawResistor(ctx);
                    }
                    else if (arr[i][j] === 3) {
                        drawCapacitor(ctx);
                    }
                    else if (arr[i][j] === 2) {
                        drawInductor(ctx);
                    }
                    else if (arr[i][j] === 10) {
                        drawPower(ctx);
                    }
                    else if (arr[i][j] === -1) {
                        moveCtx(ctx, 50);
                    }
                }
                endHere(ctx);
            }
            else {
                var baseX = ix;
                var baseY = iy;
           
                for (let j = 0; j < arr.length; j++) {
                    if (j == 0) {
                        beginNormal(ctx, baseX, baseY);
                        turnClockwise(ctx);
                    }

                    if (arr[i][j] === 0) {
                        drawWire(ctx, 50);
                        console.log("wire drawn")
                    }
                    else if (arr[i][j] === 1) {
                        drawResistor(ctx);
                    }
                    else if (arr[i][j] === 3) {
                        drawCapacitor(ctx);
                    }
                    else if (arr[i][j] === 2) {
                        drawInductor(ctx);
                    }
                    else if (arr[i][j] === 10) {
                        drawPower(ctx);
                    }
                    else if (arr[i][j] === -1) {
                        moveCtx(ctx, 50);
                    }
                    
                    moveCtx(ctx, -50);
                    turnCounterClockwise(ctx);
                    console.log(arr.length);
                    console.log(j);
                     if (j == 0) {
                        moveCtx(ctx, 75);
                     }
                     else if (j === arr.length - 2) {
                        moveCtx(ctx, 75);
                     }
                    else (
                        moveCtx(ctx, 50)
                    )
           
                    turnClockwise(ctx);

                }
                endHere(ctx);
        
                
                beginY += 50;
            }
        }
    }


    const clear = ctx => {
        ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
    }

    var circuitArr = [];

    const newCircuit = () => {
        circuitArr = generateRandom();

        // setup canvas based on circuit size
        const canvas = canvasRef.current;
        canvas.height = CANVASHEIGHT;
        canvas.width = CANVASWIDTH;

        const context = canvas.getContext('2d');

        drawFrom2DArray(circuitArr, context);   
    }


    return ( 
        <div>
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing = {3}>
            <canvas ref={canvasRef} {...props}/>
                <Grid item align="center" xs={12}>
                        <Button variant="contained" color="primary" onClick={newCircuit}>
                            New Circuit
                        </Button>
                </Grid>
            </Grid>

        </div>
    
    );
        
}

export default Canvas