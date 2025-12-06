export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  pinned?: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

