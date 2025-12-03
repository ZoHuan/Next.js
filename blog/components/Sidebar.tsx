export default function Sidebar() {
  return (
    <div className='lg:col-span-1'>
      <div className='sticky top-24 space-y-8'>
        <section className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md'>
          <h2 className='text-xl font-bold mb-4'>热门标签</h2>
          <div className='space-y-2'>
            <button className='w-full text-left px-4 py-2.5 rounded-md font-medium transition-colors bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400'>
              <div className='flex items-center justify-between'>
                <span>React</span>
                <span className='bg-white/20 dark:bg-gray-800/50 px-2 py-0.5 rounded text-xs'>12</span>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
