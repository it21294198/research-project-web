"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Card, CardFooter } from "@/components/ui/card";

const DeltaArmSimulation = () => {
  const canvasRef = useRef(null);
  const [angle1, setAngle1] = useState(0);
  const [angle2, setAngle2] = useState(0);
  const [angle3, setAngle3] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawArm = (startX, startY, angle1, angle2) => {
      const len1 = 100;
      const len2 = 100;
      const x1 = startX + len1 * Math.cos(angle1);
      const y1 = startY + len1 * Math.sin(angle1);
      const x2 = x1 + len2 * Math.cos(angle1 + angle2);
      const y2 = y1 + len2 * Math.sin(angle1 + angle2);

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();

      return [x2, y2];
    };

    const drawDeltaArm = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw base
      ctx.beginPath();
      ctx.moveTo(100, 50);
      ctx.lineTo(700, 50);
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw arms
      const endPoint1 = drawArm(200, 50, angle1 * Math.PI / 180, -angle1 * Math.PI / 180);
      const endPoint2 = drawArm(400, 50, angle2 * Math.PI / 180, -angle2 * Math.PI / 180);
      const endPoint3 = drawArm(600, 50, angle3 * Math.PI / 180, -angle3 * Math.PI / 180);

      // Draw end effector
      const centerX = (endPoint1[0] + endPoint2[0] + endPoint3[0]) / 3;
      const centerY = (endPoint1[1] + endPoint2[1] + endPoint3[1]) / 3;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();

      // Draw connections to end effector
      ctx.beginPath();
      ctx.moveTo(endPoint1[0], endPoint1[1]);
      ctx.lineTo(centerX, centerY);
      ctx.moveTo(endPoint2[0], endPoint2[1]);
      ctx.lineTo(centerX, centerY);
      ctx.moveTo(endPoint3[0], endPoint3[1]);
      ctx.lineTo(centerX, centerY);
      ctx.strokeStyle = 'gray';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    drawDeltaArm();
  }, [angle1, angle2, angle3]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />
      <Card style={{ width: '100%', maxWidth: 800, marginTop: 20 }}>
        <CardFooter>
          <Slider value={[angle1]} min={-90} max={90} step={1} onValueChange={(value) => setAngle1(value[0])} />
          <Slider value={[angle2]} min={-90} max={90} step={1} onValueChange={(value) => setAngle2(value[0])} style={{ marginLeft: '1rem' }} />
          <Slider value={[angle3]} min={-90} max={90} step={1} onValueChange={(value) => setAngle3(value[0])} style={{ marginLeft: '1rem' }} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeltaArmSimulation;