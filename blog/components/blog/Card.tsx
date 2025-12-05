import Link from "next/link";
import Image from "next/image";

interface CardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  views: number;
  likes: number;
}

export default function Card({ id, title, description, imageUrl, tags, author, date, views, likes }: CardProps) {
  return (
    <div className='group overflow-hidden rounded-xl shadow-md hover:shadow-lg bg-white dark:bg-gray-800 transition-shadow duration-300'>
      <Link className='block' href={`/blog/${id}`}>
        <div className='relative overflow-hidden h-48'>
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={192}
            className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500'
          />
          <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-80'></div>
          <div className='absolute bottom-0 left-0 p-4 md:p-6 w-full'>
            <div className='flex flex-wrap gap-2 mb-2'>
              {tags.map((tag, index) => (
                <span key={index} className='inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-500/80 text-white'>
                  {tag}
                </span>
              ))}
            </div>
            <h3 className='text-white font-bold line-clamp-2 group-hover:text-blue-300 transition-colors text-lg'>{title}</h3>
          </div>
        </div>
      </Link>
      <div className='p-4 md:p-6'>
        <p className='text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-2 mb-4'>{description}</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            {/* 使用Font Awesome图标替代作者头像图片 */}
            <div className='w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center'>
              <i className='fa-regular fa-user text-gray-600 dark:text-gray-300'></i>
            </div>
            <span className='text-gray-700 dark:text-gray-200 text-sm'>{author.name}</span>
          </div>
          <div className='flex items-center space-x-4 text-sm'>
            <span className='text-gray-500 dark:text-gray-400'>{date}</span>
            <span className='flex items-center text-gray-500 dark:text-gray-400'>
              <i className='fa-regular fa-eye mr-1'></i> {views}
            </span>
            <span className='flex items-center text-gray-500 dark:text-gray-400'>
              <i className='fa-regular fa-heart mr-1'></i> {likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
