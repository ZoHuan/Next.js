"use client";

import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  isLoggedIn?: boolean;
}

export default function Header({ isLoggedIn = false }: HeaderProps) {
  return (
    <header className='sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 transition-all duration-300 shadow-sm'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <i className='fa-solid fa-feather-alt text-blue-600 text-2xl'></i>
          <Link className='text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600' href='/'>
            博客
          </Link>
        </div>
        <nav className='hidden md:flex items-center space-x-8'>
          <Link className='text-sm font-medium transition-colors hover:text-blue-600 text-blue-600' href='/'>
            首页
          </Link>
          <Link className='text-sm font-medium transition-colors hover:text-blue-600 text-gray-700' href='/blog'>
            文章
          </Link>

          {/* 条件渲染登录/注册按钮或用户菜单 */}
          <div className='flex items-center space-x-4'>
            {isLoggedIn ? (
              // 登录后的用户菜单
              <>
                <div className='relative group'>
                  <button className='flex items-center space-x-2 focus:outline-none'>
                    <div className='w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-blue-600'>
                      <i className='fa-solid fa-user text-white text-sm'></i>
                    </div>
                    <span className='text-sm font-medium text-gray-700 hidden lg:inline'>用户</span>
                    <i className='fa-solid fa-chevron-down text-xs text-gray-700'></i>
                  </button>
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 origin-top-right'>
                    <Link href='/editor' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'>
                      写文章
                    </Link>
                    <Link href='/admin' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'>
                      管理
                    </Link>
                    <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'>
                      退出
                    </a>
                  </div>
                </div>
              </>
            ) : (
              // 未登录的登录/注册按钮
              <div className='flex space-x-2'>
                <Link
                  className='px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-medium transition-colors'
                  href='/login'
                >
                  登录
                </Link>
                <Link className='px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors' href='/signup'>
                  注册
                </Link>
              </div>
            )}
          </div>
        </nav>
        <button className='md:hidden p-2 rounded-md hover:bg-gray-200 transition-colors' aria-label='打开菜单'>
          <i className='fa-solid fa-bars text-gray-700'></i>
        </button>
      </div>
    </header>
  );
}
