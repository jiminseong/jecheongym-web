import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

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
  metadataBase: new URL("https://jecheongym-web.vercel.app"),
  title: "제천남여헬스장 | Serious Training Only",
  description:
    "제천 유일의 하이엔드 웨이트 전문 헬스장. 아스널 스트렝스, 해머 스트렝스 등 최고의 기구 라인업.",
  openGraph: {
    title: "제천남여헬스장 | Serious Training Only",
    description:
      "제천 유일의 하이엔드 웨이트 전문 헬스장. 아스널 스트렝스, 해머 스트렝스 등 최고의 기구 라인업.",
    url: "https://jecheongym-web.vercel.app",
    siteName: "제천남여헬스장",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "제천남여헬스장 - Serious Training Only",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "제천남여헬스장 | Serious Training Only",
    description: "제천 유일의 하이엔드 웨이트 전문 헬스장. 최고의 훈련 환경을 제공합니다.",
    images: ["/og-image.png"],
  },
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
