import { useEffect, useState } from "react";

export const Fallback = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const i = setInterval(() => {
      setDots((dots) => {
        if (dots.length === 3) {
          return "";
        }
        return dots + ".";
      });
    }, 500);

    return () => {
      clearInterval(i);
    };
  }, [dots]);
  return <span>loading{dots}</span>;
};
