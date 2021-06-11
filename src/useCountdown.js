import { useState, useEffect } from "react";

const useCountdown = (time) => {
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return { timeLeft, setTimeLeft };
};

export default useCountdown;
