"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AuthFormContainer from "@/components/auth/AuthFormContainer";
import FormInput from "@/components/ui/FormInput";
import SubmitButton from "@/components/ui/SubmitButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useAuth } from "@/contexts/AuthContext";
import { AuthValidationService } from "@/services/authValidation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const { isLoading, signUp } = useAuth();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFormErrors({});
      setSuccessMessage(null);

      // 表单验证
      const errors: Record<string, string> = {};

      const emailError = AuthValidationService.validateEmail(formData.email);
      if (emailError) errors.email = emailError;

      const usernameError = AuthValidationService.validateUsername(formData.username);
      if (usernameError) errors.username = usernameError;

      const passwordError = AuthValidationService.validatePassword(formData.password);
      if (passwordError) errors.password = passwordError;

      const confirmPasswordError = AuthValidationService.validateConfirmPassword(formData.password, formData.confirmPassword);
      if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      try {
        await signUp(formData.email, formData.password, formData.username);
        setSuccessMessage("注册成功！请检查您的邮箱并点击验证链接以激活账号。");

        // 3秒后自动跳转到登录页面
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (err: any) {
        // 处理特定的注册错误
        if (err?.message?.includes("User already registered")) {
          setFormErrors({ submit: "该邮箱已被注册" });
        }
        // 其他错误已经在context中处理
      }
    },
    [formData, signUp, router]
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

      if (successMessage) setSuccessMessage(null);
    },
    [formErrors, successMessage]
  );

  const footer = (
    <p className='text-sm text-gray-600 dark:text-gray-400'>
      已有账号?{" "}
      <a className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium' href='/login'>
        返回登录
      </a>
    </p>
  );

  return (
    <AuthFormContainer title='创建新账号' subtitle='只需输入邮箱和密码，即可完成注册' icon='fa-solid fa-user-plus' footer={footer}>
      {formErrors.submit && <ErrorMessage message={formErrors.submit} />}
      {successMessage && <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>{successMessage}</div>}

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
            label='用户名'
            type='text'
            name='username'
            placeholder='请输入用户名（3-20个字符）'
            value={formData.username}
            onChange={handleChange}
            required
            error={formErrors.username}
          />

          <FormInput
            label='密码'
            type='password'
            name='password'
            placeholder='请设置密码（至少8个字符，包含字母和数字）'
            value={formData.password}
            onChange={handleChange}
            required
            error={formErrors.password}
          />

          <FormInput
            label='确认密码'
            type='password'
            name='confirmPassword'
            placeholder='请再次输入密码'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={formErrors.confirmPassword}
          />

          <SubmitButton isLoading={isLoading} loadingText='注册中...' normalText='注册' icon='fa-solid fa-user-plus' />
        </div>
      </form>
    </AuthFormContainer>
  );
}
