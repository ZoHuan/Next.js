"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image"; // 导入 Next.js Image 组件

interface CoverImageUploadProps {
  onImageSelect?: (imageUrl: string) => void;
  existingImage?: string;
  onImageRemove?: () => void;
}

export default function CoverImageUpload({ onImageSelect, existingImage, onImageRemove }: CoverImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // 上传图片到Supabase Storage
  const uploadImageToSupabase = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // 验证文件类型和大小
      if (!file.type.startsWith("image/")) {
        throw new Error("请上传图片文件");
      }
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("图片大小不能超过2MB");
      }

      // 生成唯一文件名
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `article-images/${fileName}`;

      // 上传到Supabase Storage
      const { data, error } = await supabase.storage.from("article-images").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (error) {
        throw new Error(`上传失败: ${error.message}`);
      }

      // 获取公开URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("article-images").getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "上传失败";
      setUploadError(errorMessage);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 直接使用Supabase上传
      const imageUrl = await uploadImageToSupabase(file);
      onImageSelect?.(imageUrl);
    } catch (error) {
      console.error("图片上传失败:", error);
    }
  };

  return (
    <div className='bg-gray-50 dark:bg-gray-800 p-4 rounded-md'>
      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>封面图片</label>

      {uploadError && <div className='mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md text-sm'>{uploadError}</div>}

      {existingImage ? (
        <div className='relative border-2 border-dashed border-blue-600 dark:border-blue-400 rounded-lg p-4 text-center transition-colors hover:border-blue-500 dark:hover:border-blue-400'>
          <div className='relative'>
            <Image
              src={existingImage}
              alt='封面预览'
              width={400}
              height={240}
              className='max-h-60 mx-auto object-contain rounded-md'
              priority={true}
            />

            {onImageRemove && (
              <button
                type='button'
                className='absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center'
                aria-label='移除图片'
                onClick={onImageRemove}
                disabled={isUploading}
              >
                <i className='fa-solid fa-times text-sm'></i>
              </button>
            )}
            <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>点击图片上方的×按钮移除</p>
          </div>
        </div>
      ) : (
        <div className='relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center transition-colors hover:border-blue-500 dark:hover:border-blue-400'>
          <input type='file' id='cover-image-upload' accept='image/*' className='hidden' onChange={handleFileChange} disabled={isUploading} />
          <label
            htmlFor='cover-image-upload'
            className={`cursor-pointer flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-md transition-colors ${
              isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {isUploading ? (
              <>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2'></div>
                <span className='text-gray-700 dark:text-gray-300 font-medium'>上传中...</span>
              </>
            ) : (
              <>
                <i className='fa-solid fa-cloud-arrow-up text-4xl text-gray-400 dark:text-gray-500 mb-2'></i>
                <span className='text-gray-700 dark:text-gray-300 font-medium'>上传封面图片</span>
                <span className='text-xs text-gray-500 dark:text-gray-400 mt-1'>支持 JPG, PNG, GIF 格式，不超过 2MB</span>
              </>
            )}
          </label>
        </div>
      )}
    </div>
  );
}
