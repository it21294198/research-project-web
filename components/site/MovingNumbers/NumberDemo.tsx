import MotionNumber from 'motion-number';
import React, { useState, useEffect } from 'react';

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
        format={{ notation: 'compact' }} // Intl.NumberFormat() options
        locales="en-US" // Intl.NumberFormat() locales
      />
    </div>
  );
}