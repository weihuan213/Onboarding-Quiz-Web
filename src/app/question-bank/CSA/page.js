"use client";
import React, { useEffect, useState } from "react";
import SingleChoiceQuestion from "../../survey-content/_component/SingleChoiceQuestion";
import MultipleChoiceQuestion from "@/app/survey-content/_component/MultipleChoiceQuestion";
import { useQuestions } from "../utils/hook";
import { Button, Flex } from "antd";
import config from "../../../../public/config";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const api = `${config.baseURL}/exam-pools/1/questions/`;
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3NGFjZmM3NmI5MmQ0MGYwYWM1YjViYTY5OGVmOGY3OSIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTcyODMxNTE2OSwiZXhwIjoxNzI5NTI0NzY5fQ.tGL99cLiQ9YeqpsHKCUWA3nrhzD_oJ4Bufl79kAh64c";
  const { questions, currentIndex, loadQuestions, nextQuestion, prevQuestion } =
    useQuestions(api, token);

  useEffect(() => {
    loadQuestions();
  }, []);

  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, answer, isMulti = false) => {
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

    // 跳转到结果页面并传递正确率
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
    if (!currentIndex && currentIndex !== 0) return null;

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
      {questions.length > 0 ? (
        <>
          <Flex gap="small" justify="center" align="center" wrap>
            <Button
              type="primary"
              disabled={currentIndex === 0}
              onClick={prevQuestion}
            >
              Previous
            </Button>
            {renderQuestion()}
            <Button
              type="primary"
              disabled={currentIndex === questions.length - 1}
              onClick={nextQuestion}
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
        <p>Loading questions...</p>
      )}
    </div>
  );
}
