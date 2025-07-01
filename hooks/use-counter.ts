import { useState, useEffect, useRef } from 'react';

// Custom hook that counts from 0 to 100 with duration support
const useCounter = (
  initialValue = 0, 
  maxValue = 100, 
  interval = 1000, 
  totalDuration = 1000
) => {
  const [count, setCount] = useState(initialValue);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef<any>(null);
  const frameRef = useRef<any>(null);
  
  // Calculate the interval based on total duration if provided
  const getInterval = () => {
    if (totalDuration) {
      // Calculate how long each increment should take
      return totalDuration / (maxValue - initialValue);
    }
    return interval;
  };

  // Start the counter
  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime as number;
  };
  
  // Pause the counter
  const pause = () => {
    setIsRunning(false);
    setElapsedTime(Date.now() - startTimeRef.current);
  };
  
  // Reset the counter to initial value
  const reset = () => {
    setIsRunning(false);
    setCount(initialValue);
    setElapsedTime(0);
    startTimeRef.current = null;
  };

  useEffect(() => {
    if (!isRunning) return;

    const actualInterval = getInterval();
    
    if (totalDuration) {
      // When using duration, we use requestAnimationFrame for smoother animation
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / totalDuration, 1);
        const newCount = Math.floor(initialValue + progress * (maxValue - initialValue));
        
        if (newCount <= maxValue) {
          setCount(newCount);
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setCount(maxValue);
          setIsRunning(false);
        }
      };
      
      frameRef.current = requestAnimationFrame(animate);
    } else {
      // For interval-based counting, use setTimeout
      const timer = setTimeout(() => {
        if (count < maxValue) {
          setCount(prevCount => prevCount + 1);
        } else {
          setIsRunning(false);
        }
      }, actualInterval);
      
      return () => clearTimeout(timer);
    }
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [count, isRunning, maxValue, totalDuration, initialValue]);

  return {
    count,
    isRunning,
    start,
    pause,
    reset,
    progress: maxValue > initialValue ? 
      (count - initialValue) / (maxValue - initialValue) * 100 : 
      0,
    elapsedTime
  };
};

export default useCounter;
