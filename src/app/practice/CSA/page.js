"use client";
import React, { useEffect, useState } from "react";
import { Button, message, Row } from "antd";
import config from "../../../../public/config";
import { useRouter } from "next/navigation";
import QuestionRender from "@/app/_component/questionForm/questionRender";
import { authValidation } from "@/app/_utils/user/authValidation";
import { loadQuestions } from "@/app/_utils/question/loadQuestions";
import { calculateScore } from "@/app/_utils/question/calculateScore";
import ProgressIndicator from "@/app/_component/questionForm/ProgressIndicator";
import useQuestionStore from "@/app/_store/store";

export default function Page() {
  const router = useRouter();
  const api = `${config.baseURL}api/exam-pools/1/questions/`;
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false); // 控制是否显示正确答案

  const { setWrongQuestions } = useQuestionStore();

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
    const wrongQuestions = questions.filter((q) => {
      const userAnswer = answers[q.questionId];

      if (q.type === "single") {
        const correctOption = q.options.find((option) => option.isCorrect);
        return correctOption && correctOption.optionId !== userAnswer;
      } else if (q.type === "multiple") {
        const correctOptions = q.options
          .filter((option) => option.isCorrect)
          .map((option) => option.optionId);

        // Check that user's answer matches exactly the set of correct options
        return (
          !Array.isArray(userAnswer) || // Check if user answer is an array
          userAnswer.length !== correctOptions.length || // Check length matches
          !userAnswer.every((answer) => correctOptions.includes(answer)) || // Check all user answers are correct
          !correctOptions.every((option) => userAnswer.includes(option)) // Ensure all correct options are selected
        );
      }
      return false;
    });

    const questionsWithAnswers = wrongQuestions.map((q) => ({
      ...q,
      selectedAnswer: answers[q.questionId],
    }));

    setWrongQuestions(questionsWithAnswers);
    router.push("/practice/result");
  };

  const toggleShowAnswers = () => {
    setShowAnswers((prev) => !prev); // 切换显示答案状态
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
        showAnswers={showAnswers}
      />
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
  const handleJumpToQuestion = (index) => {
    setCurrentIndex(index); // 跳转到指定题目
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <ProgressIndicator
            questions={questions}
            answers={answers}
            onJumpToQuestion={handleJumpToQuestion}
          />
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
                  disabled={!allAnswered}
                  onClick={handleSubmit}
                  style={{ flex: 1 }}
                >
                  Submit
                </Button>
                <Button
                  type="default"
                  block
                  onClick={toggleShowAnswers}
                  style={{ flex: 1 }}
                >
                  {showAnswers ? "Hide Answers" : "Show Answers"}
                </Button>
              </div>
            </div>

            <Button
              type="primary"
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex(currentIndex + 1)}
              style={{ marginLeft: "20px" }}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
}
