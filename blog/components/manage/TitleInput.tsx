"use client";

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TitleInput({ value, onChange, placeholder = "文章标题" }: TitleInputProps) {
  return (
    <div>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full px-4 py-3 text-xl font-bold border-0 border-b-2 border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors'
      />
    </div>
  );
}
