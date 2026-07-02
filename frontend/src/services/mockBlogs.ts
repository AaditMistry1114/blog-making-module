export interface Block {
  id: string;
  type: "heading" | "paragraph" | "image" | "subheading";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  blocks: Block[];
}

export const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "The Future of Web Design with CSS v4",
    slug: "future-of-web-design-css-v4",
    excerpt: "Explore how Tailwind CSS v4 and native CSS features are redefining the way we style and layout modern, premium web applications.",
    category: "Design",
    publishedAt: "July 2, 2026",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    blocks: [
      {
        id: "b1-1",
        type: "heading",
        data: { text: "Embracing a New Era of Styling" }
      },
      {
        id: "b1-2",
        type: "paragraph",
        data: { text: "Styling web applications has undergone massive shifts over the last decade. From inline styles to preprocessors like SASS, and then the utility-first revolution spearheaded by Tailwind CSS. Today, with CSS v4 and Next.js, we are seeing a convergence of native browser capabilities and developer-friendly abstractions." }
      },
      {
        id: "b1-3",
        type: "image",
        data: { url: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&q=80&w=800" }
      },
      {
        id: "b1-4",
        type: "subheading",
        data: { text: "Why Utility Classes Still Rule" }
      },
      {
        id: "b1-5",
        type: "paragraph",
        data: { text: "Utility-first frameworks allow developers to style elements without leaving their HTML or component files. This leads to incredibly fast iteration cycles and prevents stylesheets from ballooning as projects grow. Combined with custom Tailwind theme overrides, it is simpler than ever to craft custom design systems that feel unique, polished, and performant." }
      }
    ]
  },
  {
    id: "2",
    title: "Designing for the Dark Mode Era",
    slug: "designing-for-dark-mode-era",
    excerpt: "A deep dive into color harmony, contrast control, and dynamic transitions to make your application look breathtaking in low-light environments.",
    category: "Aesthetics",
    publishedAt: "June 28, 2026",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=800",
    blocks: [
      {
        id: "b2-1",
        type: "heading",
        data: { text: "More Than Just Inverting Colors" }
      },
      {
        id: "b2-2",
        type: "paragraph",
        data: { text: "Designing a high-end dark mode is not as simple as swapping white for black and black for white. Doing so often leads to harsh, high-contrast layouts that strain the eyes. Instead, premium dark modes employ deep greys, subtle slate hues, and lower-intensity primary accents to maintain a smooth, readable, and aesthetic workspace." }
      },
      {
        id: "b2-3",
        type: "image",
        data: { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" }
      },
      {
        id: "b2-4",
        type: "subheading",
        data: { text: "Color Harmonies and Gray Tones" }
      },
      {
        id: "b2-5",
        type: "paragraph",
        data: { text: "In this blog, we talk about using zinc or slate palettes. By leaning on semantic colors like zinc-900 for card backgrounds and zinc-950 for the canvas background, we establish depth. We can use gradients and micro-shadows to define borders and make the elements pop in a elegant, modern dark mode experience." }
      }
    ]
  },
  {
    id: "3",
    title: "Building Fast & Fluid User Experiences",
    slug: "building-fast-fluid-ux",
    excerpt: "Learn the secrets of layout stability, micro-animations, and instant navigation transitions using Next.js App Router.",
    category: "UX",
    publishedAt: "June 15, 2026",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    blocks: [
      {
        id: "b3-1",
        type: "heading",
        data: { text: "The Psychology of Speed" }
      },
      {
        id: "b3-2",
        type: "paragraph",
        data: { text: "Users expect interfaces to react instantly. When a click action feels delayed, even by a fraction of a second, the perceived quality of the entire application drops. Next.js App Router uses server components and route prefetching to render pages before the user even clicks the link, bringing standard site speed down to milliseconds." }
      },
      {
        id: "b3-3",
        type: "subheading",
        data: { text: "Fostering Delight with Micro-animations" }
      },
      {
        id: "b3-4",
        type: "paragraph",
        data: { text: "Adding subtle scale transforms, smooth opacity transitions, and interactive active states turns a rigid static page into an experience that feels alive and tactile. A card that rises slightly on hover, or a link that draws an underline, prompts user interaction and builds delightful muscle memory." }
      }
    ]
  }
];
