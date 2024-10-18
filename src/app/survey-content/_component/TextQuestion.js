import React, { useState } from "react";
import { Card, Form, Input } from "antd";
const { TextArea } = Input;

export default function TextQuestion({ question }) {
  const [textValue, setTextValue] = useState("");

  const onChange = (e) => {
    console.log(e.target.value);
    setTextValue(e.target.value);
  };
  return (
    <div className="Survey-Page pt-20">
      <Card title={question} className="w-4/5 mx-auto">
        <Form>
          <Form.Item>
            <TextArea
              value={textValue}
              onChange={onChange}
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
              placeholder="Enter your answer here"
            ></TextArea>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
