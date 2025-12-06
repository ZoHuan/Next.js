import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/db';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuthError = (err: any): string => {
    if (err.message?.includes('Invalid login credentials')) {
      return '邮箱或密码错误';
    } else if (err.message?.includes('Email not confirmed')) {
      return '请先验证您的邮箱';
    } else if (err.message?.includes('User already registered')) {
      return '该邮箱已被注册';
    } else if (err.message?.includes('Password should be at least')) {
      return '密码强度不足';
    }
    return '操作失败，请稍后重试';
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.signIn(email, password);
      router.push('/manage/articles');
    } catch (err: any) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authApi.signUp(email, password, username);
      return result;
    } catch (err: any) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 添加退出登录功能
  const signOut = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.signOut();
      // 退出后跳转到首页
      router.push('/');
      router.refresh(); // 刷新页面以清除缓存状态
    } catch (err: any) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    login,
    signup,
    signOut,
    clearError: () => setError(null),
  };
}