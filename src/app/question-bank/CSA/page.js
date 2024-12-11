"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal, Spin } from "antd";
import config from "../../../../public/config";
import { useRouter } from "next/navigation";
import QuestionRender from "@/app/_component/questionForm/questionRender";
import { authValidation } from "@/app/_utils/user/authValidation";
import { loadQuestions } from "@/app/_utils/question/loadQuestions";
import { calculateScore } from "@/app/_utils/question/calculateScore";
import ProgressIndicator from "@/app/_component/questionForm/ProgressIndicator";

export default function Page() {
  const router = useRouter();
  const api = `${config.baseURL}api/quiz-questions/CSA/`;
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(1800);

  // 验证登录
  useEffect(() => {
    const token = authValidation();
    if (!token) {
      router.push("/user/login");
    }
  }, [router]);

  // 用户确认准备好后开始加载题目
  const handleStartExam = () => {
    setLoading(true);
    setIsModalVisible(false);
    const token = authValidation();
    if (token) {
      loadQuestions(api, token, (loadedQuestions) => {
        setQuestions(loadedQuestions || []);
        setLoading(false);
      });
    }
  };

  // 倒计时计时器
  useEffect(() => {
    if (!questions.length) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions.length]);

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

  const handleJumpToQuestion = (index) => {
    setCurrentIndex(index); // 跳转到指定题目
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Modal
        title="Start Exam"
        visible={isModalVisible}
        onOk={handleStartExam}
        onCancel={() => router.push("/")}
        okText="Ready"
        cancelText="Back"
      >
        <p>Are you ready to start the exam?</p>
      </Modal>
      {loading && (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <Spin size="large" />
        </div>
      )}
      {/* 仅在用户开始考试后显示倒计时和ProgressIndicator */}
      {!isModalVisible && !loading && questions.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "240px",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* 倒计时 */}
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                backgroundColor: "#f2f2f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: timeLeft < 600 ? "#FF4D4F" : "#1890FF",
                }}
              >
                {formatTime(timeLeft)}
              </div>
            </div>
            {/* 题目进度指示器 */}
            <ProgressIndicator
              questions={questions}
              answers={answers}
              onJumpToQuestion={handleJumpToQuestion}
              circleStyle={{
                width: "90px",
                height: "90px",
              }}
            ></ProgressIndicator>
          </div>
        </div>
      )}

      {!loading && questions.length > 0 ? (
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
              <Button
                type="primary"
                block
                disabled={!allAnswered}
                onClick={handleSubmit}
                style={{ width: "100%" }}
              >
                Submit
              </Button>
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
        </>
      ) : (
        !loading &&
        !isModalVisible &&
        questions.length === 0 && <p>No questions available.</p>
      )}
    </div>
  );
}
