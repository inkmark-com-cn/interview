export function splitQA(text: string): {
  question: string;
  answer: string;
  error?: string;
} {
  const questionSep = "⭐⭐⭐⭐⭐ 题目 ⭐⭐⭐⭐⭐";
  const answerSeq = "⭐⭐⭐⭐⭐ 答案 ⭐⭐⭐⭐⭐";

  const parts = text.split(questionSep);

  if (parts.length < 2) {
    return {
      question: "",
      answer: "",
      error: "未找到题目分割符，请使用 '=== Q ==='",
    };
  }

  const answerParts = parts[1].split(answerSeq);

  if (answerParts.length < 2) {
    return {
      question: answerParts[0].trim(),
      answer: "",
      error: "未找到答案分割符，请使用 === A ===",
    };
  }

  return {
    question: answerParts[0].trim(),
    answer: answerParts[1].trim(),
  };
}
