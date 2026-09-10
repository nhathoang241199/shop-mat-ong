"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ContactFloatButtons } from "@/components/contact-float-buttons";
import { BLOG_CATEGORIES, formatBlogDate, type BlogPost } from "@/lib/blog";

function PostCard({ post, featured }: { post: BlogPost; featured?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`rounded-2xl overflow-hidden flex flex-col transition-shadow ${featured ? "sm:col-span-2" : ""}`}
      style={{
        background: "#fff",
        border: "1px solid #e8d9c0",
        boxShadow: hovered ? "0 8px 32px rgba(196,124,26,0.10)" : "0 1px 4px rgba(44,31,14,0.05)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden" style={{ aspectRatio: featured ? "16/7" : "16/10", background: "#f5ede0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#fff8ed", color: "#c47c1a" }}>
            {post.category}
          </span>
          <span className="text-xs" style={{ color: "#c8b89a" }}>
            {post.readTime} phút đọc
          </span>
        </div>
        <h2
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: featured ? "1.35rem" : "1.05rem",
            fontWeight: 400,
            color: "#2c1f0e",
            lineHeight: 1.3,
            flex: 1,
          }}
        >
          {post.title}
        </h2>
        <p className="text-xs mt-2 leading-relaxed line-clamp-2" style={{ color: "#9a7d5a" }}>
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: "#f0e8d8" }}>
          <div className="text-xs" style={{ color: "#c8b89a" }}>
            <span>{post.author}</span>
            <span className="mx-1.5" style={{ color: "#e8d9c0" }}>
              ·
            </span>
            <span>{formatBlogDate(post.publishedAt)}</span>
          </div>
          <span className="text-xs font-semibold" style={{ color: hovered ? "#c47c1a" : "#9a7d5a" }}>
            Đọc tiếp →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogListPage({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const filtered = useMemo(
    () => (activeCategory === "Tất cả" ? posts : posts.filter((p) => p.category === activeCategory)),
    [activeCategory, posts],
  );

  return (
    <div className="min-h-screen" style={{ background: "#fdf8f0" }}>
      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: "rgba(253,248,240,0.95)", backdropFilter: "blur(12px)", borderColor: "#e8d9c0" }}
      >
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
            style={{ color: "#9a7d5a" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Cửa hàng
          </Link>
          <div>
            <span style={{ fontFamily: "Fraunces, serif", fontSize: "1.1rem", fontWeight: 600, color: "#2c1f0e" }}>
              Mật Ong
            </span>
            <span style={{ fontFamily: "Fraunces, serif", fontSize: "1.1rem", fontWeight: 300, color: "#c47c1a" }}>
              {" "}
              Blog
            </span>
          </div>
          <div style={{ width: 80 }} />
        </div>
      </header>

      <section className="border-b py-14 px-4 text-center" style={{ borderColor: "#e8d9c0", background: "#fff" }}>
        <p className="text-xs font-semibold tracking-[0.22em] uppercase mb-3" style={{ color: "#c47c1a" }}>
          Kiến thức & Câu chuyện
        </p>
        <h1
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 300,
            color: "#2c1f0e",
            lineHeight: 1.15,
          }}
        >
          Từ tổ ong đến
          <br />
          <em>bàn ăn của bạn</em>
        </h1>
        <p className="mt-4 text-sm max-w-sm mx-auto leading-relaxed" style={{ color: "#9a7d5a" }}>
          Chia sẻ kiến thức về mật ong, nông sản sạch và những câu chuyện từ vùng đất Phan Thiết.
        </p>
      </section>

      <div className="border-b" style={{ borderColor: "#e8d9c0", background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto py-3">
          {BLOG_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategory(c)}
              className="shrink-0 px-4 py-1.5 text-xs font-semibold rounded-full"
              style={{
                background: activeCategory === c ? "#c47c1a" : "transparent",
                color: activeCategory === c ? "#fff" : "#9a7d5a",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <p className="text-center py-16 text-sm" style={{ color: "#c8b89a" }}>
            Chưa có bài viết nào trong chủ đề này.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} featured={i === 0 && activeCategory === "Tất cả"} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t py-8 px-4 text-center" style={{ borderColor: "#e8d9c0" }}>
        <Logo />
        <Link href="/" className="inline-block mt-4 text-xs font-semibold" style={{ color: "#c47c1a" }}>
          ← Về trang cửa hàng
        </Link>
      </footer>
      <ContactFloatButtons />
    </div>
  );
}
