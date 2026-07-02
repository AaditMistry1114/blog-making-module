// src/types/blog.types.ts

export type BlockType =
  | "heading"
  | "subheading"
  | "paragraph"
  | "image"
  | "quote"
  | "code"
  | "divider";

export interface Block {
  id: string;
  type: BlockType;
  data: Record<string, unknown>;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  blocks: Block[];
}