"use client";

import { useState, useEffect, useCallback } from "react";
import { Post, PostFilters } from "@/types/manage.types";
import { articleApi } from "@/lib/db";
import ManagePageHeader from "@/components/manage/ManagePageHeader";
import ArticleFilters from "@/components/manage/ArticleFilters";
import ArticleManageList from "@/components/manage/ArticleManageList";
import Pagination from "@/components/ui/Pagination";

export default function ArticlePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filters, setFilters] = useState<PostFilters>({
    searchTerm: "",
    statusFilter: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  // 获取文章数据
  const fetchArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await articleApi.getArticles({
        page: currentPage,
        pageSize: itemsPerPage,
        status: filters.statusFilter === "all" ? "all" : filters.statusFilter,
        searchTerm: filters.searchTerm || "",
      });

      // 转换API数据为Post类型
      const transformedPosts: Post[] = result.articles.map((article) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        status: article.status as "published" | "draft",
        createdAt: new Date(article.createdAt).toLocaleDateString("zh-CN"),
        imageUrl: article.imageUrl,
        tags: article.tags || [],
      }));

      setPosts(transformedPosts);
      setTotalCount(result.totalCount);
    } catch (err) {
      console.error("获取文章列表失败:", err);
      setPosts([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [filters, currentPage, itemsPerPage]);

  // 监听过滤条件和分页变化
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles, filters, currentPage]);

  // 处理过滤条件变化
  const handleFiltersChange = useCallback((newFilters: PostFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  // 处理文章状态切换
  const handleStatusToggle = useCallback(async (postId: string, currentStatus: "published" | "draft") => {
    try {
      const newStatus = currentStatus === "published" ? "draft" : "published";

      // 调用API更新文章状态
      await articleApi.updateArticle(postId, { status: newStatus });

      // 更新本地状态
      setPosts((prevPosts) => prevPosts.map((post) => (post.id === postId ? { ...post, status: newStatus } : post)));
    } catch (err) {
      console.error("更新文章状态失败:", err);
    }
  }, []);

  // 处理文章删除
  const handleDelete = useCallback(
    async (postId: string) => {
      if (!confirm("确定要删除这篇文章吗？此操作不可恢复。")) {
        return;
      }

      try {
        // 调用API删除文章
        await articleApi.deleteArticle(postId);

        // 更新本地状态
        setPosts((prevPosts) => {
          const updatedPosts = prevPosts.filter((post) => post.id !== postId);

          // 如果当前页没有数据了，回到上一页
          if (updatedPosts.length === 0 && currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
          }

          return updatedPosts;
        });

        setTotalCount((prevCount) => prevCount - 1);
      } catch (err) {
        console.error("删除文章失败:", err);
      }
    },
    [currentPage]
  );

  // 计算总页数
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // 添加页面加载时的初始数据获取
  useEffect(() => {
    // 只在组件挂载时执行一次，确保页面刷新时一定会请求数据
    if (posts.length === 0 && !isLoading) {
      fetchArticles();
    }
  }, []); // 空依赖数组，只在组件挂载时执行

  return (
    <main className='flex-1 container mx-auto px-4 py-8'>
      <div className='max-w-5xl mx-auto'>
        <ManagePageHeader />

        <ArticleFilters filters={filters} onFiltersChange={handleFiltersChange} />

        <ArticleManageList posts={posts} onStatusToggle={handleStatusToggle} onDelete={handleDelete} />

        {totalPages > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
      </div>
    </main>
  );
}
