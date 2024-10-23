import { Card, Form, Button, Radio, Space } from "antd";
import React from "react";

export default function SingleChoiceQuestion({
  question,
  options,
  onChange,
  selectedAnswer,
}) {
  return (
    <div className="Survey-Page pt-20">
      <Card
        title={<div className="question-title">{question}</div>}
        className="question-card"
      >
        <Form>
          <Form.Item>
            <Radio.Group onChange={onChange} value={selectedAnswer}>
              <Space direction="vertical">
                {options.map((option) => (
                  <Radio value={option.optionId} key={option.optionId}>
                    {option.content}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Card>

      <style jsx>{`
        .question-title {
          word-break: break-word;
          white-space: normal; /* 允许正常的换行 */
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
