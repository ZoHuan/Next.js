// 管理相关数据模型类型
export interface Post {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  createdAt: string;
  imageUrl: string;
  tags: string[];
}

export interface PostFilters {
  searchTerm: string;
  statusFilter: 'all' | 'published' | 'draft';
}