"use client";

import { useState, useEffect } from "react";
import { Tag } from "@/types";
import { articleApi } from "@/lib/db";

export interface SidebarProps {
  tags?: Tag[];
  onTagClick: (tagName: string) => void;
}

export default function Sidebar({ tags, onTagClick }: SidebarProps) {
  const [localTags, setLocalTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        // 如果通过props传递了标签数据，则使用props的数据
        if (tags && tags.length > 0) {
          setLocalTags(tags);
          return;
        }

        // 否则从API获取标签数据
        const tagsData = await articleApi.getAllTags();
        setLocalTags(tagsData);
      } catch (error) {
        console.error("获取标签失败:", error);
        // 如果API调用失败，设置空数组
        setLocalTags([]);
      }
    };

    fetchTags();
  }, [tags]);

  return (
    <div className='lg:col-span-1'>
      <div className='sticky top-24 space-y-8'>
        <section className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md'>
          <h2 className='text-xl font-bold mb-4'>热门标签</h2>
          <div className='space-y-2'>
            {localTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => onTagClick(tag.name)}
                className='w-full text-left px-4 py-2.5 rounded-md font-medium transition-colors bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400'
              >
                <div className='flex items-center justify-between'>
                  <span>{tag.name}</span>
                  <span className='bg-white/20 dark:bg-gray-800/50 px-2 py-0.5 rounded text-xs'>{tag.count}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
