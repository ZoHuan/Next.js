"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthFormContainer from "@/components/auth/AuthFormContainer";
import FormInput from "@/components/ui/FormInput";
import SubmitButton from "@/components/ui/SubmitButton";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/");
    } catch (error) {
      console.error("登录失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const footer = (
    <p className='text-sm text-gray-600 dark:text-gray-400'>
      还没有账号?{" "}
      <a className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium' href='/signup'>
        立即注册
      </a>
    </p>
  );

  return (
    <AuthFormContainer title='登录博客管理系统' subtitle='请输入您的邮箱和密码' icon='fa-solid fa-user-lock' footer={footer}>
      <form onSubmit={handleSubmit}>
        <div className='space-y-4'>
          <FormInput label='邮箱' type='email' name='email' placeholder='请输入邮箱' value={formData.email} onChange={handleChange} required />

          <FormInput
            label='密码'
            type='password'
            name='password'
            placeholder='请输入密码'
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='remember-me'
                className='h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-700 rounded'
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700 dark:text-gray-400'>
                记住我
              </label>
            </div>
            <a
              href='#'
              className='text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors'
            >
              忘记密码?
            </a>
          </div>

          <SubmitButton isLoading={isLoading} loadingText='登录中...' normalText='登录' icon='fa-solid fa-right-to-bracket' />
        </div>
      </form>
    </AuthFormContainer>
  );
}
