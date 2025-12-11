import { notFound } from "next/navigation";
import { Comment } from "@/types";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleContent from "@/components/blog/ArticleContent";
import CommentSection from "@/components/blog/CommentSection";
import { articleApi, commentApi } from "@/lib/db";

export const revalidate = 60; // 每60秒重新验证
export const dynamicParams = true; // 允许动态参数（未预生成的页面）

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getArticleData(id: string) {
  try {
    const article = await articleApi.getArticleById(id);

    if (!article || article.status !== "published") {
      return null;
    }

    let comments: Comment[] = [];
    try {
      comments = await commentApi.getComments(id);
    } catch (commentError) {
      console.error("获取评论失败:", commentError);
    }

    return { article, comments };
  } catch (error) {
    console.error("获取文章详情失败:", error);
    return null;
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const data = await getArticleData(id);

  if (!data) {
    notFound();
  }

  const { article, comments } = data;

  return (
    <main className='flex-1 container mx-auto px-4 py-8'>
      <div className='max-w-3xl mx-auto'>
        <ArticleHeader article={article} />
        <ArticleContent article={article} />
        <CommentSection comments={comments} articleId={id} />
      </div>
    </main>
  );
}

// 生成静态参数 - 使用id
export async function generateStaticParams() {
  try {
    const response = await articleApi.getArticles({
      page: 1,
      pageSize: 20,
      status: "published",
    });

    return response.articles.map((article) => ({
      id: article.id,
    }));
  } catch (error) {
    console.error("生成静态参数失败:", error);
    return [];
  }
}

// 生成元数据
export async function generateMetadata({ params }: ArticlePageProps) {
  const { id } = await params;

  try {
    const article = await articleApi.getArticleById(id);

    if (!article || article.status !== "published") {
      return {
        title: "文章未找到",
      };
    }

    const cleanContent = article.content.replace(/<[^>]*>/g, "");
    const description = cleanContent.length > 160 ? cleanContent.substring(0, 160) + "..." : cleanContent;

    return {
      title: `${article.title} - 博客`,
      description: description,
      openGraph: {
        title: article.title,
        description: article.description || description,
        images: [article.imageUrl],
        type: "article",
        publishedTime: article.createdAt,
      },
    };
  } catch (error) {
    console.error("生成元数据失败:", error);
    return {
      title: "文章详情",
    };
  }
}
