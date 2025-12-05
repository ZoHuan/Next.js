import ArticleListItem from "./ArticleListItem";
import { Post } from "@/types";

interface ListProps {
  posts: Post[];
}

export default function ArticleManageList({ posts }: ListProps) {
  if (posts.length === 0) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center'>
        <p className='text-gray-500 dark:text-gray-400'>暂无文章数据</p>
      </div>
    );
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-50 dark:bg-gray-900'>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>标题</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>状态</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>发布日期</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>操作</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
            {posts.map((post) => (
              <ArticleListItem key={post.id} post={post} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
