"use client";
import React from "react";
import SingleChoiceQuestion from "./_component/SingleChoiceQuestion";
import MultipleChoiceQuestion from "./_component/MultipleChoiceQuestion";
import TextQuestion from "./_component/TextQuestion";

export default function SurveyPage() {
  const question = "What is CSS";
  const options = ["Option A", "Option B", "Option C"];
  return (
    <div>
      <TextQuestion question={question} />
    </div>
  );
}
