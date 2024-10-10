"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Card, CardFooter } from "@/components/ui/card";

const DeltaRobotSimulation = () => {
  const canvasRef = useRef(null);
  const [angle1, setAngle1] = useState(45);
  const [angle2, setAngle2] = useState(45);
  const [baseWidth, setBaseWidth] = useState(400);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawArm = (startX, startY, endX, endY, isUpper) => {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = isUpper ? 'black' : 'gray';
      ctx.lineWidth = isUpper ? 3 : 2;
      ctx.stroke();
    };

    const calculateEndEffectorPosition = (x1, y1, x2, y2, upperArmLength, lowerArmLength) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const distanceBetweenJoints = Math.sqrt(dx * dx + dy * dy);
      
      if (distanceBetweenJoints > 2 * lowerArmLength) {
        // Configuration is unrealistic
        return null;
      }

      // Use trigonometry to find the end effector position
      const halfDistance = distanceBetweenJoints / 2;
      const centerX = (x1 + x2) / 2;
      const centerY = (y1 + y2) / 2;

      // Calculate the height of the triangle formed by the lower arms
      const height = Math.sqrt(lowerArmLength * lowerArmLength - halfDistance * halfDistance);

      // Calculate the angle of the line connecting the two arm joints
      const baseAngle = Math.atan2(y2 - y1, x2 - x1);

      // Calculate the end effector position
      const endX = centerX - height * Math.sin(baseAngle);
      const endY = centerY + height * Math.cos(baseAngle);

      return [endX, endY];
    };

    const drawDeltaRobot = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Constants
      const upperArmLength = 150;
      const lowerArmLength = 200;
      const baseY = 100;
      const canvasCenter = canvas.width / 2;

      // Calculate servo positions based on base width
      const servo1X = canvasCenter - baseWidth / 2;
      const servo2X = canvasCenter + baseWidth / 2;

      // Draw base
      ctx.beginPath();
      ctx.moveTo(servo1X, baseY);
      ctx.lineTo(servo2X, baseY);
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw servos
      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(servo1X, baseY, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(servo2X, baseY, 10, 0, 2 * Math.PI);
      ctx.fill();

      // Calculate upper arm joint positions
      const angle1Rad = angle1 * Math.PI / 180;
      const angle2Rad = angle2 * Math.PI / 180;
      const x1 = servo1X + upperArmLength * Math.cos(angle1Rad);
      const y1 = baseY + upperArmLength * Math.sin(angle1Rad);
      const x2 = servo2X + upperArmLength * Math.cos(angle2Rad);
      const y2 = baseY + upperArmLength * Math.sin(angle2Rad);

      // Draw upper arms
      drawArm(servo1X, baseY, x1, y1, true);
      drawArm(servo2X, baseY, x2, y2, true);

      // Calculate end effector position
      const endEffectorPosition = calculateEndEffectorPosition(x1, y1, x2, y2, upperArmLength, lowerArmLength);

      if (endEffectorPosition) {
        const [endX, endY] = endEffectorPosition;

        // Draw lower arms
        drawArm(x1, y1, endX, endY, false);
        drawArm(x2, y2, endX, endY, false);

        // Draw end effector
        ctx.beginPath();
        ctx.arc(endX, endY, 15, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
      } else {
        // Draw a message when the configuration is unrealistic
        ctx.font = '20px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('Unrealistic configuration', canvas.width / 2 - 100, canvas.height / 2);
      }

      // Draw joint points
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(x1, y1, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x2, y2, 5, 0, 2 * Math.PI);
      ctx.fill();
    };

    drawDeltaRobot();
  }, [angle1, angle2, baseWidth]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />
      <Card style={{ width: '100%', maxWidth: 800, marginTop: 20 }}>
        <CardFooter style={{ marginTop: '1.5rem', flexDirection: 'column' }}>
          <div style={{ display: 'flex', width: '100%', marginBottom: '1rem' }}>
            <Slider value={[angle1]} min={0} max={180} step={1} onValueChange={(value) => setAngle1(value[0])} />
            <Slider value={[angle2]} min={0} max={180} step={1} onValueChange={(value) => setAngle2(value[0])} style={{ marginLeft: '1rem' }} />
          </div>
          <Slider 
            value={[baseWidth]} 
            min={200} 
            max={600} 
            step={10} 
            onValueChange={(value) => setBaseWidth(value[0])} 
            style={{ width: '100%' }}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeltaRobotSimulation;