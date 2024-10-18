"use client";
import React, { useState } from "react";
import { Segmented, Form, Select, Input, Button, Radio, Checkbox } from "antd";

export default function Page() {
  const [questionType, setQuestionType] = useState("Single");
  const [options, setOptions] = useState([{ key: Date.now(), value: "" }]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleQuestionTypeChange = (value) => {
    setQuestionType(value);
    setSelectedOption(null); // Reset selected option when question type changes
  };

  const handleOptionChange = (key, event) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.key === key ? { ...option, value: event.target.value } : option
      )
    );
  };

  const addOption = () => {
    setOptions((prevOptions) => [
      ...prevOptions,
      { key: Date.now(), value: "" },
    ]);
  };

  const removeOption = (key) => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.key !== key)
    );
    if (selectedOption === key) {
      setSelectedOption(null); // Reset selected option if the removed option was selected
    }
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Form
      style={{
        margin: "0 auto",
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Question Type"
        name="variant"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Segmented
          options={["Single", "Multiple"]}
          onChange={handleQuestionTypeChange}
          value={questionType}
        />
      </Form.Item>
      <Form.Item
        label="Question Source"
        name="Select"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select>
          <Select.Option value="CSA">CSA</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Question Title"
        name="Question Title"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Input.TextArea></Input.TextArea>
      </Form.Item>
      <Form.Item
        label="Options"
        name="Options"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        {options.map((option, index) => (
          <div
            key={option.key}
            style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
          >
            {questionType === "Single" ? (
              <Radio.Group
                onChange={handleRadioChange}
                value={selectedOption}
                style={{ marginRight: 8 }}
              >
                <Radio value={option.key} />
              </Radio.Group>
            ) : (
              <Checkbox style={{ marginRight: 8 }} />
            )}
            <Input
              value={option.value}
              onChange={(event) => handleOptionChange(option.key, event)}
              style={{ marginRight: 8 }}
            />
            {index > 0 && (
              <Button type="danger" onClick={() => removeOption(option.key)}>
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button type="dashed" onClick={addOption} style={{ width: "100%" }}>
          Add Option
        </Button>
      </Form.Item>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary">Submit</Button>
      </div>
    </Form>
  );
}
