import Card from "@/components/blog/Card";

// 示例文章数据
const articles = [
  {
    id: "1",
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
];

export default function List() {
  return (
    <div className='lg:col-span-3'>
      <section>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold'>最新文章</h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {articles.map((article) => (
            <div key={article.id}>
              <Card {...article} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
