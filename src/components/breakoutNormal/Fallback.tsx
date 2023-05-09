import { useEffect, useState } from "react";

type Props = { dotsClassName?: string } & React.HTMLProps<HTMLSpanElement>;

export const Fallback = ({ dotsClassName, ...props }: Props) => {
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
  return (
    <span {...props}>
      loading<span className={dotsClassName}>{dots}</span>
    </span>
  );
};
