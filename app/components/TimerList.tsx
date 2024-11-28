import { useTimerStore } from "../stores/useTimerStore";
import { useShallow } from "zustand/react/shallow";
import { Timer } from "./Timer";

export const TimerList = () => {
  const timers = useTimerStore(useShallow((s) => s.timers.map((t) => t?.id)));

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {timers.map((timer) => (
        <Timer key={timer} id={timer}></Timer>
      ))}
    </div>
  );
};
