import { useState, useEffect } from "react";
import { useTimerStore } from "../stores/useTimerStore";
import { formatTimeValue } from "../utils/formatValue";
import clsx from "clsx";
import { Bell, Pause, Play, RotateCcw, X } from "lucide-react";
import { CountdownCircle } from "./CountdownCircle";

export const Timer = ({ id }) => {
  const timer = useTimerStore((state) =>
    state.timers.find((timer) => timer.id == id)
  );

  const millisecondsToHMS = (mili) => {
    const hours = Math.floor(mili / 3600000);
    const minutes = Math.floor((mili % 3600000) / 60000);
    const seconds = Math.floor((mili % 60000) / 1000);

    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const padHMS = (timeHSM) => ({
    hours: String(timeHSM.hours).padStart(2, "0"),
    minutes: String(timeHSM.minutes).padStart(2, "0"),
    seconds: String(timeHSM.seconds).padStart(2, "0"),
  });

  const getTimeText = (timeLeft) => {
    const timeLeftPadHMS = padHMS(millisecondsToHMS(timeLeft));
    let timeLeftText = `${timeLeftPadHMS.minutes}:${timeLeftPadHMS.seconds}`;
    if (timeLeftPadHMS.hours !== "00") {
      timeLeftText = `${timeLeftPadHMS.hours}:${timeLeftText}`;
    }

    return timeLeftText;
  };

  const TimeDisplay = ({ timeLeft }) => {
    const timeText = getTimeText(timeLeft);
    const timeHMS = millisecondsToHMS(timeText);

    return (
      <div className="relative flex items-center justify-center">
        <p
          className={clsx("font-light text-base-content", {
            "text-4xl": !timeHMS.hours,
            "text-2xl": timeHMS.hours,
          })}
        >
          {timeText}
        </p>
      </div>
    );
  };

  const getDurationText = (duration) => {
    const durationdPadHMS = padHMS(millisecondsToHMS(duration));

    if (durationdPadHMS.hours !== "00") {
      return `${durationdPadHMS.hours} hrs`;
    }

    if (durationdPadHMS.minutes !== "00") {
      return `${durationdPadHMS.minutes} mins`;
    }

    return `${durationdPadHMS.seconds} secs`;
  };

  const DurationDisplay = ({ duration }) => {
    const durationText = getDurationText(duration);

    return (
      <div>
        <p className="text-sm text-neutral-content">{durationText}</p>
      </div>
    );
  };

  const TimerControls = ({ id, isRunning, timeLeft }) => {
    const removeTimer = useTimerStore((state) => state.removeTimer);
    const toggleRunning = useTimerStore((state) => state.toggleRunning);

    return (
      <>
        <button
          className="absolute bottom-3 left-3 flex size-7 items-center justify-center rounded-full bg-base-300 p-0 text-base-content"
          onClick={() => removeTimer(id)}
        >
          <X size={14} />
        </button>
        <button
          className={clsx(
            "absolute bottom-3 right-3 flex size-7 items-center justify-center rounded-full p-0",
            {
              "bg-warning text-warning-content": isRunning,
              "bg-success text-success-content": !isRunning,
            }
          )}
          onClick={() => toggleRunning(id)}
        >
          {isRunning ? (
            <Pause fill="currentColor" size={14} />
          ) : timeLeft > 0 ? (
            <Play fill="currentColor" size={14} />
          ) : (
            <RotateCcw size={14} />
          )}
        </button>
      </>
    );
  };
  const endAt = new Date(timer.endAt);

  return (
    <div
      className={clsx(
        "relative flex size-[224px] flex-col gap-2 rounded-2xl bg-base-200 p-1",
        { "brightness-75": timer.timeLeft === 0 }
      )}
    >
      <div className="relative flex size-full flex-col items-center justify-center gap-1">
        <div className="flex items-center justify-between gap-2">
          <Bell size={16} className="text-neutral-content"></Bell>
          <p>{`${endAt.getHours().toString().padStart(2, "0")}:${endAt
            .getMinutes()
            .toString()
            .padStart(2, "0")}`}</p>
        </div>
        <TimeDisplay timeLeft={timer.timeLeft}></TimeDisplay>
        <DurationDisplay duration={timer.duration}></DurationDisplay>
        <CountdownCircle
          width={180}
          timeLeft={timer.timeLeft}
          duration={timer.duration}
          className={"absolute"}
          radiusRatio={0.95}
        ></CountdownCircle>
        <TimerControls
          id={timer.id}
          isRunning={timer.isRunning}
          timeLeft={timer.timeLeft}
        ></TimerControls>
      </div>
    </div>
  );
};
