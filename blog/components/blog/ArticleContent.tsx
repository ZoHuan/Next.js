"use client";

import { Article } from "@/types/blog.types";
import dynamic from "next/dynamic";

// 动态导入 Markdown 预览组件
const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className='animate-pulse bg-gray-200 dark:bg-gray-700 h-64 rounded-md'></div>,
});

interface ContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ContentProps) {
  return (
    <div className='prose dark:prose-invert max-w-none mb-10 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-md'>
      <MarkdownPreview
        source={article.content}
        className='bg-transparent! text-gray-900!'
        style={{
          backgroundColor: "transparent",
          color: "inherit",
        }}
      />
    </div>
  );
}
