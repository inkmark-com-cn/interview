import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel className="min-w-[300px] max-w-[300px] bg-gray-100 shadow-xl">
        <h2 className="text-base font-bold p-2">目录</h2>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className=" min-w-1/3 bg-gray-50 shadow-xl">
        <h2 className="text-base font-bold p-2">题目</h2>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="min-w-1/3">
        <h2 className="text-base font-bold p-2">答案与解析</h2>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
