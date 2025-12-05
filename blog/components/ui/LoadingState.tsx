interface LoadingStateProps {
  title?: string;
  message?: string;
}

export default function LoadingState({ title = "加载中", message = "请稍候..." }: LoadingStateProps) {
  return (
    <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center'>
      <div className='animate-pulse'>
        <div className='h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4'></div>
        <div className='h-4 bg-gray-300 rounded w-1/2 mx-auto'></div>
      </div>
      <p className='text-gray-600 dark:text-gray-400 mt-4'>{message}</p>
    </div>
  );
}
