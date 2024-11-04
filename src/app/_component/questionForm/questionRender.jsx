import SingleChoiceQuestion from "../../survey-content/_component/SingleChoiceQuestion";
import MultipleChoiceQuestion from "../../survey-content/_component/MultipleChoiceQuestion";

const QuestionRender = ({
  currentIndex,
  question,
  selectedAnswer,
  onChange,
  showAnswers=false, 
}) => {
  if (!question) return <p>Unknown question type</p>;

  switch (question.type) {
    case "single":
      return (
        <SingleChoiceQuestion
          currentIndex={currentIndex}
          question={question.content}
          options={question.options}
          onChange={(e) => onChange(question.questionId, e.target.value)}
          selectedAnswer={selectedAnswer}
          showAnswers={showAnswers} // 传递给子组件
        />
      );
    case "multiple":
      return (
        <MultipleChoiceQuestion
          currentIndex={currentIndex}
          question={question.content}
          options={question.options}
          onChange={(list) => onChange(question.questionId, list)}
          selectedAnswers={selectedAnswer}
          showAnswers={showAnswers} // 传递给子组件
        />
      );
    default:
      return <p>Invalid question type</p>;
  }
};

export default QuestionRender;
