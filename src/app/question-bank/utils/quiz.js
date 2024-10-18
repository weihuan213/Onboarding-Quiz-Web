import React, { useEffect } from "react";
import SingleChoiceQuestion from "../../survey-content/_component/SingleChoiceQuestion";
import MultipleChoiceQuestion from "../../survey-content/_component/MultipleChoiceQuestion";
import { useQuestions } from "../utils/hooks"; // 确保路径正确

export default function QuizPage() {
  const { questions, currentIndex, loadQuestions, nextQuestion, prevQuestion } =
    useQuestions();

  useEffect(() => {
    loadQuestions();
  }, []);

  const renderQuestion = () => {
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case "single":
        return (
          <SingleChoiceQuestion
            question={currentQuestion.question}
            options={currentQuestion.options}
          />
        );
      case "multiple":
        return (
          <MultipleChoiceQuestion
            question={currentQuestion.question}
            options={currentQuestion.options}
          />
        );
      default:
        return <p>Unknown question type</p>;
    }
  };

  

  return (
    <div>
      {questions.length > 0 ? (
        <div>
          {renderQuestion()}
          <button onClick={prevQuestion} disabled={currentIndex === 0}>
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={currentIndex === questions.length - 1}
          >
            Next
          </button>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}
