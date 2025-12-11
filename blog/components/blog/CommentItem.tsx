"use client";

import { useState } from "react";
import Image from "next/image";
import { Comment } from "@/types/blog.types";
import { formatDate } from "@/lib/date-utils";
import CommentForm from "./CommentForm";

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  articleId: string;
}

export default function CommentItem({ comment, isReply = false, articleId }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const initialReplies = comment.replies || [];
  const [newReplies, setNewReplies] = useState<Comment[]>([]);

  const allReplies = [...initialReplies, ...newReplies];

  const handleReplyAdded = (newReply: Comment) => {
    setNewReplies((prevReplies) => [...prevReplies, newReply]);
    setShowReplyForm(false);
  };

  // 简化头像源处理，直接使用头像URL或默认头像
  const avatarSrc = comment.author.avatar || "/default-avatar.png";

  return (
    <div className={`${isReply ? "mb-4 pl-4 md:pl-8 border-l-2 border-gray-200 dark:border-gray-700" : "mb-4"}`}>
      <div className='bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'>
        <div className='flex items-start'>
          <Image src={avatarSrc} alt={comment.author.name} width={40} height={40} className='w-10 h-10 rounded-full object-cover mr-3' />
          <div className='flex-1'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium text-gray-900 dark:text-white'>{comment.author.name}</h4>
              <span className='text-xs text-gray-500 dark:text-gray-400'>{formatDate(comment.createdAt, "YYYY年MM月DD日 HH:mm")}</span>
            </div>
            <p className='mt-2 text-sm text-gray-700 dark:text-gray-300'>{comment.content}</p>
            <div className='mt-3 flex items-center space-x-4'>
              <button
                className='text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                回复
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 回复表单 */}
      {showReplyForm && (
        <CommentForm articleId={articleId} parentId={comment.id} onCommentAdded={handleReplyAdded} onCancel={() => setShowReplyForm(false)} />
      )}

      {/* 回复评论 */}
      {allReplies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} isReply={true} articleId={articleId} />
      ))}
    </div>
  );
}
