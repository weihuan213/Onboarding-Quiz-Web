import { Card, Form, Radio, Space } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import React from "react";

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
        className="responsive-card"
        style={{ overflow: "visible" }}
      >
        <Form
          style={{ overflow: "visible" }}
          className="xl:!w-[1280px] lg:!w-[800px]"
        >
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
        .responsive-card {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px;
          border-radius: 8px;
        }
        .question-title {
          word-break: break-word;
          white-space: normal;
          font-size: 2rem;
        } /* 响应式调整 */
        @media (max-width: 1280px) {
          .responsive-card {
            max-width: 1000px;
            padding: 10px;
            font-size: 16px;
          }
          .question-title {
            font-size: 1.2rem;
          }
        }
        @media (max-width: 768px) {
          .responsive-card {
            max-width: 300px;
            padding: 4px;
          }
          .question-title {
            font-size: 1rem;
          }
        }
        @media (max-width: 480px) {
          .responsive-card {
            max-width: 100%;
            padding: 2px;
          }
          .question-title {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
