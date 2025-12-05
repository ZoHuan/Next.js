import Link from "next/link";

export default function ManagePageHeader() {
  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8'>
      <div>
        <h1 className='text-2xl md:text-3xl font-bold mb-2'>博客管理</h1>
        <p className='text-gray-600 dark:text-gray-400'>管理你的所有文章和内容</p>
      </div>
      <Link
        href='/manage/articles/create'
        className='mt-4 sm:mt-0 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors flex items-center'
      >
        <i className='fa-solid fa-plus mr-2'></i> 新建文章
      </Link>
    </div>
  );
}
