"use client";

import MotionNumber from "motion-number";
import React, { useState, useEffect } from "react";
import { easeOut } from "framer-motion";

export default function NumberDemo() {
  const [numberValue, setNumberValue] = useState(new Date().getSeconds());

  useEffect(() => {
    // Set an interval to update numberValue every second
    const interval = setInterval(() => {
      setNumberValue(new Date().getSeconds());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <MotionNumber
        value={numberValue}
        format={{ notation: "compact" }} // Intl.NumberFormat() options
        locales="en-US" // Intl.NumberFormat() locales
      />
      <hr />
      <MotionNumber
        value={numberValue}
        format={{ notation: "compact" }} // Intl.NumberFormat() options
        locales="en-US" // Intl.NumberFormat() locales
        transition={{
          // Applied to layout animations on individual characters:
          layout: { type: "spring", duration: 0.7, bounce: 0 },
          // Used for the digit animations:
          y: { type: "spring", duration: 0.7, bounce: 0.25 },

          // Opacity applies to entering/exiting characters.
          // Note the use of the times array, explained below:
          opacity: { duration: 0.7, ease: easeOut, times: [0, 0.3] }, // 0.3s perceptual duration
        }}
      />
    </div>
  );
}
