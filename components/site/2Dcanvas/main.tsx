// "use client";
// /* eslint-disable */

// import React, { useEffect, useRef, useState } from "react";
// import { Slider } from "@/components/ui/slider";
// import { Card, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// const DeltaRobotSimulation = () => {
//   const canvasRef = useRef(null);
//   const [angle1, setAngle1] = useState(90);
//   const [angle2, setAngle2] = useState(90);
//   const [baseWidth, setBaseWidth] = useState(200);
//   const [horizontalPosition, setHorizontalPosition] = useState(360);
//   const [verticalPosition, setVerticalPosition] = useState(360);

//   const upperArmLength = 200;
//   const lowerArmLength = 200;
//   const baseY = 100;

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const drawArm = (startX, startY, endX, endY, isUpper) => {
//       ctx.beginPath();
//       ctx.moveTo(startX, startY);
//       ctx.lineTo(endX, endY);
//       ctx.strokeStyle = isUpper ? "black" : "gray";
//       ctx.lineWidth = isUpper ? 3 : 2;
//       ctx.stroke();
//     };

//     const calculateEndEffectorPosition = (
//       x1,
//       y1,
//       x2,
//       y2,
//       upperArmLength,
//       lowerArmLength
//     ) => {
//       const dx = x2 - x1;
//       const dy = y2 - y1;
//       const distanceBetweenJoints = Math.sqrt(dx * dx + dy * dy);

//       if (distanceBetweenJoints > 2 * lowerArmLength) {
//         return null;
//       }

//       const halfDistance = distanceBetweenJoints / 2;
//       const centerX = (x1 + x2) / 2;
//       const centerY = (y1 + y2) / 2;

//       const height = Math.sqrt(
//         lowerArmLength * lowerArmLength - halfDistance * halfDistance
//       );

//       const baseAngle = Math.atan2(y2 - y1, x2 - x1);

//       const endX = centerX - height * Math.sin(baseAngle);
//       const endY = centerY + height * Math.cos(baseAngle);

//       return [endX, endY];
//     };

//     const drawDeltaRobot = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const canvasCenter = canvas.width / 2;

//       const servo1X = canvasCenter - baseWidth / 2;
//       const servo2X = canvasCenter + baseWidth / 2;

//       ctx.beginPath();
//       ctx.moveTo(servo1X, baseY);
//       ctx.lineTo(servo2X, baseY);
//       ctx.strokeStyle = "blue";
//       ctx.lineWidth = 4;
//       ctx.stroke();

//       ctx.fillStyle = "green";
//       ctx.beginPath();
//       ctx.arc(servo1X, baseY, 10, 0, 2 * Math.PI);
//       ctx.fill();
//       ctx.beginPath();
//       ctx.arc(servo2X, baseY, 10, 0, 2 * Math.PI);
//       ctx.fill();

//       const angle1Rad = (angle1 * Math.PI) / 180;
//       const angle2Rad = (angle2 * Math.PI) / 180;
//       const x1 = servo1X + upperArmLength * Math.cos(angle1Rad);
//       const y1 = baseY + upperArmLength * Math.sin(angle1Rad);
//       const x2 = servo2X + upperArmLength * Math.cos(angle2Rad);
//       const y2 = baseY + upperArmLength * Math.sin(angle2Rad);

//       drawArm(servo1X, baseY, x1, y1, true);
//       drawArm(servo2X, baseY, x2, y2, true);

//       const endEffectorPosition = calculateEndEffectorPosition(
//         x1,
//         y1,
//         x2,
//         y2,
//         upperArmLength,
//         lowerArmLength
//       );

//       if (endEffectorPosition) {
//         const [endX, endY] = endEffectorPosition;

//         drawArm(x1, y1, endX, endY, false);
//         drawArm(x2, y2, endX, endY, false);

//         ctx.beginPath();
//         ctx.arc(endX, endY, 15, 0, 2 * Math.PI);
//         ctx.fillStyle = "red";
//         ctx.fill();
//       } else {
//         ctx.font = "20px Arial";
//         ctx.fillStyle = "red";
//         ctx.fillText(
//           "Unrealistic configuration",
//           canvas.width / 2 - 100,
//           canvas.height / 2
//         );
//       }

//       ctx.fillStyle = "black";
//       ctx.beginPath();
//       ctx.arc(x1, y1, 5, 0, 2 * Math.PI);
//       ctx.fill();
//       ctx.beginPath();
//       ctx.arc(x2, y2, 5, 0, 2 * Math.PI);
//       ctx.fill();
//     };

//     drawDeltaRobot();
//   }, [angle1, angle2, baseWidth]);

//   const calculateAngles = (x, y) => {
//     const canvasCenter = 400; // Half of canvas width
//     const servo1X = canvasCenter - baseWidth / 2;
//     const servo2X = canvasCenter + baseWidth / 2;

//     const calculateAngle = (servoX, isServo1) => {
//       const dx = x - servoX;
//       const dy = y - baseY;
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       if (distance > upperArmLength + lowerArmLength) {
//         return null; // Unreachable position
//       }

//       const cosAngle =
//         (upperArmLength * upperArmLength +
//           distance * distance -
//           lowerArmLength * lowerArmLength) /
//         (2 * upperArmLength * distance);
//       const angle = Math.acos(cosAngle);
//       const baseAngle = Math.atan2(dy, dx);

//       // For servo1, we add the angle instead of subtracting
//       return isServo1
//         ? ((baseAngle + angle) * 180) / Math.PI
//         : ((baseAngle - angle) * 180) / Math.PI;
//     };

//     const newAngle1 = calculateAngle(servo1X, true); // Pass true for servo1
//     const newAngle2 = calculateAngle(servo2X, false); // Pass false for servo2

//     return [newAngle1, newAngle2];
//   };

//   const changeHorizontalPosition = (e) => {
//     const newX = e[0];
//     const [newAngle1, newAngle2] = calculateAngles(newX, verticalPosition);
//     if (newAngle1 !== null && newAngle2 !== null) {
//       setHorizontalPosition(newX);
//       setAngle1(newAngle1);
//       setAngle2(newAngle2);
//     }
//   };

//   const changeVerticalPosition = (e) => {
//     const newY = e[0];
//     const [newAngle1, newAngle2] = calculateAngles(horizontalPosition, newY);
//     if (newAngle1 !== null && newAngle2 !== null) {
//       setVerticalPosition(newY);
//       setAngle1(newAngle1);
//       setAngle2(newAngle2);
//     }
//   };

//   return (
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       <canvas
//         ref={canvasRef}
//         width={800}
//         height={600}
//         style={{ border: "1px solid black" }}
//       />
//       <Card style={{ width: "100%", maxWidth: 800, marginTop: 20 }}>
//         <CardFooter style={{ marginTop: "1.5rem", flexDirection: "column" }}>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "auto auto",
//               gap: "1rem",
//               width: "100%",
//             }}
//           >
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "auto 2rem",
//                 gap: "1rem",
//               }}
//             >
//               <Slider
//                 value={[angle1]}
//                 inverted={true}
//                 min={0}
//                 max={180}
//                 step={1}
//                 onValueChange={(value) => setAngle1(value[0])}
//               />
//               <Badge variant="outline">{Math.floor(angle1)}</Badge>
//             </div>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "auto 2rem",
//                 gap: "1rem",
//               }}
//             >
//               <Slider
//                 value={[angle2]}
//                 inverted={true}
//                 min={0}
//                 max={180}
//                 step={1}
//                 onValueChange={(value) => setAngle2(value[0])}
//               />
//               <Badge variant="outline">{Math.floor(angle2)}</Badge>
//             </div>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "auto 2rem",
//                 gap: "1rem",
//               }}
//             >
//               <Slider
//                 value={[baseWidth]}
//                 min={200}
//                 max={600}
//                 step={10}
//                 onValueChange={(value) => setBaseWidth(value[0])}
//               />
//               <Badge variant="outline">{baseWidth}</Badge>
//             </div>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "auto 2rem",
//                 gap: "1rem",
//               }}
//             >
//               <Slider
//                 value={[horizontalPosition]}
//                 min={175}
//                 max={630}
//                 step={1}
//                 onValueChange={changeHorizontalPosition}
//               />
//               <Badge variant="outline">{horizontalPosition}</Badge>
//             </div>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "auto 2rem",
//                 gap: "1rem",
//               }}
//             >
//               <Slider
//                 value={[verticalPosition]}
//                 min={285}
//                 max={600}
//                 step={1}
//                 onValueChange={changeVerticalPosition}
//               />
//               <Badge variant="outline">{verticalPosition}</Badge>
//             </div>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default DeltaRobotSimulation;
