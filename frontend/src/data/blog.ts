export interface Block {
  type:
    | "heading"
    | "paragraph"
    | "subheading"
    | "image"
    | "quote"
    | "code"
    | "divider";

  text?: string;
  src?: string;
  alt?: string;
  code?: string;
  language?: string;
  author?: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  coverImage: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  readTime: string;
  blocks: Block[];
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "Getting Started with React",
    slug: "getting-started-react",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200",
    excerpt:
      "Learn the fundamentals of React and build modern web applications.",
    author: "Ashish Nayak",
    publishedDate: "July 2, 2026",
    readTime: "5 min read",

    blocks: [
      {
        type: "heading",
        text: "Getting Started with React",
      },
      {
        type: "paragraph",
        text:
          "React is one of the most popular JavaScript libraries for building modern user interfaces.",
      },
      {
        type: "image",
        src:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200",
        alt: "React",
      },
      {
        type: "subheading",
        text: "Why React?",
      },
      {
        type: "paragraph",
        text:
          "React lets you build reusable UI components and efficiently update the DOM.",
      },
      {
        type: "quote",
        text: "Learn once, write anywhere.",
        author: "React Team",
      },
    ],
  },

  {
    id: 2,
    title: "Mastering Next.js",
    slug: "mastering-nextjs",
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
    excerpt:
      "Everything you need to know about Next.js App Router and Server Components.",
    author: "Ashish Nayak",
    publishedDate: "July 1, 2026",
    readTime: "8 min read",

    blocks: [
      {
        type: "heading",
        text: "Mastering Next.js",
      },
      {
        type: "paragraph",
        text:
          "Next.js extends React with routing, server rendering, and powerful optimizations.",
      },
      {
        type: "subheading",
        text: "App Router",
      },
      {
        type: "paragraph",
        text:
          "The App Router introduces layouts, nested routing, and React Server Components.",
      },
    ],
  },

  {
    id: 3,
    title: "Tailwind CSS Tips",
    slug: "tailwind-css-tips",
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
    excerpt:
      "Build beautiful interfaces faster with Tailwind CSS utility classes.",
    author: "Ashish Nayak",
    publishedDate: "June 28, 2026",
    readTime: "6 min read",

    blocks: [
      {
        type: "heading",
        text: "Tailwind CSS Tips",
      },
      {
        type: "paragraph",
        text:
          "Tailwind CSS makes styling incredibly productive using utility-first classes.",
      },
      {
        type: "subheading",
        text: "Utility First",
      },
      {
        type: "paragraph",
        text:
          "Compose designs directly inside your markup without writing traditional CSS.",
      },
    ],
  },
];