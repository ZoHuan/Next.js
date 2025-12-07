import Card from "@/components/blog/Card";
import { Article } from "@/types/blog.types";
import Image from "next/image";

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
  titleClassName = "text-xl font-bold",
}: ArticleBaseProps) {
  return (
    <section className={className}>
      {showHeader && (
        <div className='flex items-center justify-between mb-6'>
          <h2 className={titleClassName}>{title}</h2>
        </div>
      )}
      <div className={`grid ${gridCols} gap-6`}>
        {articles.length === 0 ? (
          <div className='flex flex-col justify-center items-center py-12 col-span-full opacity-60 space-y-4'>
            <Image src='/images/empty-data.svg' alt='暂无数据' width={200} height={200} priority={false} />
            <p className='text-gray-500  text-lg font-normal'>暂无文章数据</p>
          </div>
        ) : (
          articles.map((article) => (
            <div key={article.id}>
              <Card {...article} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
