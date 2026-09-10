import { prisma } from "@/lib/prisma";
import { BlogListPage } from "@/components/blog-list-page";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <BlogListPage
      posts={posts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category,
        author: p.author,
        image: p.image,
        readTime: p.readTime,
        publishedAt: p.publishedAt.toISOString(),
      }))}
    />
  );
}
