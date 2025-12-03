import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-white border-t border-gray-200 py-8 mt-12'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <div className='flex items-center space-x-2 mb-4'>
              <i className='fa-solid fa-feather-alt text-blue-600 text-xl'></i>
              <h2 className='text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600'>博客</h2>
            </div>
            <p className='text-gray-600 text-sm'>一个简洁现代的个人博客系统，分享技术文章和个人思考。</p>
          </div>
          <div>
            <h3 className='text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4'>快速链接</h3>
            <ul className='space-y-2'>
              <li>
                <Link className='text-gray-600 hover:text-blue-600 text-sm transition-colors' href='/'>
                  首页
                </Link>
              </li>
              <li>
                <Link className='text-gray-600 hover:text-blue-600 text-sm transition-colors' href='/tags'>
                  分类
                </Link>
              </li>
              <li>
                <Link className='text-gray-600 hover:text-blue-600 text-sm transition-colors' href='/contact'>
                  联系我
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4'>关注我</h3>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all'
                aria-label='twitter'
              >
                <i className='fa-brands fa-twitter'></i>
              </a>
              <a
                href='#'
                className='w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all'
                aria-label='github'
              >
                <i className='fa-brands fa-github'></i>
              </a>
              <a
                href='#'
                className='w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all'
                aria-label='instagram'
              >
                <i className='fa-brands fa-instagram'></i>
              </a>
              <a
                href='#'
                className='w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all'
                aria-label='linkedin'
              >
                <i className='fa-brands fa-linkedin'></i>
              </a>
            </div>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t border-gray-200 text-center'>
          <p className='text-gray-600 text-sm'>© 2025 博客 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
}
