interface BlogHeaderProps {
  title: string;
  subtitle: string;
}

export default function BlogHeader({ title, subtitle }: BlogHeaderProps) {
  return (
    <div className='mb-8 text-center' style={{ opacity: 1, transform: "none" }}>
      <h1 className='text-2xl md:text-3xl font-bold mb-2'>{title}</h1>
      <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>{subtitle}</p>
    </div>
  );
}
