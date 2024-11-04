import { Card, Form, Space, Checkbox } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import React from "react";

export default function MultipleChoiceQuestion({
  currentIndex,
  question,
  options,
  onChange,
  selectedAnswers,
  showAnswers, // 新增参数
}) {
  return (
    <div className="Survey-Page pt-20">
      <Card
        title={
          <div className="question-title">
            {currentIndex + 1}. {question}
          </div>
        }
        className="question-card"
      >
        <Form>
          <Form.Item>
            <Checkbox.Group onChange={onChange} value={selectedAnswers}>
              <Space direction="vertical">
                {options.map((option) => (
                  <div
                    key={option.optionId}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Checkbox value={option.optionId}>
                      {option.content}
                    </Checkbox>
                    {showAnswers && option.isCorrect && (
                      <CheckOutlined
                        style={{ color: "green", marginLeft: "8px" }}
                      />
                    )}
                  </div>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Card>

      <style jsx>{`
        .question-title {
          word-break: break-word;
          white-space: normal;
        }
        .question-card {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
