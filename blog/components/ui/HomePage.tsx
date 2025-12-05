import HeroSection from "@/components/ui/HeroSection";
import ArticleBase from "@/components/blog/ArticleBase";
import Sidebar from "@/components/layout/Sidebar";

// 示例文章数据（可以从外部传入或使用默认数据）
const defaultArticles = [
  {
    id: "1",
    title: "使用React和TypeScript构建现代化Web应用",
    description: "在当今的前端开发领域，React和TypeScript已经成为构建现代化Web应用的主流技术栈。",
    imageUrl:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=modern%20web%20development%20react%20typescript&sign=fe2e0a3297c5ac6c97c02223ddbaf9c8",
    tags: ["React", "TypeScript"],
    author: {
      name: "作者名称",
      avatar:
        "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=author%20avatar%20profile%20picture&sign=2bb72f7bbd14267b13784628f81d3283",
    },
    date: "2025年11月28日",
  },
  {
    id: "2",
    title: "Tailwind CSS：原子化CSS的未来",
    description: "Tailwind CSS是一个功能类优先的CSS框架，它提供了一套完整的构建块，使你能够在不离开HTML的情况下快速构建现代网站。",
    imageUrl:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=tailwind%20css%20modern%20web%20design&sign=4cbf2dfe7768b00f573b664ead6fed12",
    tags: ["CSS", "Tailwind"],
    author: {
      name: "作者名称",
      avatar:
        "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=author%20avatar%20profile%20picture&sign=2bb72f7bbd14267b13784628f81d3283",
    },
    date: "2025年11月25日",
  },
];

export default function HomePage() {
  return (
    <main className='flex-1 container mx-auto px-4 py-8'>
      <HeroSection />
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {/* 直接使用ArticleBase组件，配置2列布局和大标题 */}
        <div className='lg:col-span-3'>
          <ArticleBase
            articles={defaultArticles}
            title='最新文章'
            gridCols='grid-cols-1 md:grid-cols-2'
            titleClassName='text-2xl font-bold' // ArticleList的大标题样式
          />
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
