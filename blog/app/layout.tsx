import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationHeader from "@/components/layout/NavigationHeader";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | 我的博客",
    default: "我的博客 - 分享技术与思考",
  },
  description: "一个使用 Next.js 和 Supabase 构建的个人博客系统",
  keywords: ["博客", "技术", "Next.js", "React", "Supabase"],
  authors: [{ name: "博主", url: "https://yourblog.com" }],
  openGraph: {
    title: "我的博客",
    description: "分享技术与思考的个人博客",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh-CN' className='custom-scrollbar'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <div className='min-h-screen flex flex-col bg-gray-50 text-gray-900 '>
            <NavigationHeader />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
