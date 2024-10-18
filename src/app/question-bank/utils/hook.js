import { useState } from "react";
import { fetchQuestions } from "./api";

export function useQuestions(url, token) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function loadQuestions() {
    try {
      const data = await fetchQuestions(url, token);
      setQuestions(data);
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prevQuestion() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  return {
    questions,
    currentIndex,
    loadQuestions,
    nextQuestion,
    prevQuestion,
  };
}
