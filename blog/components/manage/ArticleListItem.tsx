import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";

interface ListItemProps {
  post: Post;
  onStatusToggle?: (postId: string, newStatus: "published" | "draft") => void;
  onDelete?: (postId: string) => void;
}

export default function ArticleListItem({ post, onStatusToggle, onDelete }: ListItemProps) {
  const handleStatusToggle = () => {
    if (onStatusToggle) {
      onStatusToggle(post.id, post.status);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(post.id);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <tr className='hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200'>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='shrink-0 h-10 w-10 relative'>
            <Image className='rounded-md object-cover' src={post.imageUrl || "/images/default-article.jpg"} alt={post.title} width={40} height={40} />
          </div>
          <div className='ml-4 min-w-0'>
            <div className='text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs' title={post.title}>
              {post.title}
            </div>
            <div className='flex flex-wrap gap-1 mt-1'>
              {post.tags?.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className='inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                >
                  {tag}
                </span>
              ))}
              {post.tags && post.tags.length > 3 && (
                <span className='inline-block px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400'>+{post.tags.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border transition-colors duration-200 ${
            post.status === "published"
              ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800"
              : "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-800"
          }`}
        >
          {post.status === "published" ? "已发布" : "草稿"}
        </span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>{formatDate(post.createdAt)}</td>
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
        <div className='flex space-x-3'>
          <Link
            href={`/manage/articles/edit/${post.id}`}
            className='text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-200 px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer'
          >
            编辑
          </Link>
          <button
            onClick={handleStatusToggle}
            className={`transition-colors duration-200 px-2 py-1 rounded hover:bg-opacity-20 cursor-pointer ${
              post.status === "published"
                ? "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                : "text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/20"
            }`}
          >
            {post.status === "published" ? "取消发布" : "发布"}
          </button>
          <button
            onClick={handleDelete}
            className='text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors duration-200 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer'
          >
            删除
          </button>
        </div>
      </td>
    </tr>
  );
}
