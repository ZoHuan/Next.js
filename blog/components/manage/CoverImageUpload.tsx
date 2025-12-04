"use client";

interface CoverImageUploadProps {
  onImageSelect?: (file: File) => void;
}

export default function CoverImageUpload({ onImageSelect }: CoverImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageSelect) {
      onImageSelect(file);
    }
  };

  return (
    <div className='bg-gray-50 dark:bg-gray-800 p-4 rounded-md'>
      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>封面图片</label>
      <div className='relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center transition-colors hover:border-blue-500 dark:hover:border-blue-400'>
        <input type='file' id='cover-image-upload' accept='image/*' className='hidden' onChange={handleFileChange} />
        <label
          htmlFor='cover-image-upload'
          className='cursor-pointer flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
        >
          <i className='fa-solid fa-cloud-arrow-up text-4xl text-gray-400 dark:text-gray-500 mb-2'></i>
          <span className='text-gray-700 dark:text-gray-300 font-medium'>上传封面图片</span>
          <span className='text-xs text-gray-500 dark:text-gray-400 mt-1'>支持 JPG, PNG, GIF 格式，不超过 2MB</span>
        </label>
      </div>
    </div>
  );
}
