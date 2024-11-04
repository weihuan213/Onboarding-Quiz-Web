"use client";
import React, { useState } from "react";
import useQuestionStore from "@/app/_store/store";
import QuestionRender from "@/app/_component/questionForm/questionRender";
import { Button } from "antd";

export default function Result() {
  const { wrongQuestions, resetStore } = useQuestionStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const addToSet = () => {};
  const handleAnswerChange = () => {
    return null;
  };

  const renderQuestion = () => {
    if (!wrongQuestions[currentIndex]) return null;

    const currentQuestion = wrongQuestions[currentIndex];
    const currentAnswer = currentQuestion.selectedAnswer;

    return (
      <QuestionRender
        currentIndex={currentIndex}
        question={currentQuestion}
        selectedAnswer={currentAnswer}
        onChange={handleAnswerChange}
        showAnswers={true}
      />
    );
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {wrongQuestions.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            margin: "10px",
          }}
        >
          <Button
            type="primary"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            style={{ marginRight: "20px" }}
          >
            Previous
          </Button>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
              flex: 1,
            }}
          >
            <div
              style={{
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "10px",
                wordBreak: "break-word",
                overflowY: "auto",
                maxHeight: "1000px",
                display: "flex",
              }}
            >
              {renderQuestion()}
            </div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <Button
                type="primary"
                block
                onClick={addToSet}
                style={{ flex: 1 }}
              >
                Add to set
              </Button>
              <Button
                type="default"
                block
                onClick={resetStore}
                style={{ flex: 1 }}
              >
                reset
              </Button>
            </div>
          </div>

          <Button
            type="primary"
            disabled={currentIndex === wrongQuestions.length - 1}
            onClick={() => setCurrentIndex(currentIndex + 1)}
            style={{ marginLeft: "20px" }}
          >
            Next
          </Button>
        </div>
      ) : (
        <p>All questions answered correctly!</p>
      )}
    </div>
  );
}
