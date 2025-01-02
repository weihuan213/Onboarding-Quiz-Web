"use client";
import React, { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import config from "../../../../public/config";
import { useRouter } from "next/navigation";
import QuestionRender from "@/app/_component/questionForm/questionRender";
import { authValidation } from "@/app/_utils/user/authValidation";
import { loadQuestions } from "@/app/_utils/question/loadQuestions";
import ProgressIndicator from "@/app/_component/questionForm/ProgressIndicator";
import useQuestionStore from "@/app/_store/store";
import TextQuestion from "@/app/survey-content/_component/TextQuestion";

export default function Page() {
  const router = useRouter();
  const api = `${config.baseURL}api/exam-pools/2/questions/`;
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
      // 开始加载，设置 loading 为 true
      setLoading(true);

      loadQuestions(api, token, (loadedQuestions) => {
        setQuestions(loadedQuestions || []); // 加载完成，设置题目
        setLoading(false); // 完成加载后设置 loading 为 false
      });
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

    return currentQuestion.type === "text" ? (
      <TextQuestion
        currentIndex={currentIndex}
        question={currentQuestion.content}
      />
    ) : (
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
    <div
      style={{ margin: "0 auto", padding: "20px" }}
      className="xl:!w-[1280px]"
    >
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <Spin size="large" />
        </div>
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
              onClick={() => {
                console.log(showAnswers);
                if (showAnswers) {
                  setShowAnswers(false); // 隐藏答案
                  console.log(showAnswers);
                }
                setCurrentIndex(currentIndex - 1); // 跳转到上一题
              }}
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
              onClick={() => {
                if (showAnswers) {
                  setShowAnswers(false); // 隐藏答案
                }
                setCurrentIndex(currentIndex + 1); // 跳转到下一题
              }}
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
