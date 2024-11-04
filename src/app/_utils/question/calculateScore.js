export function calculateScore(questions, answers) {
  let correctCount = 0;
  questions.forEach((question) => {
    const userAnswer = answers[question.questionId];
    if (question.type === "single") {
      const correctOption = question.options.find((option) => option.isCorrect);
      if (correctOption && correctOption.optionId === userAnswer) {
        correctCount++;
      }
    } else if (question.type === "multiple") {
      const correctOptions = question.options
        .filter((option) => option.isCorrect)
        .map((option) => option.optionId);
      if (
        Array.isArray(userAnswer) &&
        userAnswer.length === correctOptions.length &&
        userAnswer.every((answer) => correctOptions.includes(answer))
      ) {
        correctCount++;
      }
    }
  });
  return (correctCount / questions.length) * 100;
}
