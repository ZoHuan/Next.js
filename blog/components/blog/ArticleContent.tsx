import { Article } from "@/types/blog.types";

interface ContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ContentProps) {
  return (
    <div
      className='prose dark:prose-invert max-w-none mb-10 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-md'
      style={{ opacity: 1 }}
      dangerouslySetInnerHTML={{ __html: article.content }}
    />
  );
}
