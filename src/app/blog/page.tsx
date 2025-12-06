import { type Metadata } from "next";
import { getAllPosts } from "~/lib/blog";
import { BlogList } from "./_components/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software engineering, web development, and technology. Read my latest articles and tutorials.",
  openGraph: {
    title: "Blog | Yu Quan Lim",
    description: "Thoughts on software engineering, web development, and technology. Read my latest articles and tutorials.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogList posts={posts} />;
}

