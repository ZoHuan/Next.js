"use client";

import { useState } from "react";
import BlogHeader from "@/components/blog/BlogHeader";
import ArticleGrid from "@/components/blog/ArticleGrid";
import Pagination from "@/components/ui/Pagination";

// 示例文章数据
const articles = [
  {
    id: "1",
    slug: "react-typescript-modern-web-app",
    title: "使用React和TypeScript构建现代化Web应用",
    description:
      "在当今的前端开发领域，React和TypeScript已经成为构建现代化Web应用的主流技术栈。本文将深入探讨如何利用这两种技术构建高性能、可维护的Web应用。",
    imageUrl:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=modern%20web%20development%20react%20typescript&sign=fe2e0a3297c5ac6c97c02223ddbaf9c8",
    tags: ["React", "TypeScript"],
    author: {
      name: "作者名称",
      avatar:
        "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=author%20avatar%20profile%20picture&sign=2bb72f7bbd14267b13784628f81d3283",
    },
    date: "2025年11月28日",
    views: 1243,
    likes: 89,
  },
  {
    id: "2",
    slug: "tailwind-css-future",
    title: "Tailwind CSS：原子化CSS的未来",
    description:
      "Tailwind CSS是一个功能类优先的CSS框架，它提供了一套完整的构建块，使你能够在不离开HTML的情况下快速构建现代网站。本文将介绍原子化CSS的优势和最佳实践。",
    imageUrl:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=tailwind%20css%20modern%20web%20design&sign=4cbf2dfe7768b00f573b664ead6fed12",
    tags: ["CSS", "Tailwind"],
    author: {
      name: "作者名称",
      avatar:
        "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=author%20avatar%20profile%20picture&sign=2bb72f7bbd14267b13784628f81d3283",
    },
    date: "2025年11月25日",
    views: 892,
    likes: 76,
  },
  {
    id: "3",
    slug: "nextjs-14-features",
    title: "Next.js 14新特性深度解析",
    description: "Next.js 14带来了许多令人兴奋的新特性，包括App Router的稳定、Server Actions的改进等。本文将对主要新特性进行详细解析。",
    imageUrl:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=nextjs%20framework%20web%20development&sign=abc123def456",
    tags: ["Next.js", "JavaScript"],
    author: {
      name: "技术博主",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=developer%20avatar&sign=xyz789",
    },
    date: "2025年11月27日",
    views: 892,
    likes: 67,
  },
  {
    id: "4",
    slug: "tailwind-css-best-practices",
    title: "Tailwind CSS最佳实践指南",
    description: "Tailwind CSS作为一款实用的CSS框架，在开发效率方面有着显著优势。本文分享一些Tailwind CSS的最佳实践和技巧。",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=tailwind%20css%20design%20system&sign=def456ghi789",
    tags: ["Tailwind CSS", "CSS"],
    author: {
      name: "UI设计师",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=designer%20avatar&sign=jkl012",
    },
    date: "2025年11月26日",
    views: 756,
    likes: 45,
  },
  {
    id: "5",
    slug: "typescript-advanced-types",
    title: "TypeScript高级类型技巧",
    description: "TypeScript的类型系统非常强大，本文将介绍一些高级类型技巧，帮助你编写更安全、更易维护的代码。",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=typescript%20programming%20code&sign=ghi789jkl012",
    tags: ["TypeScript", "编程"],
    author: {
      name: "资深开发者",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=programmer%20avatar&sign=mno345",
    },
    date: "2025年11月24日",
    views: 634,
    likes: 38,
  },
  {
    id: "6",
    slug: "react-performance-optimization",
    title: "React性能优化指南",
    description: "React应用的性能优化是每个开发者都需要掌握的技能。本文分享一些实用的React性能优化技巧和最佳实践。",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=react%20performance%20optimization&sign=pqr678stu901",
    tags: ["React", "性能优化"],
    author: {
      name: "前端工程师",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=engineer%20avatar&sign=vwx234",
    },
    date: "2025年11月23日",
    views: 521,
    likes: 29,
  },
];

// 分页配置
const ITEMS_PER_PAGE = 6;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // 计算分页数据
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className='flex-1 container mx-auto px-4 py-8'>
      <BlogHeader title='博客文章' subtitle='分享技术与思考，记录学习与成长' />

      <ArticleGrid articles={currentArticles} />

      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
    </main>
  );
}
