import { Article } from "@/types/article";

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div
      className='prose dark:prose-invert max-w-none mb-10 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-md'
      style={{ opacity: 1 }}
      dangerouslySetInnerHTML={{ __html: article.content }}
    />
  );
}
