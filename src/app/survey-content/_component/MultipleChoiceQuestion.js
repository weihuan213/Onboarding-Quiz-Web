import { Card, Form, Space, Checkbox } from "antd";
import React, { useState } from "react";

export default function MultipleChoiceQuestion({
  question,
  options,
  onChange,
  selectedAnswers,
}) {
  return (
    <div className="Survey-Page pt-20">
      <Card title={question} className="w-4/5">
        <Form>
          <Form.Item>
            <Checkbox.Group onChange={onChange} value={selectedAnswers}>
              <Space direction="vertical">
                {options.map((option, index) => (
                  <Checkbox value={option.optionId} key={option.optionId}>
                    {option.content}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
