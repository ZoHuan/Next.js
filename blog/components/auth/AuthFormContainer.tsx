interface AuthFormContainerProps {
  title: string;
  subtitle: string;
  icon: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AuthFormContainer({ title, subtitle, icon, children, footer }: AuthFormContainerProps) {
  return (
    <main className='flex-1 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
        <div className='p-6 md:p-8'>
          <div className='text-center mb-8'>
            <div className='flex justify-center mb-4'>
              <div className='w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center'>
                <i className={`${icon} text-blue-600 dark:text-blue-400 text-2xl`}></i>
              </div>
            </div>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>{title}</h2>
            <p className='text-gray-600 dark:text-gray-400 mt-2'>{subtitle}</p>
          </div>
          {children}
          {footer && <div className='mt-6 text-center'>{footer}</div>}
        </div>
      </div>
    </main>
  );
}
