import ArticleCard from "@/components/blog/ArticleCard";

interface Article {
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
}

interface ArticleGridProps {
  articles: Article[];
  title?: string;
}

export default function ArticleGrid({ articles, title = "所有文章" }: ArticleGridProps) {
  return (
    <section>
      <h2 className='text-xl font-bold mb-6' style={{ opacity: 1 }}>
        {title}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {articles.map((article) => (
          <div key={article.id} style={{ opacity: 1, transform: "none" }}>
            <ArticleCard {...article} />
          </div>
        ))}
      </div>
    </section>
  );
}
