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
          id: new Date(Date.now()).toString(),
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
      timers: state.timers.filter((timer) => timer.id !== id),
    }));
  },
}));
