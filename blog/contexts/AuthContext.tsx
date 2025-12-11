"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi } from "@/lib/db";
import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  email?: string;
  profile?: {
    username?: string;
    avatar_url?: string;
  } | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 检查当前登录状态
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authApi.getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error("检查登录状态失败:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // 监听认证状态变化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        // 用户登录，获取用户信息
        try {
          const user = await authApi.getCurrentUser();
          setUser(user);
        } catch (error) {
          console.error("获取用户信息失败:", error);
          setUser(null);
        }
      } else if (event === "SIGNED_OUT") {
        // 用户登出
        setUser(null);
      }
    });

    // 清理监听器
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    await authApi.signIn(email, password);
    const user = await authApi.getCurrentUser();
    setUser(user);
  };

  const signUp = async (email: string, password: string, username: string) => {
    await authApi.signUp(email, password, username);
  };

  const signOut = async () => {
    try {
      await authApi.signOut();
      setUser(null);
    } catch (error) {
      console.error("退出登录失败:", error);
      setUser(null);
      throw error; // 重新抛出错误以便调用者处理
    }
  };

  return <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider内使用");
  }
  return context;
};
