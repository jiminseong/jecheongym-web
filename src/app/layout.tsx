import type { Metadata } from "next";
import { Noto_Sans_KR, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const nanumPen = Nanum_Pen_Script({
  variable: "--font-nanum-pen",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "제천남여헬스장 | Serious Training Only",
  description: "A gym for those who train properly. No distractions. Just weights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} ${nanumPen.variable}`}>{children}</body>
    </html>
  );
}
