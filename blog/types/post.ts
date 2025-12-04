export interface Post {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  createdAt: string;
  views: number;
  image: string;
  tags: string[];
}

export interface PostFilters {
  searchTerm: string;
  statusFilter: 'all' | 'published' | 'draft';
}