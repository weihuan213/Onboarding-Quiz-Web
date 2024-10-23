"use client";
import React, { useEffect, useState } from "react";
import SingleChoiceQuestion from "../../survey-content/_component/SingleChoiceQuestion";
import MultipleChoiceQuestion from "@/app/survey-content/_component/MultipleChoiceQuestion";
import { Button, message } from "antd";
import config from "../../../../public/config";
import { useRouter } from "next/navigation";
import { isTokenValid, clearToken } from "../utils/auth";
import { fetchQuestions } from "../utils/api";

export default function Page() {
  const router = useRouter();
  const api = `${config.baseURL}api/exam-pools/1/questions/`;
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!isTokenValid()) {
      message.warning("Session expired. Please log in again.");
      clearToken();
      router.push("/user/login");
    } else {
      loadQuestions(token);
    }
  }, [router]);

  const loadQuestions = async (token) => {
    setLoading(true);
    try {
      const data = await fetchQuestions(api, token);
      setQuestions(data);
    } catch (error) {
      console.error("Failed to load questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      const userAnswer = answers[question.questionId];
      if (question.type === "single") {
        const correctOption = question.options.find(
          (option) => option.isCorrect
        );
        if (correctOption && correctOption.optionId === userAnswer) {
          correctCount++;
        }
      } else if (question.type === "multiple") {
        const correctOptions = question.options
          .filter((option) => option.isCorrect)
          .map((option) => option.optionId);
        if (
          Array.isArray(userAnswer) &&
          userAnswer.length === correctOptions.length &&
          userAnswer.every((answer) => correctOptions.includes(answer))
        ) {
          correctCount++;
        }
      }
    });

    const accuracy = (correctCount / questions.length) * 100;
    router.push(`/question-bank/CSA/result?result=${accuracy.toFixed(2)}`);
  };

  const renderQuestion = () => {
    if (!questions[currentIndex]) return null;

    const currentQuestion = questions[currentIndex];
    const currentAnswer =
      answers[currentQuestion.questionId] ||
      (currentQuestion.type === "multiple" ? [] : null);

    switch (currentQuestion.type) {
      case "single":
        return (
          <SingleChoiceQuestion
            question={currentQuestion.content}
            options={currentQuestion.options}
            onChange={(e) =>
              handleAnswerChange(currentQuestion.questionId, e.target.value)
            }
            selectedAnswer={currentAnswer}
          />
        );
      case "multiple":
        return (
          <MultipleChoiceQuestion
            question={currentQuestion.content}
            options={currentQuestion.options}
            onChange={(list) =>
              handleAnswerChange(currentQuestion.questionId, list)
            }
            selectedAnswers={currentAnswer}
          />
        );
      default:
        return <p>Unknown question type</p>;
    }
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
