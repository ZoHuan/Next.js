export default function CommentForm() {
  return (
    <div className='mb-8'>
      <form className='flex flex-col'>
        <textarea
          placeholder='写下你的评论...'
          className='px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
          required
        />
        <div className='mt-3 flex justify-end'>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors flex items-center'
          >
            <i className='fa-solid fa-paper-plane mr-2'></i> 发表评论
          </button>
        </div>
      </form>
    </div>
  );
}
