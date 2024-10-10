"use client"; // Mark the component as a Client Component
import React, { useEffect, useRef, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardFooter,
} from "@/components/ui/card";

type AdjacentArm = {
  x : number,
  y : number
}

export default function Canvas2D() {
  const [slider1, setSlider1] = useState(0);
  const [slider2, setSlider2] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderFrame = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          drawReferenceLine(context, 50, 300, 550, 300);
          let arm1result:AdjacentArm = drawServoArm(context, slider1, 200, 100); // first arm
          let arm2result:AdjacentArm = drawServoArm(context, slider2, 400, 100); // second arm
          drawAdjacentArm(context,slider1,slider2,arm1result);
          drawAdjacentArm(context,slider1,slider2,arm2result);
        } else {
          throw new Error('Could not get context');
        }
      }
    };
    renderFrame(); // Call immediately instead of using requestAnimationFrame
  }, [slider1, slider2]); // Depend on both slider1 and slider2

  function drawReferenceLine(
    context: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): void {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.lineWidth = 2;
    context.strokeStyle = "white";
    context.stroke();
  }

  function drawServoArm(context: CanvasRenderingContext2D, angle: number, x0: number, y0: number): { x:number ,y:number } {
    const length = 100;
    const angleInRadians = angle * (Math.PI / 180);
    const x = x0 + length * Math.cos(angleInRadians);
    const y = y0 + length * Math.sin(angleInRadians);
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x, y);
    context.lineWidth = 5;
    context.strokeStyle = "red";
    context.stroke();
    return { x, y }
  }

  function drawAdjacentArm(context:CanvasRenderingContext2D,angle1:number,angle2:number,armResult:AdjacentArm){
    const length = 100;
    const angleInRadians = angle1 * (Math.PI / 180);
    const x = armResult.x + length * Math.cos(angleInRadians);
    const y = armResult.y + length * Math.sin(angleInRadians);
    context.beginPath();
    context.moveTo(armResult.x, armResult.y);
    context.lineTo(x, y);
    context.lineWidth = 5;
    context.strokeStyle = "red";
    context.stroke();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginBottom: "10px", fontSize: "20px" }}>2D Canvas</div>
      <canvas
        ref={canvasRef}
        width="600"
        height="400"
        style={{ border: "1px solid black" }}
      ></canvas>
      <div style={{ marginTop: "10px", width: "100%" }}>
        <Card>
          <CardFooter style={{ marginTop: '1.5rem' }}>
            <Slider
              value={[slider1]}
              min={10}
              max={100}
              step={1}
              onValueChange={(value: number[]) => setSlider1(value[0])}
            />
            <Slider
              style={{ marginLeft: '2rem' }}
              value={[slider2]}
              min={10}
              max={100}
              step={1}
              onValueChange={(value: number[]) => setSlider2(value[0])}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}