import { Card, Form, Button, Radio, Space } from "antd";
import React from "react";

function SingleChoiceQuestion({ question, options, onChange, selectedAnswer }) {
  return (
    <div className="Survey-Page pt-20">
      <Card title={question} className="">
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
    </div>
  );
}

export default SingleChoiceQuestion;
