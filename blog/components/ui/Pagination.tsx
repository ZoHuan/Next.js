interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='flex justify-center mt-8'>
      <nav className='flex items-center space-x-1'>
        {/* 上一页按钮 */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            currentPage === 1
              ? "text-gray-400 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
              : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <i className='fa-solid fa-chevron-left text-xs'></i>
        </button>

        {/* 页码按钮 */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              page === currentPage
                ? "text-white bg-blue-600 hover:bg-blue-700"
                : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {page}
          </button>
        ))}

        {/* 下一页按钮 */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            currentPage === totalPages
              ? "text-gray-400 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
              : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <i className='fa-solid fa-chevron-right text-xs'></i>
        </button>
      </nav>
    </div>
  );
}
