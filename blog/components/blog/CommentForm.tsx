"use client";

import { useState, useEffect } from "react";
import { commentApi } from "@/lib/db";

interface CommentFormProps {
  articleId: string;
  parentId?: string;
  onCommentAdded: (comment: any) => void;
  onCancel?: () => void;
}

export default function CommentForm({ articleId, parentId, onCommentAdded, onCancel }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 添加useEffect来监控组件重新渲染时的状态重置
  useEffect(() => {
    // 当组件重新渲染时，确保isSubmitting状态正确
    if (isSubmitting) {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const newComment = await commentApi.createComment({
        articleId,
        content: content.trim(),
        parentId,
      });

      setContent("");
      // 确保onCommentAdded不会抛出错误
      if (onCommentAdded) {
        onCommentAdded(newComment);
      }
    } catch (error) {
      console.error("发表评论失败:", error);
      alert("发表评论失败，请稍后重试");
    } finally {
      // 确保isSubmitting总是被重置
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`mb-8 ${parentId ? "pl-4 md:pl-8" : ""}`}>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <textarea
          placeholder={parentId ? "写下你的回复..." : "写下你的评论..."}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
          required
          disabled={isSubmitting}
        />
        <div className='mt-3 flex justify-end space-x-2'>
          {onCancel && (
            <button
              type='button'
              onClick={onCancel}
              className='px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm font-medium rounded-md transition-colors'
              disabled={isSubmitting}
            >
              取消
            </button>
          )}
          <button
            type='submit'
            className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={isSubmitting}
          >
            <i className='fa-solid fa-paper-plane mr-2'></i>
            {isSubmitting ? "发表中..." : parentId ? "回复" : "发表评论"}
          </button>
        </div>
      </form>
    </div>
  );
}
