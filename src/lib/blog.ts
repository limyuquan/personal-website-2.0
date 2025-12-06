import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogPostMeta } from "./blog-types";

// Re-export types for convenience
export type { BlogPost, BlogPostMeta } from "./blog-types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  pinned?: boolean;
}

/**
 * Get all blog post slugs
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as Frontmatter;
  const stats = readingTime(content);
  
  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    tags: frontmatter.tags ?? [],
    readingTime: stats.text,
    pinned: frontmatter.pinned,
    content,
  };
}

/**
 * Get metadata for a blog post (without content)
 */
export function getPostMeta(slug: string): BlogPostMeta | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as Frontmatter;
  const stats = readingTime(content);
  
  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    tags: frontmatter.tags ?? [],
    readingTime: stats.text,
    pinned: frontmatter.pinned,
  };
}

/**
 * Get all blog posts sorted by pinned status first, then by date (newest first)
 */
export function getAllPosts(): BlogPostMeta[] {
  const slugs = getPostSlugs();
  
  const posts = slugs
    .map((slug) => getPostMeta(slug))
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => {
      // Pinned posts come first
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      // Then sort by date
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  
  return posts;
}

// Re-export formatDate for convenience (server-side only)
export { formatDate } from "./format";

