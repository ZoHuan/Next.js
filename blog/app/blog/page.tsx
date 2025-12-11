"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BlogPageHeader from "@/components/blog/BlogPageHeader";
import ArticleBase from "@/components/blog/ArticleBase";
import Pagination from "@/components/ui/Pagination";
import { Article } from "@/types/blog.types";
import { articleApi } from "@/lib/db";
import LoadingState from "@/components/ui/LoadingState";

// 分页配置
const ITEMS_PER_PAGE = 9;

// 将主要逻辑提取到内部组件
function BlogContent() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const tag = searchParams.get("tag") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  // 获取文章数据
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = await articleApi.getArticles({
          page: currentPage,
          pageSize: ITEMS_PER_PAGE,
          status: "published",
          searchTerm: searchTerm || undefined,
          tag: tag || undefined,
        });
        setArticles(result.articles);
        setTotalCount(result.totalCount);
      } catch (error) {
        console.error("获取文章列表失败:", error);
        setArticles([]);
        setTotalCount(0);
      }
    };

    fetchArticles();
  }, [currentPage, searchTerm, tag]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 根据是否有搜索词或标签生成标题
  const getPageTitle = () => {
    if (searchTerm) {
      return `搜索：${searchTerm}的文章`;
    }
    if (tag) {
      return `标签：${tag}的文章`;
    }
    return "所有文章";
  };

  return (
    <main className='flex-1 container mx-auto px-4 py-8'>
      <BlogPageHeader title='博客文章' subtitle='分享技术与思考，记录学习与成长' />

      {/* 直接使用ArticleBase组件，配置3列布局和小标题 */}
      <ArticleBase articles={articles} title={getPageTitle()} gridCols='grid-cols-1 md:grid-cols-3' titleClassName='text-xl font-bold' />

      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
    </main>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <BlogContent />
    </Suspense>
  );
}
