"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ManagePage() {
  const router = useRouter();

  useEffect(() => {
    // 直接重定向到文章管理页面
    router.push("/manage/articles");
  }, [router]);

  // 显示简单的加载状态
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
        <p className='text-gray-600'>正在跳转到文章管理...</p>
      </div>
    </div>
  );
}
