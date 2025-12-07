"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/ui/HeroSection";
import ArticleBase from "@/components/blog/ArticleBase";
import Sidebar from "@/components/layout/Sidebar";
import { Article } from "@/types/blog.types";
import { articleApi } from "@/lib/db";

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  // 统一处理搜索功能
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // 统一处理标签点击功能
  const handleTagClick = (tagName: string) => {
    router.push(`/blog?tag=${encodeURIComponent(tagName)}`);
  };

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await articleApi.getArticles({
          page: 1,
          pageSize: 4,
          status: "published",
        });
        setArticles(response.articles);
      } catch (err) {
        console.error("获取最新文章失败:", err);
        // 静默失败，保持空数组状态
      }
    };

    fetchLatestArticles();
  }, []);

  return (
    <main className='flex-1 container mx-auto px-4 py-8'>
      <HeroSection onSearch={handleSearch} />
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
        <div className='lg:col-span-3'>
          <ArticleBase articles={articles} title='最新文章' gridCols='grid-cols-1 md:grid-cols-2' titleClassName='text-2xl font-bold' />
        </div>
        <Sidebar onTagClick={handleTagClick} />
      </div>
    </main>
  );
}
