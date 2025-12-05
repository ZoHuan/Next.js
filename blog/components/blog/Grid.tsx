import Card from "@/components/blog/Card";

interface GridProps {
  articles: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    author: {
      name: string;
      avatar: string;
    };
    date: string;
    views: number;
    likes: number;
  }>;
  title?: string;
}

export default function Grid({ articles, title = "所有文章" }: GridProps) {
  return (
    <section>
      <h2 className='text-xl font-bold mb-6' style={{ opacity: 1 }}>
        {title}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {articles.map((article) => (
          <div key={article.id} style={{ opacity: 1, transform: "none" }}>
            <Card {...article} />
          </div>
        ))}
      </div>
    </section>
  );
}
