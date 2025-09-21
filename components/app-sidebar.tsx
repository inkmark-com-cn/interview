"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { mockIssueList } from "@/lib/mock";
import useIssuesStore from "@/stores/issues-store";

export function AppSidebar() {
  const { updateIssueByNumber } = useIssuesStore();

  const handleIssueClick = (issueNumber: number) => {
    updateIssueByNumber(issueNumber);
  };

  return (
    <Sidebar>
      <SidebarHeader className="text-center text-xl font-bold">
        InkMark AI
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {mockIssueList.map((issue) => (
          <div
            key={issue.number}
            className="px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
            onClick={() => handleIssueClick(issue.number)}
          >
            {issue.number}. {issue.title}
          </div>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
