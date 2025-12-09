"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ManageLayoutProps {
  children: React.ReactNode;
}

export default function ManageLayout({ children }: ManageLayoutProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 等待认证状态加载完成
    if (!isLoading) {
      // 如果用户未登录，重定向到登录页面
      if (!user) {
        console.log("用户未登录，重定向到登录页面");
        router.push("/login");
      }
    }
  }, [user, isLoading, router]);

  // 显示加载状态
  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600 dark:text-gray-400'>正在检查登录状态...</p>
        </div>
      </div>
    );
  }

  // 如果认证检查完成但用户未登录，不渲染任何内容（已重定向）
  if (!user) {
    return null;
  }

  // 如果用户已登录，渲染子页面
  return children;
}
