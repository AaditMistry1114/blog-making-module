import { Block } from "./blog.types";

export interface CreateBlogDto {
  title: string;
  excerpt: string;
  coverImage: string;
  published: boolean;
  blocks: Block[];
}

export interface UpdateBlogDto {
  title?: string;
  excerpt?: string;
  coverImage?: string;
  published?: boolean;
  blocks?: Block[];
}