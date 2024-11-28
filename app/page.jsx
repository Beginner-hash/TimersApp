"use client";

import { TimerList } from "./components/TimerList";
import { TimerSetting } from "./components/TimerSetting";
import { useTimerInterval } from "./stores/useTimerStore";

export default function Home() {
  useTimerInterval();
  return (
    <div className="mx-auto flex min-h-full max-w-3xl flex-col gap-8 p-4">
      <div className="mx-auto w-fit rounded-md bg-base-200 px-4 py-2 text-lg font-bold text-base-content">
        Timers App
      </div>
      <div className="mx-auto flex w-fit flex-col gap-4">
        <div className="flex items-center justify-between ">
          <p className="flex-1 text-center text-neutral-content">hr</p>
          <p className="flex-1 text-center text-neutral-content">min</p>
          <p className="flex-1 text-center text-neutral-content">sec</p>
        </div>
        <TimerSetting></TimerSetting>
        <TimerList></TimerList>
      </div>
    </div>
  );
}
