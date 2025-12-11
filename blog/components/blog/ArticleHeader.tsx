import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/blog.types";
import { formatDate } from "@/lib/date-utils";

interface HeaderProps {
  article: Article;
}

export default function ArticleHeader({ article }: HeaderProps) {
  return (
    <>
      {/* 返回按钮 */}
      <Link
        href='/blog'
        className='flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6'
      >
        <i className='fa-solid fa-arrow-left mr-2'></i> 返回
      </Link>

      {/* 文章头部信息 */}
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-bold mb-4'>{article.title}</h1>

        {/* 标签 */}
        {article.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 mb-6'>
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className='inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-colors'
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* 作者信息和统计 */}
        <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-400'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <Image src={article.author.avatar} alt={article.author.name} width={32} height={32} className='w-8 h-8 rounded-full object-cover' />
              <span>{article.author.name}</span>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <span>{formatDate(article.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* 文章封面图片 */}
      {article.imageUrl && (
        <div className='mb-8 rounded-xl overflow-hidden shadow-lg' style={{ opacity: 1, transform: "none" }}>
          <Image src={article.imageUrl} alt={article.title} width={800} height={400} className='w-full h-auto object-cover' priority />
        </div>
      )}
    </>
  );
}
