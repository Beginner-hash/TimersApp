import { useState } from "react";
import { useTimerStore } from "../stores/useTimerStore";
import { formatTimeValue } from "../utils/formatValue";

export const TimerSetting = () => {
  const [time, setTime] = useState({ hrs: "00", mins: "00", secs: "00" });

  const handleInputChange = (target) => {
    const { name, value } = target;
    const formattedValue = formatTimeValue(value, name === "hrs" ? 23 : 59);
    setTime((prevTime) => ({ ...prevTime, [name]: formattedValue }));
  };

  const handleAddTimer = () => {
    const milliseconds =
      parseInt(time.hrs) * 3600000 +
      parseInt(time.mins) * 60000 +
      parseInt(time.secs) * 1000;

    if (milliseconds < 10000) {
      alert("Timer must be at least 10 seconds");
      return;
    }

    addTimer(milliseconds);
  };

  const addTimer = useTimerStore((state) => state.addTimer);

  return (
    <>
      <div className="flex items-center rounded-md border border-neutral bg-base-200 p-2">
        {Object.entries(time).map(([key, value]) => (
          <input
            className="h-24 w-20 rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content focus:outline-none md:h-20 md:w-32 md:text-6xl lg:h-32 lg:w-40 lg:text-8xl flex-1"
            name={key}
            type="number"
            key={key}
            value={value}
            onChange={(e) => {
              handleInputChange(e.target);
            }}
            min={0}
            max={key === "hrs" ? 23 : 59}
          />
        ))}
      </div>
      <div className="flex justify-end gap-4">
        <button className="btn btn-success" onClick={() => handleAddTimer()}>
          Add Timer
        </button>
      </div>
    </>
  );
};
