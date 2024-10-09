"use client"; // Mark the component as a Client Component

import React, { useEffect } from 'react';

export default function Canvas2D() {
  useEffect(() => {
    const myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement | null;

    if (myCanvas) {
      const ctx = myCanvas.getContext("2d");

      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(20, 100);
        ctx.lineTo(70, 100);
        ctx.stroke();
      }
    }
  }, []);

  return (
    <div>
      <div>2D Canvas</div>
      <canvas id="myCanvas" width="300" height="150"></canvas>
    </div>
  );
}
