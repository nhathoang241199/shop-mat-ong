import { prisma } from "@/lib/prisma";
import { ShopPage } from "@/components/shop-page";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <ShopPage
      products={products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        unit: p.unit,
        category: p.category,
        image: p.image,
        tag: p.tag,
        desc: p.desc,
      }))}
    />
  );
}
