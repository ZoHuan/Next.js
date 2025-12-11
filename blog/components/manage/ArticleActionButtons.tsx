import Link from "next/link";

interface ActionButtonsProps {
  onSave: () => void;
  cancelHref?: string;
  saveLabel?: string;
  cancelLabel?: string;
  isSaving?: boolean;
}

export default function ArticleActionButtons({
  onSave,
  cancelHref = "/manage/articles",
  saveLabel = "保存文章",
  cancelLabel = "取消",
  isSaving = false,
}: ActionButtonsProps) {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSaving) {
      onSave();
    }
  };

  return (
    <div className='flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-800'>
      <Link
        href={cancelHref}
        className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
      >
        {cancelLabel}
      </Link>
      <button
        onClick={handleSaveClick}
        disabled={isSaving}
        className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors flex items-center ${
          isSaving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSaving ? (
          <>
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
            保存中...
          </>
        ) : (
          <>
            <i className='fa-solid fa-save mr-2'></i> {saveLabel}
          </>
        )}
      </button>
    </div>
  );
}
