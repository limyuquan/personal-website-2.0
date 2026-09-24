export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  // Set on posts that get revised over time
  updated?: string;
  tags: string[];
  readingTime: string;
  pinned?: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

