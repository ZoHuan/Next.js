"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
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

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_ERROR" };

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload, isLoading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 初始化检查用户状态 - 优化版本
  useEffect(() => {
    let isMounted = true;

    const checkAuthStatus = async () => {
      try {
        // 首先尝试从本地存储获取缓存的用户信息
        const cachedUser = localStorage.getItem("auth_user");
        if (cachedUser) {
          const user = JSON.parse(cachedUser);
          if (isMounted) {
            dispatch({ type: "SET_USER", payload: user });
          }
        }

        // 然后进行实际的认证检查
        const user = await authApi.getCurrentUser();
        if (isMounted) {
          dispatch({ type: "SET_USER", payload: user });
          // 缓存用户信息
          if (user) {
            localStorage.setItem("auth_user", JSON.stringify(user));
          } else {
            localStorage.removeItem("auth_user");
          }
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: "SET_USER", payload: null });
          localStorage.removeItem("auth_user");
        }
      }
    };

    checkAuthStatus();

    // 监听认证状态变化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        try {
          const user = await authApi.getCurrentUser();
          if (isMounted) {
            dispatch({ type: "SET_USER", payload: user });
            if (user) {
              localStorage.setItem("auth_user", JSON.stringify(user));
            }
          }
        } catch (error) {
          if (isMounted) {
            dispatch({ type: "SET_USER", payload: null });
            localStorage.removeItem("auth_user");
          }
        }
      } else if (event === "SIGNED_OUT") {
        if (isMounted) {
          dispatch({ type: "SET_USER", payload: null });
          localStorage.removeItem("auth_user");
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "CLEAR_ERROR" });

    try {
      await authApi.signIn(email, password);
      // 认证状态变化会通过监听器自动更新user状态
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "CLEAR_ERROR" });

    try {
      await authApi.signUp(email, password, username);
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const signOut = async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      await authApi.signOut();
      // 认证状态变化会通过监听器自动更新user状态
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
