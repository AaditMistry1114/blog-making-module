"use client";

import React, { useState } from "react";

interface Block {
  id: string;
  type: "heading" | "paragraph" | "image" | "subheading";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

interface Blog {
  title: string;
  slug: string;
  blocks: Block[];
}

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);

  // Generate safe unique ID
  const generateId = () => {
    return typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  };

  // Add block to array
  const addBlock = (type: Block["type"]) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      data: type === "image" ? { url: "" } : { text: "" },
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  // Delete block
  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  // Update block data
  const updateBlockData = (id: string, key: string, value: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, data: { ...b.data, [key]: value } } : b
      )
    );
  };

  // Reorder blocks
  const moveBlock = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === blocks.length - 1) return;

    const swapIndex = direction === "up" ? index - 1 : index + 1;
    setBlocks((prev) => {
      const list = [...prev];
      const temp = list[index];
      list[index] = list[swapIndex];
      list[swapIndex] = temp;
      return list;
    });
  };

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    setSlug(generatedSlug);
  };

  const handlePublish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const blog: Blog = {
      title,
      slug,
      blocks,
    };
    console.log(blog);
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 sm:p-12 text-zinc-900 dark:text-zinc-50">
      <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl p-8 shadow-sm">
        <form onSubmit={handlePublish} className="flex flex-col gap-6">
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h1 className="text-xl font-semibold tracking-tight">
              Create Blog
            </h1>
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 cursor-pointer"
            >
              Publish
            </button>
          </div>

          {/* Title input */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="blog-title"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-500"
            >
              Blog Title
            </label>
            <input
              id="blog-title"
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter blog title..."
              className="w-full bg-transparent text-2xl font-bold tracking-tight placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:outline-none border-b border-transparent focus:border-zinc-200 dark:focus:border-zinc-800 pb-1"
            />
          </div>

          {/* Slug input */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="blog-slug"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-500"
            >
              Blog Slug
            </label>
            <div className="flex items-center gap-1.5 text-sm text-zinc-500">
              <span className="select-none font-mono text-zinc-300 dark:text-zinc-700">
                yoursite.com/blog/
              </span>
              <input
                id="blog-slug"
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="slug-url"
                className="flex-1 bg-transparent font-mono text-zinc-800 dark:text-zinc-200 focus:outline-none border-b border-zinc-200 dark:border-zinc-800 pb-0.5"
              />
            </div>
          </div>

          {/* Blocks Section */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">
              Blocks
            </h2>

            {/* Block List */}
            <div className="flex flex-col gap-4 mb-6">
              {blocks.length === 0 ? (
                <div className="border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-8 text-center text-zinc-400 dark:text-zinc-500 bg-zinc-50/30 dark:bg-zinc-950/20">
                  <p className="text-sm">No blocks added yet.</p>
                  <p className="text-xs mt-1">Use the panel below to build your content layout.</p>
                </div>
              ) : (
                blocks.map((block, index) => (
                  <div
                    key={block.id}
                    className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg p-4 shadow-sm flex flex-col gap-3"
                  >
                    {/* Block Toolbar */}
                    <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                      <span className="text-xs font-semibold tracking-wider uppercase bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500 dark:text-zinc-400">
                        {block.type}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => moveBlock(index, "up")}
                          className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer"
                          title="Move Up"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          disabled={index === blocks.length - 1}
                          onClick={() => moveBlock(index, "down")}
                          className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer"
                          title="Move Down"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteBlock(block.id)}
                          className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"
                          title="Delete Block"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Block Input Content */}
                    <div>
                      {block.type === "heading" && (
                        <input
                          type="text"
                          required
                          value={block.data.text || ""}
                          onChange={(e) => updateBlockData(block.id, "text", e.target.value)}
                          placeholder="Heading text..."
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 focus:border-zinc-950 dark:focus:border-zinc-300"
                        />
                      )}
                      {block.type === "subheading" && (
                        <input
                          type="text"
                          required
                          value={block.data.text || ""}
                          onChange={(e) => updateBlockData(block.id, "text", e.target.value)}
                          placeholder="Subheading text..."
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 focus:border-zinc-950 dark:focus:border-zinc-300"
                        />
                      )}
                      {block.type === "paragraph" && (
                        <textarea
                          required
                          value={block.data.text || ""}
                          onChange={(e) => updateBlockData(block.id, "text", e.target.value)}
                          placeholder="Paragraph content..."
                          rows={3}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 focus:border-zinc-950 dark:focus:border-zinc-300 resize-y"
                        />
                      )}
                      {block.type === "image" && (
                        <input
                          type="url"
                          required
                          value={block.data.url || ""}
                          onChange={(e) => updateBlockData(block.id, "url", e.target.value)}
                          placeholder="Image URL (e.g. https://example.com/image.png)..."
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm font-mono text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 focus:border-zinc-950 dark:focus:border-zinc-300"
                        />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Block Control Panel */}
            <div className="flex flex-col gap-2 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-zinc-50/50 dark:bg-zinc-900/20 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 select-none">
                + Add Block
              </span>
              <div className="flex flex-wrap justify-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => addBlock("heading")}
                  className="px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer text-zinc-700 dark:text-zinc-300"
                >
                  Heading
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("subheading")}
                  className="px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer text-zinc-700 dark:text-zinc-300"
                >
                  Subheading
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("paragraph")}
                  className="px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer text-zinc-700 dark:text-zinc-300"
                >
                  Paragraph
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("image")}
                  className="px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer text-zinc-700 dark:text-zinc-300"
                >
                  Image
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
