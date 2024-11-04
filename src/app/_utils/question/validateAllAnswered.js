export function validateAllAnswered(questions, answers) {
  const AllAnswered = questions.every((question) => {
    const answer = answers[question.questionId];
    if (question.type === "single") {
      return answer !== undefined && answer !== null;
    } else if (question.type === "multiple") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return false;
  });
  return AllAnswered;
}
