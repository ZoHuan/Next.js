interface ContentProps {
  article: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    tags: string[];
    author: {
      name: string;
      avatar: string;
    };
    date: string;
    views: number;
    likes: number;
  };
}

export default function Content({ article }: ContentProps) {
  return (
    <div
      className='prose dark:prose-invert max-w-none mb-10 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-md'
      style={{ opacity: 1 }}
      dangerouslySetInnerHTML={{ __html: article.content }}
    />
  );
}
