"use client";

import { useState } from "react";
import ArticleEditor from "@/components/manage/ArticleEditor";

export default function CreateArticlePage() {
  const handleSave = (articleData: { title: string; content: string; tags: string[]; coverImage?: string }) => {
    // 这里可以添加创建文章的逻辑
    console.log("创建文章:", articleData);

    // 模拟创建成功
    alert("文章已成功创建！");
  };

  return <ArticleEditor mode='create' onSave={handleSave} saveLabel='创建文章' />;
}
