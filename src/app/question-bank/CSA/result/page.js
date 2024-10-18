"use client";
import { useSearchParams } from "next/navigation";

export default function Result() {
  const resultParams = useSearchParams();

  const accuracy = resultParams.get("result");

  const isPassed = accuracy >= 60;

  return (
    <div>
      <h1>Result</h1>
      <p>
        {isPassed
          ? "Congratulations! You passed the exam."
          : "Sorry, you did not pass the exam."}
      </p>
      <p>Your accuracy: {accuracy}%</p>
    </div>
  );
}
