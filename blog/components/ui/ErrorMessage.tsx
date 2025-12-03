interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className='mb-4 p-3 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded-md'>
      <p className='text-red-700 dark:text-red-300 text-sm'>{message}</p>
    </div>
  );
}
