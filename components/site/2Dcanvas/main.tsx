'use client'
import React, { useRef, useState, useEffect } from 'react';

const DeltaArmSimulationWeb = () => {
  const canvasRef = useRef(null);
  const [redDotPosition, setRedDotPosition] = useState({ x: 150, y: 150 });
  const armLength = 100; // Length of the arms
  const baseX = 150; // Base X position for arms
  const baseY = 100; // Base Y position for arms

  // Function to calculate the angles of the arms
  const calculateAngles = (x, y) => {
    const dx = x - baseX;
    const dy = y - baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Check if the red dot is within reach
    if (distance > 2 * armLength) {
      console.error("Out of reach");
      return { angleLeft: 0, angleRight: 0 }; // or some fallback
    }

    const angleLeft = Math.atan2(dy, dx + armLength) * (180 / Math.PI);
    const angleRight = Math.atan2(dy, dx - armLength) * (180 / Math.PI);

    return { angleLeft, angleRight };
  };

  // Function to draw an arm
  const drawArm = (context, x1, y1, x2, y2) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = "black";
    context.lineWidth = 5;
    context.stroke();
  };

  // Drawing the canvas
  const draw = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const { angleLeft, angleRight } = calculateAngles(redDotPosition.x, redDotPosition.y);

    // Calculate arm positions based on angles
    const leftRodX = baseX + armLength * Math.cos((angleLeft * Math.PI) / 180);
    const leftRodY = baseY + armLength * Math.sin((angleLeft * Math.PI) / 180);

    const rightRodX = baseX + armLength * Math.cos((angleRight * Math.PI) / 180);
    const rightRodY = baseY + armLength * Math.sin((angleRight * Math.PI) / 180);

    // Draw the arms
    drawArm(context, baseX, baseY, leftRodX, leftRodY);
    drawArm(context, baseX, baseY, rightRodX, rightRodY);

    // Draw the red dot (end-effector)
    context.beginPath();
    context.arc(redDotPosition.x, redDotPosition.y, 5, 0, 2 * Math.PI);
    context.fillStyle = "red";
    context.fill();
  };

  // Effect to draw on canvas when red dot position changes
  useEffect(() => {
    draw();
  }, [redDotPosition]);

  // Handle mouse movement to update red dot position
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRedDotPosition({ x, y });
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        onMouseMove={handleMouseMove}
        style={{ border: "1px solid black" }}
      />
      <div>
        Move your mouse to position the red dot.
      </div>
    </div>
  );
};

export default DeltaArmSimulationWeb;
