"use client";

interface CoverImageUploadProps {
  onImageSelect?: (file: File) => void;
  existingImage?: string;
  onImageRemove?: () => void;
}

export default function CoverImageUpload({ onImageSelect, existingImage, onImageRemove }: CoverImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageSelect) {
      onImageSelect(file);
    }
  };

  return (
    <div className='bg-gray-50 dark:bg-gray-800 p-4 rounded-md'>
      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>封面图片</label>

      {existingImage ? (
        <div className='relative border-2 border-dashed border-blue-600 dark:border-blue-400 rounded-lg p-4 text-center transition-colors hover:border-blue-500 dark:hover:border-blue-400'>
          <div className='relative'>
            <img src={existingImage} alt='封面预览' className='max-h-60 mx-auto object-contain rounded-md' />
            {onImageRemove && (
              <button
                type='button'
                className='absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors'
                aria-label='移除图片'
                onClick={onImageRemove}
              >
                <i className='fa-solid fa-times'></i>
              </button>
            )}
            <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>点击图片上方的×按钮移除</p>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
