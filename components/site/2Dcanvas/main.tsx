'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Card, CardFooter } from "@/components/ui/card";

const DeltaRobotSimulation = () => {
  const canvasRef = useRef(null);
  const [angle1, setAngle1] = useState(45);
  const [angle2, setAngle2] = useState(45);
  const [baseWidth, setBaseWidth] = useState(400);
  const [horizontalPosition, setHorizontalPosition] = useState(400);
  const [verticalPosition, setVerticalPosition] = useState(400); // New state for vertical position

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

    const calculateArmAngles = (targetX, targetY, servo1X, servo2X, baseY, upperArmLength, lowerArmLength) => {
      const calculateAngle = (servoX) => {
        const dx = targetX - servoX;
        const dy = targetY - baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > upperArmLength + lowerArmLength) {
          return null; // Unreachable
        }
        
        const a = upperArmLength;
        const b = distance;
        const c = lowerArmLength;
        
        const cosAngle = (a * a + b * b - c * c) / (2 * a * b);
        const angle = Math.acos(cosAngle);
        
        return Math.atan2(dy, dx) - angle;
      };
      
      const angle1 = calculateAngle(servo1X);
      const angle2 = calculateAngle(servo2X);
      
      return [angle1, angle2];
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

      // Calculate arm angles based on target position
      const [calculatedAngle1, calculatedAngle2] = calculateArmAngles(horizontalPosition, verticalPosition, servo1X, servo2X, baseY, upperArmLength, lowerArmLength);

      if (calculatedAngle1 === null || calculatedAngle2 === null) {
        // Draw a message when the configuration is unrealistic
        ctx.font = '20px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('Unrealistic configuration', canvas.width / 2 - 100, canvas.height / 2);
        return;
      }

      // Update state angles (this will trigger a re-render)
      setAngle1(calculatedAngle1 * 180 / Math.PI);
      setAngle2(calculatedAngle2 * 180 / Math.PI);

      // Calculate upper arm joint positions
      const x1 = servo1X + upperArmLength * Math.cos(calculatedAngle1);
      const y1 = baseY + upperArmLength * Math.sin(calculatedAngle1);
      const x2 = servo2X + upperArmLength * Math.cos(calculatedAngle2);
      const y2 = baseY + upperArmLength * Math.sin(calculatedAngle2);

      // Draw upper arms
      drawArm(servo1X, baseY, x1, y1, true);
      drawArm(servo2X, baseY, x2, y2, true);

      // Draw lower arms
      drawArm(x1, y1, horizontalPosition, verticalPosition, false);
      drawArm(x2, y2, horizontalPosition, verticalPosition, false);

      // Draw end effector
      ctx.beginPath();
      ctx.arc(horizontalPosition, verticalPosition, 15, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();

      // Draw joint points
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(x1, y1, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x2, y2, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Draw horizontal line
      ctx.beginPath();
      ctx.moveTo(0, verticalPosition);
      ctx.lineTo(canvas.width, verticalPosition);
      ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw vertical line
      ctx.beginPath();
      ctx.moveTo(horizontalPosition, 0);
      ctx.lineTo(horizontalPosition, canvas.height);
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.setLineDash([]);
    };

    drawDeltaRobot();
  }, [angle1, angle2, baseWidth, horizontalPosition, verticalPosition]);

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
            style={{ width: '100%', marginBottom: '1rem' }}
          />
          <Slider 
            value={[horizontalPosition]} 
            min={0} 
            max={800} 
            step={1} 
            onValueChange={(value) => setHorizontalPosition(value[0])} 
            style={{ width: '100%', marginBottom: '1rem' }}
          />
          <Slider 
            value={[verticalPosition]} 
            min={100} 
            max={600} 
            step={1} 
            onValueChange={(value) => setVerticalPosition(value[0])} 
            style={{ width: '100%' }}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeltaRobotSimulation;