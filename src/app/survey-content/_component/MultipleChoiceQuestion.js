import { Card, Form, Space, Checkbox } from "antd";

export default function MultipleChoiceQuestion({
  question,
  options,
  onChange,
  selectedAnswers,
}) {
  return (
    <div className="Survey-Page pt-20">
      <Card
        title={<div className="question-title">{question}</div>}
        className="question-card"
      >
        <Form>
          <Form.Item>
            <Checkbox.Group onChange={onChange} value={selectedAnswers}>
              <Space direction="vertical">
                {options.map((option) => (
                  <Checkbox value={option.optionId} key={option.optionId}>
                    {option.content}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Card>

      <style jsx>{`
        .question-title {
          word-break: break-word; /* 强制换行 */
          white-space: normal; /* 允许正常换行 */
        }

        .question-card {
          width: 100%; /* 占据全部宽度 */
          max-width: 1000px; /* 最大宽度限制 */
          margin: 0 auto; /* 居中显示 */
        }
      `}</style>
    </div>
  );
}
