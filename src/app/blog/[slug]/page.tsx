import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogPostPage } from "@/components/blog-post-page";

export const dynamic = "force-dynamic";

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findFirst({
    where: { slug, published: true },
  });
  if (!post) notFound();

  return (
    <BlogPostPage
      post={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        image: post.image,
        readTime: post.readTime,
        publishedAt: post.publishedAt.toISOString(),
      }}
    />
  );
}
