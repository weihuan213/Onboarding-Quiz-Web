"use client";
import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import config from "../../../../public/config";
import { useRouter } from "next/navigation";
import QuestionRender from "@/app/_component/questionForm/questionRender";
import { authValidation } from "@/app/_utils/user/authValidation";
import { loadQuestions } from "@/app/_utils/question/loadQuestions";
import { calculateScore } from "@/app/_utils/question/calculateScore";

export default function Page() {
  const router = useRouter();
  const api = `${config.baseURL}api/exam-pools/1/questions/`;
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Verify whether the token has expired.
  useEffect(() => {
    const token = authValidation();
    if (!token) {
      router.push("/user/login");
    } else {
      loadQuestions(api, token, setQuestions, setLoading);
    }
  }, [router]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    const accuracy = calculateScore(questions, answers);
    router.push(`/question-bank/CSA/result?result=${accuracy.toFixed(2)}`);
  };

  const renderQuestion = () => {
    if (!questions[currentIndex]) return null;

    const currentQuestion = questions[currentIndex];
    const currentAnswer =
      answers[currentQuestion.questionId] ||
      (currentQuestion.type === "multiple" ? [] : null);

    return (
      <QuestionRender
        currentIndex={currentIndex}
        question={currentQuestion}
        selectedAnswer={currentAnswer}
        onChange={handleAnswerChange}
      ></QuestionRender>
    );
  };

  const allAnswered = questions.every((question) => {
    const answer = answers[question.questionId];
    if (question.type === "single") {
      return answer !== undefined && answer !== null;
    } else if (question.type === "multiple") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return false;
  });

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Button
              type="primary"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
              style={{ marginRight: "20px" }} // Add space between Previous button and question
            >
              Previous
            </Button>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Center question and submit vertically
                marginBottom: "20px",
                flex: 1, // Allow the question area to grow and fill space
              }}
            >
              <div
                style={{
                  width: "100%", // Take full width
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px",
                  marginBottom: "10px",
                  wordBreak: "break-word",
                  overflowY: "auto", // Enable vertical scrolling
                  maxHeight: "1000px", // Set a max height for the scrollable area
                  display: "flex", // Use flex to control inner content
                }}
              >
                {renderQuestion()}
              </div>
              <Button
                type="primary"
                block
                disabled={!allAnswered}
                onClick={handleSubmit}
                style={{ width: "100%" }} // Ensure submit button is the same width
              >
                Submit
              </Button>
            </div>

            <Button
              type="primary"
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex(currentIndex + 1)}
              style={{ marginLeft: "20px" }} // Add space between question and Next button
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
}
