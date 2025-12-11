"use client";

import { Comment } from "@/types/blog.types";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: Comment[];
  articleId: string;
}

export default function CommentList({ comments, articleId }: CommentListProps) {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} articleId={articleId} />
      ))}
    </div>
  );
}
