import { create } from "zustand";
import { mockIssueList } from "@/lib/mock";
import { splitQA } from "@/lib/split-qa";

const { question: DEFAULT_QUESTION, answer: DEFAULT_ANSWER } = splitQA(
  mockIssueList[0].body || ""
);

const useIssuesStore = create<{
  question: string;
  answer: string;
  updateIssueByNumber: (issueNumber: number) => void;
}>((set) => ({
  question: DEFAULT_QUESTION,
  answer: DEFAULT_ANSWER,
  updateIssueByNumber: (issueNumber: number) => {
    const newIssue = mockIssueList.find(
      (issue) => issue.number === issueNumber
    );
    if (newIssue) {
      const { question, answer } = splitQA(newIssue.body || "");
      set({ question, answer });
    } else {
      set({ question: "", answer: "" });
    }
  },
}));

export default useIssuesStore;
