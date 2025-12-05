"use client";

import dynamic from "next/dynamic";

// 动态导入Markdown编辑器，避免SSR问题
const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
  placeholder?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  height = 600,
  placeholder = "开始编写你的文章内容（支持Markdown格式）...",
}: MarkdownEditorProps) {
  return (
    <div className='w-full'>
      <MDEditor
        value={value}
        onChange={(value) => onChange(value || "")}
        height={height}
        preview='edit'
        hideToolbar={false}
        visibleDragbar={true}
        textareaProps={{
          placeholder,
        }}
        style={{
          borderRadius: "0 0 0.375rem 0.375rem",
          border: "1px solid #e5e7eb",
          borderTop: "none",
        }}
      />
    </div>
  );
}
