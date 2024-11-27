import { useState, useEffect } from "react";
import { useTimerStore } from "../stores/useTimerStore";
import { formatTimeValue } from "../utils/formatValue";

export const Timer = ({ id }) => {
  const timer = useTimerStore((s) => s.timers.find((t) => t.id === id));

  const { id, duration, timeLeft, isRunning, endAt } = timer;

  const removeTimer = useTimerStore((state) => state.removeTimer);

  const handleRemoveTimer = (id) => {
    removeTimer(id);
  };

  // Fonction pour décrémenter le temps restant
  const decrementTime = () => {
    setTimerComp((prev) => ({
      ...prev,
      timeLeft: prev.timeLeft - 1000,
    }));
  };

  // Utiliser useEffect pour gérer le timer
  useEffect(() => {
    if (timerComp.isRunning && timerComp.timeLeft > 0) {
      const timeout = setTimeout(decrementTime, 1000);

      // Nettoyer le timer si le composant est démonté ou `isRunning` change
      return () => clearTimeout(timeout);
    }
  }, [timerComp.isRunning, timerComp.timeLeft]);

  const millisecondsToHMS = (mili) => {
    const date = new Date(mili);
    const hours = formatTimeValue(date.getHours().toString(), 23);
    const minutes = formatTimeValue(date.getMinutes().toString(), 59);
    const seconds = formatTimeValue(date.getSeconds().toString(), 59);

    return `${hours}:${minutes}:${seconds}`;
  };

  console.log(useTimerStore((state) => state.timers[0].timeLeft));
  console.log(timerComp.timeLeft);

  return (
    <div className="m-auto size-fit">
      <div className="relative flex size-[224px] flex-col gap-2 rounded-2xl bg-base-200 p-4 brightness-75">
        <div className="relative flex size-full flex-col items-center justify-center gap-1">
          <div className="flex items-center justify-between gap-2">
            <p>{millisecondsToHMS(timerComp.endAt)}</p>
          </div>
          <div className="relative flex items-center justify-center">
            <p className="text-base-content text-5xl">{timerComp.timeLeft}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-content">mins</p>
          </div>
        </div>
        {/* Bouton pour supprimer le timer */}
        <button
          className="absolute bottom-3 left-3 flex size-7 items-center justify-center rounded-full bg-base-300 p-0 text-base-content"
          onClick={() => handleRemoveTimer(timerComp.id)}
        ></button>
        {/* Bouton pour mettre en pause / reprendre */}
        <button
          className="absolute bottom-3 right-3 flex size-7 items-center justify-center rounded-full p-0 bg-success text-success-content"
          onClick={() =>
            setTimerComp((prev) => ({ ...prev, isRunning: !prev.isRunning }))
          }
        >
          {timerComp.isRunning ? "Pause" : "Reprendre"}
        </button>
      </div>
    </div>
  );
};
