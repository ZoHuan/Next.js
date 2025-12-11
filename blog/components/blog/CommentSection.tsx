"use client";

import { useState } from "react";
import { Comment } from "@/types/blog.types";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentSectionProps {
  comments: Comment[];
  articleId: string;
}

export default function CommentSection({ comments, articleId }: CommentSectionProps) {
  const [commentList, setCommentList] = useState<Comment[]>(comments);

  const handleCommentAdded = (newComment: Comment) => {
    setCommentList((prev) => [...prev, newComment]);
  };

  return (
    <div className='mt-12'>
      <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>评论 ({commentList.length})</h3>

      <CommentForm articleId={articleId} onCommentAdded={handleCommentAdded} />
      <CommentList comments={commentList} articleId={articleId} />
    </div>
  );
}
