"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import ArticleEditor from "@/components/manage/ArticleEditor";
import { useAuth } from "@/contexts/AuthContext";
import { articleApi } from "@/lib/db";

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState({
    title: "",
    content: "",
    tags: [] as string[],
    imageUrl: "",
  });
  const { user } = useAuth();

  // 从API获取文章数据
  useEffect(() => {
    if (!postId) {
      setIsLoading(false);
      return;
    }

    const fetchPostData = async () => {
      setIsLoading(true);
      try {
        const article = await articleApi.getArticleById(postId);

        if (article) {
          setInitialData({
            title: article.title,
            content: article.content,
            tags: article.tags || [],
            imageUrl: article.imageUrl || "",
          });
        } else {
          alert("文章不存在");
          router.push("/manage/articles");
        }
      } catch (error) {
        console.error("获取文章数据失败:", error);
        alert("获取文章数据失败，请重试");
        router.push("/manage/articles");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [postId, router]);

  // 使用useCallback包装handleSave函数，避免无限循环
  const handleSave = useCallback(
    async (articleData: { title: string; content: string; tags: string[]; imageUrl: string; slug: string; description: string }) => {
      if (!user) {
        alert("请先登录后再进行操作");
        router.push("/login");
        return;
      }

      if (!articleData.title.trim() || !articleData.content.trim()) {
        alert("请填写标题和内容");
        return;
      }

      try {
        await articleApi.updateArticle(postId, {
          title: articleData.title.trim(),
          content: articleData.content,
          description: articleData.description,
          imageUrl: articleData.imageUrl || undefined,
          tags: articleData.tags || [],
          slug: articleData.slug || "",
        });

        alert("文章已成功更新！");
        router.push("/manage/articles");
        router.refresh();
      } catch (err: any) {
        console.error("更新文章失败:", err);
        alert(err.message || "更新文章失败，请重试");
      }
    },
    [postId, user, router]
  ); // 依赖项：postId, user, router

  if (isLoading) {
    return (
      <div className='flex-1 container mx-auto px-4 py-8'>
        <div className='max-w-3xl mx-auto'>
          <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center'>
            <div className='animate-pulse'>
              <div className='h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4'></div>
              <div className='h-4 bg-gray-300 rounded w-1/2 mx-auto'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 如果数据无效，重定向到文章列表
  const hasValidData = initialData.title || initialData.content || initialData.tags.length > 0 || initialData.imageUrl;
  if (!hasValidData) {
    router.push("/manage/articles");
    return null;
  }

  return <ArticleEditor mode='edit' initialData={initialData} onSave={handleSave} saveLabel='更新文章' pageTitle='编辑文章' />;
}
