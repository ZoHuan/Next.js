interface ArticleFiltersProps {
  filters: {
    searchTerm: string;
    statusFilter: "all" | "published" | "draft";
  };
  onFiltersChange: (filters: { searchTerm: string; statusFilter: "all" | "published" | "draft" }) => void;
}

export default function ArticleFilters({ filters, onFiltersChange }: ArticleFiltersProps) {
  const handleSearchChange = (searchTerm: string) => {
    onFiltersChange({ ...filters, searchTerm });
  };

  const handleStatusChange = (statusFilter: "all" | "published" | "draft") => {
    onFiltersChange({ ...filters, statusFilter });
  };

  return (
    <div className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-6'>
      <div className='flex flex-col sm:flex-row gap-4 items-end'>
        <div className='flex-1'>
          <label htmlFor='search' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
            搜索文章
          </label>
          <div className='relative'>
            <input
              type='text'
              id='search'
              placeholder='搜索文章标题或摘要...'
              value={filters.searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className='w-full h-10 px-4 pl-10 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
            />
            <i className='fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'></i>
          </div>
        </div>
        <div className='w-full sm:w-48'>
          <label htmlFor='status' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
            文章状态
          </label>
          <select
            id='status'
            value={filters.statusFilter}
            onChange={(e) => handleStatusChange(e.target.value as "all" | "published" | "draft")}
            className='w-full h-10 px-4 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
          >
            <option value='all'>全部</option>
            <option value='published'>已发布</option>
            <option value='draft'>草稿</option>
          </select>
        </div>
      </div>
    </div>
  );
}
