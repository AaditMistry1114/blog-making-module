"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { mockBlogs } from "@/services/mockBlogs";

export default function UserBlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories
  const categories = useMemo(() => {
    const list = new Set(mockBlogs.map((b) => b.category));
    return ["All", ...Array.from(list)];
  }, []);

  // Filter blogs based on search and category
  const filteredBlogs = useMemo(() => {
    return mockBlogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col">
      {/* Top Header/Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/user" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center text-zinc-50 dark:text-zinc-900 font-bold text-lg transition-transform group-hover:scale-105">
              B
            </span>
            <span className="font-semibold text-lg tracking-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              Blogverse
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/blogs/new"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 shadow-sm transition-all hover:shadow-md cursor-pointer"
            >
              Write a Blog
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-linear-to-b from-white to-zinc-50 dark:from-zinc-900/20 dark:to-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-200/40 via-transparent to-transparent dark:from-zinc-800/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 mb-6">
            ✨ Welcome to Blogverse
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-linear-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 bg-clip-text text-transparent mb-6">
            Stories, Ideas & Expertise
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover articles on design, web technologies, and software engineering. Thoughtfully crafted layouts for clean readability.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700 rounded-xl blur-xs opacity-50 group-hover:opacity-70 transition duration-300" />
            <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center px-4 py-3 shadow-xs">
              <svg
                className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mr-3 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title or content..."
                className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                selectedCategory === category
                  ? "bg-zinc-900 border-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:border-zinc-50 dark:text-zinc-900"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/30">
            <svg
              className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">No articles found</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto">
              We couldn&apos;t find any blogs matching your search term. Try checking your spelling or selecting another category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Cover Image */}
                <Link href={`/user/${blog.slug}`} className="relative block aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded">
                      {blog.category}
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">•</span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">{blog.readTime}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 leading-snug group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                    <Link href={`/user/${blog.slug}`}>{blog.title}</Link>
                  </h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">{blog.publishedAt}</span>
                    <Link
                      href={`/user/${blog.slug}`}
                      className="text-xs font-semibold flex items-center gap-1 text-zinc-900 dark:text-zinc-50 hover:underline"
                    >
                      Read full
                      <svg
                        className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 py-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
        <p>© 2026 Blogverse Platform. Powered by Next.js & CSS v4.</p>
      </footer>
    </div>
  );
}