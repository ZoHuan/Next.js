interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  normalText: string;
  icon: string;
  disabled?: boolean;
}

export default function SubmitButton({ isLoading, loadingText, normalText, icon, disabled = false }: SubmitButtonProps) {
  return (
    <button
      type='submit'
      disabled={disabled || isLoading}
      className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition-colors flex items-center justify-center'
    >
      {isLoading ? (
        <>
          <i className='fa-solid fa-spinner fa-spin mr-2'></i>
          {loadingText}
        </>
      ) : (
        <>
          <i className={`${icon} mr-2`}></i>
          {normalText}
        </>
      )}
    </button>
  );
}
