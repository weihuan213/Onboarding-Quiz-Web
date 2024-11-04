import { create } from "zustand";

const useQuestionStore = create((set) => ({
  wrongQuestions: [],

  setWrongQuestions: (questions) => set({ wrongQuestions: questions }),

  resetStore: () => set({ wrongQuestions: [] }),
}));

export default useQuestionStore;
