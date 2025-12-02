import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='flex-1 container mx-auto px-4 py-8'>
      <section className='mb-12'>
        <div className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'>
          <div className='absolute inset-0 opacity-20'>
            <img
              src='https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=modern%20technology%20abstract%20background&sign=797d4f3d8314d088ac86386453f60a6e'
              alt='背景'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='relative z-10 p-8 md:p-12'>
            <h1 className='text-3xl md:text-4xl font-bold mb-4 tracking-tight'>发现技术之美</h1>
            <p className='text-lg md:text-xl mb-6 max-w-2xl opacity-90 leading-relaxed'>探索前端开发、UI设计和现代Web技术的无限可能</p>
            <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 max-w-xl mx-auto sm:mx-0'>
              <input
                type='text'
                placeholder='搜索文章...'
                className='px-4 py-2.5 rounded-md bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all'
              />
              <button className='px-4 py-2.5 bg-white text-blue-600 font-medium rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center shadow-md hover:shadow-lg'>
                <i className='fa-solid fa-search mr-2'></i> 搜索
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
        <div className='lg:col-span-3'>
          <section>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold'>最新文章</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <div className='group overflow-hidden rounded-xl shadow-md hover:shadow-lg bg-white dark:bg-gray-800 transition-shadow duration-300'>
                  <Link className='block' href='/article/1'>
                    <div className='relative overflow-hidden h-48'>
                      <img
                        src='https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=modern%20web%20development%20react%20typescript&sign=fe2e0a3297c5ac6c97c02223ddbaf9c8'
                        alt='使用React和TypeScript构建现代化Web应用'
                        className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80'></div>
                      <div className='absolute bottom-0 left-0 p-4 md:p-6 w-full'>
                        <div className='flex flex-wrap gap-2 mb-2'>
                          <span className='inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-500/80 text-white'>React</span>
                          <span className='inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-500/80 text-white'>TypeScript</span>
                        </div>
                        <h3 className='text-white font-bold line-clamp-2 group-hover:text-blue-300 transition-colors text-lg'>
                          使用React和TypeScript构建现代化Web应用
                        </h3>
                      </div>
                    </div>
                  </Link>
                  <div className='p-4 md:p-6'>
                    <p className='text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-2 mb-4'>
                      在当今的前端开发领域，React和TypeScript已经成为构建现代化Web应用的主流技术栈。本文将深入探讨如何利用这两种技术构建高性能、可维护的Web应用。
                    </p>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <img
                          src='https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=author%20avatar%20profile%20picture&sign=2bb72f7bbd14267b13784628f81d3283'
                          alt='作者头像'
                          className='w-8 h-8 rounded-full object-cover'
                        />
                        <span className='text-gray-700 dark:text-gray-200 text-sm'>作者名称</span>
                      </div>
                      <div className='flex items-center space-x-4 text-sm'>
                        <span className='text-gray-500 dark:text-gray-400'>2025年11月28日</span>
                        <span className='flex items-center text-gray-500 dark:text-gray-400'>
                          <i className='fa-regular fa-eye mr-1'></i> 1243
                        </span>
                        <span className='flex items-center text-gray-500 dark:text-gray-400'>
                          <i className='fa-regular fa-heart mr-1'></i> 89
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
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
      </div>
    </main>
  );
}
