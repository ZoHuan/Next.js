export interface Article {
  id: string;
  slug: string;
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
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  replies?: Comment[];
}