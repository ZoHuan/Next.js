import { Comment } from "@/types/blog.types";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentSectionProps {
  comments: Comment[];
  commentCount: number;
}

export default function CommentSection({ comments, commentCount }: CommentSectionProps) {
  return (
    <div className='mt-12'>
      <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>评论 ({commentCount})</h3>

      <CommentForm />
      <CommentList comments={comments} />
    </div>
  );
}
