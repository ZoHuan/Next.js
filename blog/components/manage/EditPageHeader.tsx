import Link from "next/link";

interface EditPageHeaderProps {
  title: string;
  backHref?: string;
  backLabel?: string;
}

export default function EditPageHeader({ title, backHref = "/manage/articles", backLabel = "返回管理" }: EditPageHeaderProps) {
  return (
    <div className='flex items-center justify-between mb-6'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <Link
        href={backHref}
        className='text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center'
      >
        <i className='fa-solid fa-arrow-left mr-2'></i>
        {backLabel}
      </Link>
    </div>
  );
}
