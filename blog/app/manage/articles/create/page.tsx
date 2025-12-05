"use client";

import { useState } from "react";
import Link from "next/link";
import TitleInput from "@/components/manage/TitleInput";
import CoverImageUpload from "@/components/manage/CoverImageUpload";
import TagManager from "@/components/manage/TagManager";
import MarkdownEditor from "@/components/manage/MarkdownEditor";
import ActionButtons from "@/components/manage/ActionButtons";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSave = () => {
    // 这里可以添加保存文章的逻辑
    console.log("保存文章:", { title, content, tags });
  };

  const handleImageSelect = (file: File) => {
    console.log("选择的图片:", file);
    // 这里可以添加图片上传逻辑
  };

  return (
    <main className='flex-1 container mx-auto px-4 py-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold'>创建新文章</h1>
          <Link href='/manage' className='text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
            <i className='fa-solid fa-times'></i>
          </Link>
        </div>

        <div className='bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-md'>
          <div className='space-y-4'>
            {/* 标题输入 */}
            <TitleInput value={title} onChange={setTitle} />

            {/* 封面图片上传 */}
            <CoverImageUpload onImageSelect={handleImageSelect} />

            {/* 标签管理 */}
            <TagManager tags={tags} onTagsChange={setTags} />

            {/* Markdown编辑器 */}
            <MarkdownEditor value={content} onChange={setContent} height={600} />

            {/* 操作按钮 */}
            <ActionButtons onSave={handleSave} />
          </div>
        </div>
      </div>
    </main>
  );
}
