import { Card, Form, Button, Radio, Space } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";

export default function SingleChoiceQuestion({
  currentIndex,
  question,
  options,
  onChange,
  selectedAnswer,
  showAnswers,
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
        style={{ overflow: "visible" }}
      >
        <Form style={{ overflow: "visible" }}>
          <Form.Item>
            <Radio.Group onChange={onChange} value={selectedAnswer}>
              <Space direction="vertical">
                {options.map((option) => (
                  <div
                    key={option.optionId}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Radio value={option.optionId}>
                      {option.content}{" "}
                      {showAnswers && option.isCorrect && (
                        <CheckOutlined
                          style={{ color: "green", marginLeft: "8px" }}
                        />
                      )}
                    </Radio>
                  </div>
                ))}
              </Space>
            </Radio.Group>
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
        .ant-radio-wrapper {
          overflow: visible;
        }
      `}</style>
    </div>
  );
}
