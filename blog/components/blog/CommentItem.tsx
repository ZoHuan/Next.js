import { Comment } from "@/types/blog.types";

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
}

export default function CommentItem({ comment, isReply = false }: CommentItemProps) {
  return (
    <div className={`${isReply ? "mb-4 pl-4 md:pl-8 border-l-2 border-gray-200 dark:border-gray-700" : "mb-4"}`}>
      <div className='bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'>
        <div className='flex items-start'>
          <img src={comment.author.avatar} alt={comment.author.name} className='w-10 h-10 rounded-full object-cover mr-3' />
          <div className='flex-1'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium text-gray-900 dark:text-white'>{comment.author.name}</h4>
              <span className='text-xs text-gray-500 dark:text-gray-400'>{comment.date}</span>
            </div>
            <p className='mt-2 text-sm text-gray-700 dark:text-gray-300'>{comment.content}</p>
            <div className='mt-3 flex items-center space-x-4'>
              <button className='text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                回复
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 回复评论 */}
      {comment.replies && comment.replies.map((reply) => <CommentItem key={reply.id} comment={reply} isReply={true} />)}
    </div>
  );
}
