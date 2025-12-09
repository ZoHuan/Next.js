"use client";

import { useState } from "react";
import Link from "next/link";
import TitleInput from "@/components/manage/TitleInput";
import CoverImageUpload from "@/components/manage/CoverImageUpload";
import TagManager from "@/components/manage/TagManager";
import MarkdownEditor from "@/components/manage/MarkdownEditor";
import ArticleActionButtons from "@/components/manage/ArticleActionButtons";
import { useAuth } from "@/contexts/AuthContext";

export interface ArticleEditorProps {
  initialData?: {
    title: string;
    content: string;
    tags: string[];
    imageUrl: string;
  };
  onSave: (articleData: { title: string; content: string; tags: string[]; imageUrl: string; slug: string; description: string }) => void;
  pageTitle?: string;
  saveLabel?: string;
  mode?: "create" | "edit";
  showBackButton?: boolean;
}

export default function ArticleEditor({
  initialData = {
    title: "",
    content: "",
    tags: [],
    imageUrl: "",
  },
  onSave,
  mode = "edit",
  saveLabel = "保存文章",
  pageTitle,
  showBackButton = true,
}: ArticleEditorProps) {
  // 直接使用initialData的值初始化状态
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);
  const [tags, setTags] = useState<string[]>(initialData.tags);
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl);

  const { user } = useAuth();

  // 生成slug的方法
  const generateSlug = (title: string): string => {
    if (!title.trim()) return "";
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // 从内容中提取描述的方法
  const extractDescription = (content: string): string => {
    if (!content.trim()) return "文章描述";
    const textContent = content.replace(/<[^>]*>/g, "");
    const description = textContent.substring(0, 150).trim();
    return description.length > 0 ? description + (textContent.length > 150 ? "..." : "") : "文章描述";
  };

  // 处理图片选择（上传完成后）
  const handleImageSelect = (uploadedImageUrl: string) => {
    setImageUrl(uploadedImageUrl);
  };

  const handleImageRemove = () => {
    setImageUrl("");
  };

  const handleSave = () => {
    // 检查用户登录状态
    if (!user) {
      alert("请先登录后再进行操作");
      return;
    }

    const articleData = {
      title,
      content,
      tags,
      imageUrl,
      description: extractDescription(content),
      slug: generateSlug(title),
    };

    onSave(articleData);
  };

  // 根据模式设置默认页面标题
  const defaultPageTitle = pageTitle || (mode === "create" ? "创建新文章" : "编辑文章");

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
            <CoverImageUpload onImageSelect={handleImageSelect} existingImage={imageUrl} onImageRemove={handleImageRemove} />

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
