"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import ArticleEditor from "@/components/manage/ArticleEditor";
import { articleApi } from "@/lib/db";
import { useAuth } from "@/contexts/AuthContext";

export default function CreateArticlePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [isSaving, setIsSaving] = useState(false);

  // 统一在这里处理验证和保存逻辑
  const handleSave = useCallback(
    async (articleData: { title: string; content: string; tags: string[]; imageUrl: string; slug: string; description: string }) => {
      if (!user) {
        alert("请先登录后再创建文章");
        router.push("/login");
        return;
      }

      if (!articleData.title.trim() || !articleData.content.trim()) {
        alert("请填写标题和内容");
        return;
      }

      setIsSaving(true);
      try {
        const result = await articleApi.createArticle({
          title: articleData.title.trim(),
          slug: articleData.slug,
          content: articleData.content,
          description: articleData.description,
          imageUrl: articleData.imageUrl || undefined,
          tags: articleData.tags || [],
          status: "draft",
        });

        console.log("文章创建成功:", result);
        router.push("/manage/articles");
        router.refresh();
      } catch (err: any) {
        console.error("创建文章失败:", err);
        alert(err.message || "创建文章失败，请重试");
      } finally {
        setIsSaving(false);
      }
    },
    [user, router]
  );

  return (
    <ArticleEditor
      mode='create'
      onSave={handleSave}
      pageTitle='创建新文章'
      saveLabel='创建文章'
      isSaving={isSaving}
      initialData={{
        title: "",
        content: "",
        tags: [],
        imageUrl: "",
      }}
    />
  );
}
