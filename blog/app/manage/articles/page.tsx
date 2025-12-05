"use client";

import { useState, useMemo } from "react";
import { Post, PostFilters } from "@/types/manage.types";
import PageHeader from "@/components/manage/PageHeader";
import Filters from "@/components/manage/Filters";
import List from "@/components/manage/List";
import Pagination from "@/components/ui/Pagination";

// 模拟文章数据
const mockPosts: Post[] = [
  {
    id: "1",
    title: "使用React和TypeScript构建现代化Web应用",
    slug: "react-typescript-modern-web-app",
    status: "published",
    createdAt: "2025年11月28日",
    views: 1243,
    image:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=modern%20web%20development%20react%20typescript&sign=fe2e0a3297c5ac6c97c02223ddbaf9c8",
    tags: ["React", "TypeScript", "前端开发"],
  },
  {
    id: "2",
    title: "React Hooks 最佳实践",
    slug: "react-hooks-best-practices",
    status: "published",
    createdAt: "2024年1月15日",
    views: 1234,
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=react%20hooks%20best%20practices&sign=random123",
    tags: ["React", "Hooks", "最佳实践"],
  },
  {
    id: "3",
    title: "TypeScript 进阶技巧",
    slug: "typescript-advanced-tips",
    status: "published",
    createdAt: "2024年1月10日",
    views: 856,
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=typescript%20advanced%20tips&sign=random456",
    tags: ["TypeScript", "技巧", "进阶"],
  },
  {
    id: "4",
    title: "Next.js 13 新特性",
    slug: "nextjs-13-features",
    status: "draft",
    createdAt: "2024年1月5日",
    views: 0,
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=nextjs%2013%20features&sign=random789",
    tags: ["Next.js", "新特性", "React"],
  },
  {
    id: "5",
    title: "Tailwind CSS 实用指南",
    slug: "tailwind-css-guide",
    status: "published",
    createdAt: "2024年1月1日",
    views: 2100,
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=tailwind%20css%20guide&sign=random012",
    tags: ["Tailwind", "CSS", "样式"],
  },
];

export default function ManagePage() {
  const [filters, setFilters] = useState<PostFilters>({
    searchTerm: "",
    statusFilter: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 过滤文章
  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(filters.searchTerm.toLowerCase()));
      const matchesStatus = filters.statusFilter === "all" || post.status === filters.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [filters]);

  // 分页逻辑
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className='flex-1 container mx-auto px-4 py-8'>
      <div className='max-w-5xl mx-auto'>
        <PageHeader />

        <Filters filters={filters} onFiltersChange={setFilters} />

        <List posts={currentPosts} />

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </main>
  );
}
