import { useEffect } from "react";
import { create } from "zustand";

/**
 * @typedef {Object} Timer
 * @property {string} id - The unique identifier for the timer. Generated using Date.now()
 * @property {number} duration - The duration of the timer in milliseconds.
 * @property {number} timeLeft - The remaining time of the timer in milliseconds.
 * @property {number} endAt - The end time of the timer in milliseconds.
 * @property {boolean} isRunning - Indicates if the timer is currently running.
 */

export const useTimerStore = create((set) => ({
  timers: [],
  addTimer: (milliseconds) => {
    set((state) => ({
      timers: [
        ...state.timers,
        {
          id: Date.now(),
          duration: milliseconds,
          timeLeft: milliseconds,
          endAt: Date.now() + milliseconds,
          isRunning: true,
        },
      ],
    }));
  },
  removeTimer: (id) => {
    set((state) => ({
      timers: [...state.timers.filter((timer) => timer.id !== id)],
    }));
  },
  toggleRunning: (id) => {
    set((state) => ({
      timers: state.timers.map((timer) => {
        if (timer.id !== id) return timer;

        if (timer.timeLeft === 0 && !timer.isRunning) {
          return {
            ...timer,
            timeLeft: timer.duration,
            isRunning: true,
            endAt: timer.duration + Date.now(),
          };
        }

        return {
          ...timer,
          isRunning: !timer.isRunning,
          endAt: timer.isRunning ? timer.endAt : timer.endAt + Date.now(),
        };
      }),
    }));
  },
}));

export const useTimerInterval = () => {
  useEffect(() => {
    const intervalID = setInterval(() => {
      useTimerStore.setState((state) => ({
        timers: state.timers.map((timer) => {
          if (!timer.isRunning) {
            return timer;
          }

          const onTimerEnds = () => {
            const audio = new Audio("/ring.mp3");
            audio.play();
            return { ...timer, timeLeft: 0, isRunning: false };
          };

          const timeLeft = timer.timeLeft - 1000;

          if (timeLeft <= 0) {
            return onTimerEnds();
          }

          return { ...timer, timeLeft };
        }),
      }));
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);
};
