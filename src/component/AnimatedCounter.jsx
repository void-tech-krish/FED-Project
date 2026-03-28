import React, { useEffect, useState } from "react";

function AnimatedCounter({ value, duration = 1000 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16); // ~60fps
    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(interval);
      }
      setDisplayValue(Math.floor(start));
    }, 16);

    return () => clearInterval(interval);
  }, [value, duration]);

  return <span>{displayValue}</span>;
}

export default AnimatedCounter;