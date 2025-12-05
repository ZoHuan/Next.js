"use client";

import { useState } from "react";
import Link from "next/link";
import TitleInput from "@/components/manage/TitleInput";
import CoverImageUpload from "@/components/manage/CoverImageUpload";
import TagManager from "@/components/manage/TagManager";
import MarkdownEditor from "@/components/manage/MarkdownEditor";
import ArticleActionButtons from "@/components/manage/ArticleActionButtons";

export interface ArticleEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
  initialCoverImage?: string;
  onSave: (articleData: { title: string; content: string; tags: string[]; coverImage?: string }) => void;
  saveLabel?: string;
  isLoading?: boolean;
  mode?: "create" | "edit";
  pageTitle?: string;
  showBackButton?: boolean;
}

export default function ArticleEditor({
  initialTitle = "",
  initialContent = "",
  initialTags = [],
  initialCoverImage = "",
  onSave,
  saveLabel = "保存文章",
  isLoading = false,
  mode = "edit",
  pageTitle,
  showBackButton = true,
}: ArticleEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [coverImage, setCoverImage] = useState(initialCoverImage);

  const handleImageSelect = (file: File) => {
    console.log("选择的图片:", file);
    // 这里可以添加图片上传逻辑
    // 上传成功后更新coverImage状态
  };

  const handleImageRemove = () => {
    setCoverImage("");
  };

  const handleSave = () => {
    onSave({
      title,
      content,
      tags,
      coverImage,
    });
  };

  // 根据模式设置默认页面标题
  const defaultPageTitle = pageTitle || (mode === "create" ? "创建新文章" : "编辑文章");

  if (isLoading) {
    return (
      <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4'></div>
          <div className='h-4 bg-gray-300 rounded w-1/2 mx-auto'></div>
        </div>
      </div>
    );
  }

  return (
    <main className='flex-1 container mx-auto px-4 py-8'>
      <div className='max-w-3xl mx-auto'>
        {/* 页面头部 */}
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold'>{defaultPageTitle}</h1>
          {showBackButton && (
            <Link href='/manage/articles' className='text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
              <i className='fa-solid fa-times'></i>
            </Link>
          )}
        </div>

        {/* 编辑器内容 */}
        <div className='bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-md'>
          <div className='space-y-4'>
            {/* 标题输入 */}
            <TitleInput value={title} onChange={setTitle} />

            {/* 封面图片上传 */}
            <CoverImageUpload onImageSelect={handleImageSelect} existingImage={coverImage} onImageRemove={handleImageRemove} />

            {/* 标签管理 */}
            <TagManager tags={tags} onTagsChange={setTags} />

            {/* Markdown编辑器 */}
            <MarkdownEditor value={content} onChange={setContent} height={600} placeholder='开始编写你的文章内容（支持Markdown格式）...' />

            {/* 操作按钮 */}
            <ArticleActionButtons onSave={handleSave} saveLabel={saveLabel} />
          </div>
        </div>
      </div>
    </main>
  );
}
