"use client";

import { useState } from "react";

interface TagManagerProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export default function TagManager({ tags, onTagsChange }: TagManagerProps) {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        onTagsChange([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className='flex flex-wrap items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md'>
      <span className='text-sm text-gray-600 dark:text-gray-400'>标签:</span>
      {tags.map((tag, index) => (
        <span
          key={index}
          className='inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-md'
        >
          {tag}
          <button onClick={() => handleRemoveTag(tag)} className='ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200'>
            <i className='fa-solid fa-xmark text-xs'></i>
          </button>
        </span>
      ))}
      <input
        type='text'
        placeholder='输入标签，按回车或逗号添加'
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleAddTag}
        className='flex-1 min-w-[200px] px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all'
      />
    </div>
  );
}
