"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthFormContainer from "@/components/auth/AuthFormContainer";
import FormInput from "@/components/ui/FormInput";
import SubmitButton from "@/components/ui/SubmitButton";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "密码至少需要8个字符";
    }
    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      return "密码必须包含字母和数字";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "请输入邮箱";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "两次输入的密码不一致";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/login");
    } catch (error) {
      console.error("注册失败:", error);
      setErrors({ submit: "注册失败，请稍后重试" });
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

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

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
      {errors.submit && <ErrorMessage message={errors.submit} />}

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
            error={errors.email}
          />

          <FormInput
            label='密码'
            type='password'
            name='password'
            placeholder='请设置密码（至少8个字符，包含字母和数字）'
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
          />

          <FormInput
            label='确认密码'
            type='password'
            name='confirmPassword'
            placeholder='请再次输入密码'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={errors.confirmPassword}
          />

          <SubmitButton isLoading={isLoading} loadingText='注册中...' normalText='注册' icon='fa-solid fa-user-plus' />
        </div>
      </form>
    </AuthFormContainer>
  );
}
