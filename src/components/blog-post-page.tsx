import Link from "next/link";
import { Logo } from "@/components/logo";
import { ContactFloatButtons } from "@/components/contact-float-buttons";
import { formatBlogDate, renderBlogContent, type BlogPost } from "@/lib/blog";

export function BlogPostPage({ post }: { post: BlogPost }) {
  const blocks = renderBlogContent(post.content);

  return (
    <div className="min-h-screen" style={{ background: "#fdf8f0" }}>
      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: "rgba(253,248,240,0.95)", backdropFilter: "blur(12px)", borderColor: "#e8d9c0" }}
      >
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
            style={{ color: "#9a7d5a" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Blog
          </Link>
          <span style={{ color: "#e8d9c0" }}>/</span>
          <span className="text-xs truncate" style={{ color: "#c8b89a" }}>
            {post.title}
          </span>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "#fff8ed", color: "#c47c1a" }}>
            {post.category}
          </span>
        </div>
        <h1
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(1.7rem, 4vw, 2.5rem)",
            fontWeight: 300,
            color: "#2c1f0e",
            lineHeight: 1.2,
          }}
        >
          {post.title}
        </h1>
        <div className="flex items-center gap-4 mt-4 mb-8 text-xs" style={{ color: "#9a7d5a" }}>
          <span>{post.author}</span>
          <span style={{ color: "#e8d9c0" }}>·</span>
          <span>{formatBlogDate(post.publishedAt)}</span>
          <span style={{ color: "#e8d9c0" }}>·</span>
          <span>{post.readTime} phút đọc</span>
        </div>
        <div className="rounded-2xl overflow-hidden mb-10" style={{ aspectRatio: "16/8", background: "#f5ede0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-2">
          {blocks.map((block) => {
            if (block.type === "h3") {
              return (
                <h3
                  key={block.key}
                  style={{
                    fontFamily: "Fraunces, serif",
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    color: "#2c1f0e",
                    marginTop: "1.75rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {block.text}
                </h3>
              );
            }
            if (block.type === "spacer") {
              return <div key={block.key} style={{ height: "0.5rem" }} />;
            }
            return (
              <p key={block.key} style={{ color: "#5a4230", lineHeight: 1.8, fontSize: "0.95rem" }}>
                {block.text}
              </p>
            );
          })}
        </div>
      </article>

      <div className="border-t mt-12 py-8 px-4 text-center" style={{ borderColor: "#e8d9c0" }}>
        <Logo />
        <div className="mt-4 flex items-center justify-center gap-4">
          <Link href="/blog" className="text-xs font-semibold" style={{ color: "#c47c1a" }}>
            ← Tất cả bài viết
          </Link>
          <span style={{ color: "#e8d9c0" }}>·</span>
          <Link href="/" className="text-xs font-semibold" style={{ color: "#9a7d5a" }}>
            Cửa hàng
          </Link>
        </div>
      </div>
      <ContactFloatButtons />
    </div>
  );
}
