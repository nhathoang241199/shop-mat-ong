import { prisma } from "@/lib/prisma";
import { ShopPage } from "@/components/shop-page";
import { effectivePrice, getPromotion } from "@/lib/promotion";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const promotion = getPromotion();
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <ShopPage
      products={products.map((p) => ({
        id: p.id,
        name: p.name,
        price: effectivePrice(p.price),
        unit: p.unit,
        category: p.category,
        image: p.image,
        tag: p.tag ?? (promotion ? `Giảm ${promotion.discountPercent}%` : null),
        desc: p.desc,
      }))}
    />
  );
}
