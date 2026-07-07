export interface Category {
  id: string;
  // 화면에 표시할 카테고리 이름
  name: string;
  // URL에 사용할 문자열
  slug: string;
  parentId: string | null;
  // 같은 부모를 가진 카테고리의 정렬 순서
  order: number;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  // 임시 저장 여부
  draft: boolean;
  categoryId: string;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
}

export interface BlogPostListResponse {
  items: BlogPostSummary[];
  page: number;
  pageSize: number;
  total: number;
}
