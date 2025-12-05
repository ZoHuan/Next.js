import { notFound } from "next/navigation";
import { Article, Comment } from "@/types";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleContent from "@/components/blog/ArticleContent";
import CommentSection from "@/components/blog/CommentSection";

// 模拟文章数据
const articles: Article[] = [
  {
    id: "1",
    slug: "react-typescript-modern-web-app",
    title: "使用React和TypeScript构建现代化Web应用",
    content: `
      <h1 class="text-2xl font-bold mt-6 mb-4">使用React和TypeScript构建现代化Web应用</h1>
      <p>在当今的前端开发领域，React和TypeScript已经成为构建现代化Web应用的主流技术栈。本文将深入探讨如何利用这两种技术构建高性能、可维护的Web应用。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">React的优势</h2>
      <p>React是一个用于构建用户界面的JavaScript库，它采用组件化开发模式，使得代码更加模块化和可复用。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">TypeScript的类型安全</h2>
      <p>TypeScript为JavaScript添加了静态类型检查，能够在编译时发现潜在的错误，提高代码质量。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">结合使用的最佳实践</h2>
      <p>将React与TypeScript结合使用，可以获得更好的开发体验和更可靠的代码。</p>
    `,
    imageUrl:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=modern%20web%20development%20react%20typescript&sign=fe2e0a3297c5ac6c97c02223ddbaf9c8",
    tags: ["React", "TypeScript", "前端开发"],
    author: {
      name: "作者名称",
      avatar:
        "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=author%20avatar%20profile%20picture&sign=2bb72f7bbd14267b13784628f81d3283",
    },
    date: "2025年11月28日 18:30",
  },
  {
    id: "2",
    slug: "tailwind-css-future",
    title: "Tailwind CSS：原子化CSS的未来",
    content:
      "Tailwind CSS是一个功能类优先的CSS框架，它通过提供大量的实用类来帮助开发者快速构建用户界面。与传统的CSS框架不同，Tailwind CSS不提供预定义的组件，而是提供低级别的实用类，让开发者可以自由组合和定制样式。",
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
  {
    id: "3",
    slug: "nextjs-14-features",
    title: "Next.js 14新特性深度解析",
    content: `
      <h1 class="text-2xl font-bold mt-6 mb-4">Next.js 14新特性深度解析</h1>
      <p>Next.js 14带来了许多令人兴奋的新特性，包括App Router的稳定、Server Actions的改进等。本文将对这些新特性进行详细解析。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">App Router的稳定版</h2>
      <p>App Router在Next.js 14中正式稳定，提供了更好的性能和开发体验。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">Server Actions的改进</h2>
      <p>Server Actions现在更加稳定和强大，支持更多的使用场景。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">性能优化</h2>
      <p>Next.js 14在性能方面进行了大量优化，包括更快的构建速度和更好的运行时性能。</p>
    `,
    imageUrl:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=nextjs%20framework%20web%20development&sign=abc123def456",
    tags: ["Next.js", "JavaScript"],
    author: {
      name: "技术博主",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=developer%20avatar&sign=xyz789",
    },
    date: "2025年11月27日",
  },
  {
    id: "4",
    slug: "tailwind-css-best-practices",
    title: "Tailwind CSS最佳实践指南",
    content: `
      <h1 class="text-2xl font-bold mt-6 mb-4">Tailwind CSS最佳实践指南</h1>
      <p>Tailwind CSS作为一款实用的CSS框架，在开发效率方面有着显著优势。本文分享一些Tailwind CSS的最佳实践和技巧。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">实用类命名规范</h2>
      <p>遵循一致的命名规范，使代码更易读和维护。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">响应式设计</h2>
      <p>利用Tailwind的响应式前缀，轻松实现移动端优先的设计。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">自定义配置</h2>
      <p>通过配置文件定制化设计系统，满足项目特定需求。</p>
    `,
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=tailwind%20css%20design%20system&sign=def456ghi789",
    tags: ["Tailwind CSS", "CSS"],
    author: {
      name: "UI设计师",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=designer%20avatar&sign=jkl012",
    },
    date: "2025年11月26日",
  },
  {
    id: "5",
    slug: "typescript-advanced-types",
    title: "TypeScript高级类型技巧",
    content: `
      <h1 class="text-2xl font-bold mt-6 mb-4">TypeScript高级类型技巧</h1>
      <p>TypeScript的类型系统非常强大，本文将介绍一些高级类型技巧，帮助你编写更安全、更易维护的代码。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">条件类型</h2>
      <p>利用条件类型实现更灵活的类型推断。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">映射类型</h2>
      <p>使用映射类型批量转换对象类型。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">模板字面量类型</h2>
      <p>通过模板字面量类型实现字符串字面量的组合和转换。</p>
    `,
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=typescript%20programming%20code&sign=ghi789jkl012",
    tags: ["TypeScript", "编程"],
    author: {
      name: "资深开发者",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=programmer%20avatar&sign=mno345",
    },
    date: "2025年11月24日",
  },
  {
    id: "6",
    slug: "react-performance-optimization",
    title: "React性能优化指南",
    content: `
      <h1 class="text-2xl font-bold mt-6 mb-4">React性能优化指南</h1>
      <p>React应用的性能优化是每个开发者都需要掌握的技能。本文分享一些实用的React性能优化技巧和最佳实践。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">组件优化</h2>
      <p>使用React.memo、useMemo和useCallback优化组件渲染性能。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">代码分割</h2>
      <p>通过代码分割减少初始包大小，提高加载速度。</p>
      
      <h2 class="text-xl font-bold mt-8 mb-4">虚拟化长列表</h2>
      <p>使用虚拟化技术优化长列表的渲染性能。</p>
    `,
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=react%20performance%20optimization&sign=pqr678stu901",
    tags: ["React", "性能优化"],
    author: {
      name: "前端工程师",
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=engineer%20avatar&sign=vwx234",
    },
    date: "2025年11月23日",
  },
];

// 模拟评论数据
const comments: Comment[] = [
  {
    id: "1",
    author: {
      name: "张开发",
      avatar:
        "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=male%20developer%20avatar&sign=9dd9501a2da0fd99670c8487d14b8bf0",
    },
    content: "非常棒的文章！我一直在寻找关于React和TypeScript结合使用的最佳实践，这篇文章提供了很多有价值的见解。",
    date: "2025年11月28日 22:20",
    replies: [
      {
        id: "1-1",
        author: {
          name: "作者名称",
          avatar:
            "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=author%20avatar%20profile%20picture&sign=2bb72f7bbd14267b13784628f81d3283",
        },
        content: "谢谢！我很高兴这篇文章对您有所帮助。如果您有任何问题，欢迎随时提问。",
        date: "2025年11月28日 23:30",
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "李学习",
      avatar:
        "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=female%20student%20avatar&sign=ab51d1021507c62b74bc1c8cf65036e7",
    },
    content: "我是React的初学者，这篇文章对于我理解组件化思想非常有帮助。请问您能推荐一些适合初学者的学习资源吗？",
    date: "2025年11月29日 17:15",
  },
];

interface ArticlePageProps {
  params: Promise<{
    id: string; // 改为id参数
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // 使用await获取params
  const { id } = await params;

  // 使用id来查找文章
  const article = articles.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  return (
    <main className='flex-1 container mx-auto px-4 py-8'>
      <div className='max-w-3xl mx-auto'>
        <ArticleHeader article={article} />
        <ArticleContent article={article} />
        <CommentSection comments={comments} commentCount={comments.length} />
      </div>
    </main>
  );
}

// 生成静态参数 - 使用id
export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id, // 改为id参数
  }));
}

// 生成元数据 - 也需要使用await
export async function generateMetadata({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: `${article.title} - 博客`,
    description: article.content.replace(/<[^>]*>/g, "").substring(0, 160),
  };
}
