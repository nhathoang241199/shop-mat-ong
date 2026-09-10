import { PrismaClient } from "@prisma/client";
import { SAMPLE_POSTS } from "../src/lib/blog";

const prisma = new PrismaClient();

const PRODUCTS = [
  {
    name: "Mật Ong Rừng Tràm Phan Thiết",
    price: 320_000,
    unit: "hũ 500g",
    category: "Mật ong",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=700&fit=crop&auto=format",
    tag: "Bán chạy",
    desc: "Thu hoạch từ rừng tràm ven biển Phan Thiết, vị nhẹ thanh, màu vàng óng.",
  },
  {
    name: "Mật Ong Hoa Cà Phê",
    price: 280_000,
    unit: "hũ 500g",
    category: "Mật ong",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&h=700&fit=crop&auto=format",
    desc: "Ong nuôi trên vùng điều Bình Thuận, mật sánh, hương thơm đặc trưng.",
  },
  {
    name: "Mật Ong Hoa Thanh Long",
    price: 240_000,
    unit: "hũ 500g",
    category: "Mật ong",
    image: "https://images.unsplash.com/photo-1536788567643-8c2368376526?w=600&h=700&fit=crop&auto=format",
    tag: "Mới",
    desc: "Đặc sản riêng của Phan Thiết, thu từ hoa thanh long mùa nở rộ tháng 5-8.",
  },
  {
    name: "Sáp Ong Nguyên Chất",
    price: 180_000,
    unit: "bánh 200g",
    category: "Sản phẩm ong",
    image: "https://images.unsplash.com/photo-1760539071384-68a233a4da46?w=600&h=700&fit=crop&auto=format",
    desc: "Sáp ong tươi, dùng dưỡng môi, nấu ăn hoặc làm nến thiên nhiên.",
  },
  {
    name: "Nghệ Tươi Hữu Cơ",
    price: 45_000,
    unit: "kg",
    category: "Nông sản",
    image: "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=600&h=700&fit=crop&auto=format",
    desc: "Nghệ trồng theo phương pháp hữu cơ, củ to, hàm lượng curcumin cao.",
  },
  {
    name: "Thanh Long Ruột Đỏ",
    price: 55_000,
    unit: "kg",
    category: "Nông sản",
    image: "https://images.unsplash.com/photo-1599940859674-a7fef05b94ae?w=600&h=700&fit=crop&auto=format",
    desc: "Thanh long Bình Thuận VietGAP, ruột đỏ tươi, ngọt tự nhiên, thu hái đúng độ chín.",
  },
  {
    name: "Nha Đam Phan Thiết",
    price: 60_000,
    unit: "kg",
    category: "Nông sản",
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=600&h=700&fit=crop&auto=format",
    tag: "Tươi hôm nay",
    desc: "Nha đam tươi trồng tại Phan Thiết, to mập, gel dày, dùng làm đồ uống hoặc dưỡng da.",
  },
  {
    name: "Hành Tím Phan Thiết",
    price: 40_000,
    unit: "kg",
    category: "Nông sản",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600&h=700&fit=crop&auto=format",
    desc: "Hành tím Phan Thiết nổi tiếng cay thơm, củ chắc, phơi khô tự nhiên.",
  },
];

async function main() {
  const count = await prisma.product.count();
  if (count === 0) {
    await prisma.product.createMany({ data: PRODUCTS });
    console.log(`Seeded ${PRODUCTS.length} products`);
  } else {
    console.log(`Skip products: ${count} already exist`);
  }

  const postCount = await prisma.post.count();
  if (postCount === 0) {
    await prisma.post.createMany({
      data: SAMPLE_POSTS.map((p) => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category,
        author: p.author,
        image: p.image,
        readTime: p.readTime,
        publishedAt: p.publishedAt,
        published: true,
      })),
    });
    console.log(`Seeded ${SAMPLE_POSTS.length} posts`);
  } else {
    console.log(`Skip posts: ${postCount} already exist`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
