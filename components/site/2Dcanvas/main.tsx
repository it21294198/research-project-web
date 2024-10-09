"use client"; // Mark the component as a Client Component

import React, { useEffect, useRef, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardFooter,
} from "@/components/ui/card";

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
          // Clear the canvas before each render
          context.clearRect(0, 0, canvas.width, canvas.height);
          drawReferenceLine(context, 100, 100, 200, 200);
          drawReferenceLine(context, 200, 200, 300, 100);
        } else {
          throw new Error('Could not get context');
        }
      }
    };

    // Request animation frame to continuously render
    const animationId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(animationId); // Cleanup on unmount
  }, []);

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

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginBottom: "10px", fontSize: "20px" }}>2D Canvas</div>
      <canvas
        ref={canvasRef}
        width="400"
        height="400"
        style={{ border: "1px solid black" }} // Optional: Added border for visibility
      ></canvas>
      <div style={{ marginTop: "10px", width: "100%" }}>
        <Card>
          <CardFooter style={{ marginTop:'1.5rem'}}>
            <Slider
              defaultValue={[slider1]}
              max={100}
              step={1}
              onChange={(value) => setSlider1(value[0])} // Access the first element of the array
            />
            <Slider
              style={{marginLeft:'2rem'}}
              defaultValue={[slider2]}
              max={100}
              step={1}
              onChange={(value) => setSlider2(value[0])} // Access the first element of the array
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
