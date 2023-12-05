import { useCallback, useEffect, useState } from "react";

export const useCountDown = (initialMinutes) => {
  const [time, setTime] = useState(initialMinutes * 60);
  const [isCounting, setIsCounting] = useState(false);

  const startCountdown = useCallback(() => {
    setIsCounting(true);
  }, []);

  useEffect(() => {
    let timer;

    if (isCounting) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    // Clear the interval when the component unmounts or when time reaches 0
    return () => clearInterval(timer);
  }, [isCounting]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}s`;

  return { isCounting, startCountdown, time: formattedTime };
};
