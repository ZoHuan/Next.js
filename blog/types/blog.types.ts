// 核心数据模型类型
export interface Tag {
  name: string;
  count: number;
}

export interface Author {
  name: string;
  avatar: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  description: string;
  imageUrl: string;
  tags: string[];
  author: Author;
  createdAt: string;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  createdAt: string;
  replies?: Comment[];
}
