"use client";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

interface MDXContentProps {
  content: string;
}

const components = {
  // Custom heading components with anchor links
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-white" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-white" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-white" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-white" {...props} />
  ),
  // Paragraph
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-300 leading-relaxed mb-6" {...props} />
  ),
  // Links
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  // Lists
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-4" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-gray-300 mb-6 space-y-2 ml-4" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-gray-300" {...props} />
  ),
  // Blockquote
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-purple-500 pl-6 py-2 my-6 text-gray-400 italic bg-white/5 rounded-r-lg"
      {...props}
    />
  ),
  // Code blocks (handled by rehype-pretty-code, but we style the wrapper)
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-6 rounded-xl border border-white/10 bg-[#0d1117] overflow-x-auto"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    // Inline code vs block code
    const isInline = typeof props.children === "string" && !props.className;
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 bg-white/10 text-pink-400 rounded text-sm font-mono"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  // Horizontal rule
  hr: () => (
    <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  ),
  // Strong/Bold
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  // Emphasis/Italic
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-gray-200" {...props} />
  ),
  // Images
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-xl my-6 max-w-full" alt={props.alt ?? ""} {...props} />
  ),
};

export function MDXContent({ content }: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function compileMDX() {
      try {
        const serialized = await serialize(content, {
          mdxOptions: {
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: "github-dark-dimmed",
                  keepBackground: true,
                  onVisitLine(node: { children: unknown[] }) {
                    // Prevent lines from collapsing in `display: grid` mode
                    if (node.children.length === 0) {
                      node.children = [{ type: "text", value: " " }];
                    }
                  },
                  onVisitHighlightedLine(node: { properties: { className: string[] } }) {
                    node.properties.className.push("highlighted");
                  },
                },
              ],
            ],
          },
        });
        setMdxSource(serialized);
      } catch (error) {
        console.error("Error compiling MDX:", error);
      } finally {
        setIsLoading(false);
      }
    }

    void compileMDX();
  }, [content]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-5/6" />
        <div className="h-32 bg-white/10 rounded mt-6" />
        <div className="h-4 bg-white/10 rounded w-2/3" />
        <div className="h-4 bg-white/10 rounded w-full" />
      </div>
    );
  }

  if (!mdxSource) {
    return (
      <div className="text-gray-400">
        <p>Failed to load content.</p>
      </div>
    );
  }

  return <MDXRemote {...mdxSource} components={components} />;
}

