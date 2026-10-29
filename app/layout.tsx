import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Short Link",
  description: "Rút gọn link, chuyển hướng 302",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
