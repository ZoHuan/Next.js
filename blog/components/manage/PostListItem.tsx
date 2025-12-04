import Link from "next/link";
import { Post } from "@/types/post";

interface PostListItemProps {
  post: Post;
}

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <tr>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='shrink-0 h-10 w-10'>
            <img className='h-10 w-10 rounded-md object-cover' src={post.image} alt={post.title} />
          </div>
          <div className='ml-4'>
            <div className='text-sm font-medium text-gray-900 dark:text-white'>{post.title}</div>
            <div className='flex flex-wrap gap-1 mt-1'>
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className='inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            post.status === "published"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
          }`}
        >
          {post.status === "published" ? "已发布" : "草稿"}
        </span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>{post.createdAt}</td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>{post.views}</td>
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
        <div className='flex space-x-2'>
          <Link
            href={`/manage/posts/${post.slug}/edit`}
            className='text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-200'
          >
            编辑
          </Link>
          {post.status === "published" ? (
            <button className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-200'>
              取消发布
            </button>
          ) : (
            <button className='text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 transition-colors duration-200'>
              发布
            </button>
          )}
          <button className='text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors duration-200'>删除</button>
        </div>
      </td>
    </tr>
  );
}
