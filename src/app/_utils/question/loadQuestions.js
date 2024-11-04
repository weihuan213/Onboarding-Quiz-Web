import { fetchQuestions } from "@/app/question-bank/utils/api";

export async function loadQuestions(api, token, setQuestions, setLoading) {
  setLoading(true);
  try {
    const data = await fetchQuestions(api, token);
    setQuestions(data);
  } catch (error) {
    console.error("Failed to load questions:", error);
  } finally {
    setLoading(false);
  }
}
