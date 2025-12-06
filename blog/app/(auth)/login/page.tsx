"use client";

import { useState, useCallback } from "react";
import AuthFormContainer from "@/components/auth/AuthFormContainer";
import FormInput from "@/components/ui/FormInput";
import SubmitButton from "@/components/ui/SubmitButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useAuth } from "@/hooks/useAuth";
import { AuthValidationService } from "@/services/authValidation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { isLoading, error, login, clearError } = useAuth();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // 表单验证
      const errors: Record<string, string> = {};
      const emailError = AuthValidationService.validateEmail(formData.email);
      if (emailError) errors.email = emailError;

      const passwordError = AuthValidationService.validatePassword(formData.password);
      if (passwordError) errors.password = passwordError;

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      try {
        await login(formData.email, formData.password);
      } catch (err) {
        // 错误已经在hook中处理
      }
    },
    [formData, login]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // 清除对应字段的错误
      if (formErrors[name]) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }

      if (error) clearError();
    },
    [formErrors, error, clearError]
  );

  // 优化记住我切换
  const handleRememberMeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  }, []);

  const footer = (
    <p className='text-sm text-gray-600 dark:text-gray-400'>
      还没有账号?{" "}
      <a className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors' href='/signup'>
        立即注册
      </a>
    </p>
  );

  return (
    <AuthFormContainer title='登录博客管理系统' subtitle='请输入您的邮箱和密码' icon='fa-solid fa-user-lock' footer={footer}>
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} noValidate>
        <div className='space-y-4'>
          <FormInput
            label='邮箱'
            type='email'
            name='email'
            placeholder='请输入邮箱'
            value={formData.email}
            onChange={handleChange}
            required
            error={formErrors.email}
          />

          <FormInput
            label='密码'
            type='password'
            name='password'
            placeholder='请输入密码'
            value={formData.password}
            onChange={handleChange}
            required
            error={formErrors.password}
          />

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='remember-me'
                className='h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-700 rounded transition-colors'
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700 dark:text-gray-400 cursor-pointer'>
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
