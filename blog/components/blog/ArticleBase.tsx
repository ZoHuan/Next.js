import Card from "@/components/blog/Card";
import { Article } from "@/types/blog.types";

interface ArticleBaseProps {
  articles: Article[];
  title?: string;
  gridCols?: string;
  className?: string;
  showHeader?: boolean;
  titleClassName?: string;
}

export default function ArticleBase({
  articles,
  title = "文章列表",
  gridCols = "grid-cols-1 md:grid-cols-2",
  className = "",
  showHeader = true,
  titleClassName = "text-xl font-bold", // 默认样式
}: ArticleBaseProps) {
  return (
    <section className={className}>
      {showHeader && (
        <div className='flex items-center justify-between mb-6'>
          <h2 className={titleClassName}>{title}</h2>
        </div>
      )}
      <div className={`grid ${gridCols} gap-6`}>
        {articles.map((article) => (
          <div key={article.id}>
            <Card {...article} />
          </div>
        ))}
      </div>
    </section>
  );
}
