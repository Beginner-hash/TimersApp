import { useTimerStore } from "../stores/useTimerStore";
import { Timer } from "./Timer";

export const TimerList = () => {
  const timers = useTimerStore((state) => state.timers);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {timers.map((timer) => (
        <Timer key={timer.id} timer={timer}></Timer>
      ))}
    </div>
  );
};
