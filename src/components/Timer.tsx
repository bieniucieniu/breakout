import { display } from "./styles/basicComponents.css";
import { useTimer, msToTime } from "../functions/timer";
type Props = Parameters<typeof useTimer>[0] & React.HTMLProps<HTMLDivElement>;

export const Timer = ({
  isRunning = true,
  start = 0,
  end = Infinity,
  onTime = [],
  delta = 10,
  onTick,
  className,
  ...props
}: Props) => {
  const [time, clear] = useTimer({
    isRunning,
    start,
    end,
    delta,
    onTime,
    onTick,
  });
  return (
    <div className={`${display} ${className}`} {...props}>
      {msToTime(time)}
    </div>
  );
};
