"use client";
import React, { useEffect, useState } from "react";
import SingleChoiceQuestion from "../../survey-content/_component/SingleChoiceQuestion";
import MultipleChoiceQuestion from "@/app/survey-content/_component/MultipleChoiceQuestion";
import { Button, Flex, message } from "antd";
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

  // 检查 token 状态并处理跳转逻辑
  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!isTokenValid()) {
      message.warning("Session expired. Please log in again.");
      clearToken(); // 清除无效 token
      router.push("/user/login"); // 跳转到登录页
    } else {
      loadQuestions(token); // 只有 token 有效时加载问题
    }
  }, [router]);

  // 加载问题函数
  const loadQuestions = async (token) => {
    setLoading(true); // 开始加载
    try {
      const data = await fetchQuestions(api, token);
      // console.log(data);
      setQuestions(data); // 假设API返回的数据结构包含 questions
    } catch (error) {
      console.error("Failed to load questions:", error);
    } finally {
      setLoading(false); // 加载结束
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
    console.log(`Correct answers: ${correctCount}`);
    console.log(`Accuracy: ${accuracy.toFixed(2)}%`);

    router.push(`/question-bank/CSA/result?result=${accuracy}`, {
      query: { accuracy: accuracy.toFixed(2) },
    });
  };

  const renderQuestion = () => {
    if (
      questions.length === 0 ||
      currentIndex == null ||
      !questions[currentIndex]
    ) {
      return null;
    }

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
              handleAnswerChange(currentQuestion.questionId, list, true)
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
    <div>
      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length > 0 ? (
        <>
          <Flex gap="small" justify="center" align="center" wrap>
            <Button
              type="primary"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
            >
              Previous
            </Button>
            {renderQuestion()}
            <Button
              type="primary"
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex(currentIndex + 1)}
            >
              Next
            </Button>
          </Flex>
          <Flex justify="end" style={{ marginTop: 20, marginRight: "30%" }}>
            <Button
              type="primary"
              disabled={!allAnswered}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Flex>
        </>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
}
