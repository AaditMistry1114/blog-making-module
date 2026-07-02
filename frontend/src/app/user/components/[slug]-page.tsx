"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockBlogs } from "@/services/mockBlogs";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = use(params);
  const blog = mockBlogs.find((b) => b.slug === resolvedParams.slug);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(12);

  if (!blog) {
    notFound();
  }

  const handleLike = () => {
    if (liked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/user" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center text-zinc-50 dark:text-zinc-900 font-bold text-lg transition-transform group-hover:scale-105">
              B
            </span>
            <span className="font-semibold text-lg tracking-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              Blogverse
            </span>
          </Link>
          <Link
            href="/user"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 flex items-center gap-1 transition-colors"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Articles
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        {/* Article Metadata */}
        <div className="flex items-center gap-3 mb-6 text-sm">
          <span className="text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2.5 py-1 rounded">
            {blog.category}
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-zinc-500 dark:text-zinc-400">{blog.publishedAt}</span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-zinc-500 dark:text-zinc-400">{blog.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8 leading-tight">
          {blog.title}
        </h1>

        {/* Hero Cover Image */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-md border border-zinc-200/50 dark:border-zinc-800/50">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Content Render */}
        <article className="prose prose-zinc dark:prose-invert max-w-none flex flex-col gap-6 text-zinc-800 dark:text-zinc-200">
          {blog.blocks.map((block) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2
                    key={block.id}
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-6 mb-2 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-2"
                  >
                    {block.data.text}
                  </h2>
                );
              case "subheading":
                return (
                  <h3
                    key={block.id}
                    className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mt-4 mb-1"
                  >
                    {block.data.text}
                  </h3>
                );
              case "paragraph":
                return (
                  <p key={block.id} className="text-base sm:text-lg leading-relaxed mb-4 text-zinc-600 dark:text-zinc-300">
                    {block.data.text}
                  </p>
                );
              case "image":
                return (
                  <div key={block.id} className="my-8 flex flex-col gap-2">
                    <div className="rounded-xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm max-h-[400px]">
                      <img src={block.data.url} alt="Article visual content" className="w-full h-full object-cover" />
                    </div>
                    {block.data.caption && (
                      <span className="text-xs text-center text-zinc-400 dark:text-zinc-500 italic">
                        {block.data.caption}
                      </span>
                    )}
                  </div>
                );
              default:
                return null;
            }
          })}
        </article>

        {/* Interactive Interaction Block */}
        <div className="border-t border-b border-zinc-200/60 dark:border-zinc-800/60 my-16 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border cursor-pointer ${
                liked
                  ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30 text-red-500"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <svg
                className={`w-5 h-5 transition-transform ${liked ? "scale-110 fill-current" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{likesCount} Likes</span>
            </button>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-500 dark:text-zinc-400 rounded-full text-sm font-semibold transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 10.742l-2.622 2.622a3 3 0 104.243 4.243l1.152-1.152M12 12v.01M15.316 13.258l2.622-2.622a3 3 0 10-4.243-4.243l-1.152 1.152"
              />
            </svg>
            Share
          </button>
        </div>

        {/* Read More Section */}
        <section className="mb-12">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-6">Continue Reading</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mockBlogs
              .filter((b) => b.id !== blog.id)
              .slice(0, 2)
              .map((relatedBlog) => (
                <Link
                  href={`/user/${relatedBlog.slug}`}
                  key={relatedBlog.id}
                  className="group block p-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 hover:shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    {relatedBlog.category}
                  </span>
                  <h5 className="font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors line-clamp-1 mb-1">
                    {relatedBlog.title}
                  </h5>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {relatedBlog.excerpt}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 py-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
        <p>© 2026 Blogverse Platform. Powered by Next.js & CSS v4.</p>
      </footer>
    </div>
  );
}
