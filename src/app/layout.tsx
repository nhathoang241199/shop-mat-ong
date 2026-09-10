import type { Metadata } from "next";
import { CartProvider } from "@/components/cart-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mật Ong Phan Thiết",
  description: "Mật ong & nông sản sạch từ Phan Thiết, Bình Thuận",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
