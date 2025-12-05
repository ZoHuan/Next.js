"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EditPageHeader from "@/components/manage/EditPageHeader";
import ArticleEditor from "@/components/manage/ArticleEditor";
import LoadingState from "@/components/ui/LoadingState";

interface PostData {
  id: string;
  title: string;
  content: string;
  tags: string[];
  coverImage?: string;
}

export default function EditPostPage() {
  const params = useParams();
  const postId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState({
    title: "使用React和TypeScript构建现代化Web应用",
    content: `# 使用React和TypeScript构建现代化Web应用 
 
在当今的前端开发领域，React和TypeScript已经成为构建现代化Web应用的主流技术栈。本文将深入探讨如何利用这两种技术构建高性能、可维护的Web应用。 
 
## React的核心概念 
 
React是一个用于构建用户界面的JavaScript库，它采用组件化的思想，使开发者能够构建可复用的UI组件。 
 
### 组件化思想`,
    tags: ["React", "TypeScript", "前端开发"],
    coverImage:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=modern%20web%20development%20react%20typescript&sign=fe2e0a3297c5ac6c97c02223ddbaf9c8",
  });

  // 模拟从API获取文章数据
  useEffect(() => {
    const fetchPostData = async () => {
      setIsLoading(true);
      try {
        // 这里可以替换为实际的API调用
        // const response = await fetch(`/api/posts/${postId}`);
        // const postData = await response.json();

        // 模拟API响应延迟
        await new Promise((resolve) => setTimeout(resolve, 500));

        // 设置从API获取的数据
        // setInitialData({
        //   title: postData.title,
        //   content: postData.content,
        //   tags: postData.tags,
        //   coverImage: postData.coverImage
        // });
      } catch (error) {
        console.error("获取文章数据失败:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  const handleSave = (articleData: { title: string; content: string; tags: string[]; coverImage?: string }) => {
    // 这里可以添加更新文章的逻辑
    const updatedPost = {
      id: postId,
      ...articleData,
    };
    console.log("更新文章:", updatedPost);

    // 模拟保存成功
    alert("文章已成功更新！");
  };

  return (
    <main className='flex-1 container mx-auto px-4 py-8'>
      <div className='max-w-3xl mx-auto'>
        <EditPageHeader title='编辑文章' />

        {isLoading ? (
          <LoadingState title='加载文章数据' message='正在获取文章内容...' />
        ) : (
          <ArticleEditor
            initialTitle={initialData.title}
            initialContent={initialData.content}
            initialTags={initialData.tags}
            initialCoverImage={initialData.coverImage}
            onSave={handleSave}
            saveLabel='保存文章'
          />
        )}
      </div>
    </main>
  );
}
