import React from "react";
import { Popover, Badge, Progress } from "antd";

export default function ProgressIndicator({
  questions,
  answers,
  onJumpToQuestion,
}) {
  const isAnswered = (questionId) => answers[questionId] !== undefined;
  const answeredCount = questions.filter((q) => isAnswered(q.questionId)).length;
  const allQuestionCount = questions.length;
  const progressPercentage = Math.round((answeredCount / allQuestionCount) * 100);

  const renderCircles = () =>
    questions.map((question, index) => {
      const answered = isAnswered(question.questionId);

      return (
        <div
          key={question.questionId}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => onJumpToQuestion(index)}
        >
          <Badge
            count={index + 1}
            style={{
              backgroundColor: answered ? "green" : "red",
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: 16,
              cursor: "pointer",
            }}
          />
        </div>
      );
    });

  return (
    <Popover
      content={
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gap: "10px",
          }}
        >
          {renderCircles()}
        </div>
      }
      title="Progress"
      trigger="hover"
    >
      {answeredCount === allQuestionCount ? (
        <Progress
          type="circle"
          percent={100}
          width={60}
        />
      ) : (
        <Progress
          type="circle"
          percent={progressPercentage}
          format={() => `${answeredCount} / ${allQuestionCount}`}
          width={70} // 控制普通圆圈大小
          strokeColor={{
            "0%": "#b9f6ca", // 渐变起点颜色
            "100%": "#52C41A", // 渐变终点颜色
          }}
          trailColor="#F0F0F0" // 未完成部分的颜色
        />
      )}
    </Popover>
  );
}
