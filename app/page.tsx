import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { splitQA } from "@/lib/split-qa";
import { mockBody } from "@/lib/mock";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const { question, answer } = splitQA(mockBody);

export default function Home() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel className="min-w-1/6 max-w-[300px] shadow-xl px-6">
        <ScrollArea className="h-screen overflow-scroll">
          <h2 className="text-xl font-bold py-6 sticky top-0 bg-white">目录</h2>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="min-w-2/6 shadow-xl px-6">
        <ScrollArea className="h-screen overflow-scroll">
          <h2 className="text-xl font-bold py-6 sticky top-0 bg-white">题目</h2>
          <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
            {question}
          </Markdown>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="min-w-3/6 px-6">
        <ScrollArea className="h-screen overflow-scroll">
          <h2 className="text-xl font-bold py-6 sticky top-0 bg-white">
            答案与解析
          </h2>
          <Markdown
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            children={answer}
            components={{
              h1: (props) => (
                <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />
              ),
              h2: (props) => (
                <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />
              ),
              p: (props) => <p className="my-2" {...props} />,
              ul: (props) => <ul className="list-disc pl-6 my-2" {...props} />,
              a: (props) => (
                <a className="text-blue-600 hover:underline" {...props} />
              ),
              table: (props) => (
                <table className="min-w-full border-collapse my-4" {...props} />
              ),
              thead: (props) => <thead className="bg-gray-100" {...props} />,
              tbody: (props) => (
                <tbody className="divide-y divide-gray-200" {...props} />
              ),
              tr: (props) => (
                <tr
                  className="odd:bg-white even:bg-gray-100 hover:bg-gray-100"
                  {...props}
                />
              ),
              th: (props) => (
                <th
                  className="px-4 py-2 text-left font-semibold text-gray-700 border border-gray-200"
                  {...props}
                />
              ),
              td: (props) => (
                <td className="px-4 py-2 border border-gray-200" {...props} />
              ),
              code(props) {
                const { children, className, node, ref: _, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={dark as any}
                    {...rest}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
