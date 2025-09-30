// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My Portfolio Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen">
        {/* ふわふわ装飾（水色） */}
        <div className="w-full h-16 bg-sky-100 relative overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,64L60,96C120,128,240,192,360,186.7C480,181,600,107,720,96C840,85,960,139,1080,170.7C1200,203,1320,213,1380,218.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        </div>

        {/* コンテンツ */}
        <main className="flex-1">{children}</main>

        {/* フッター */}
        <footer className="w-full bg-white py-10 flex flex-col items-center border-t">
          <Image
            src="/docs/dog-cat-line.png" // publicフォルダに保存したファイル
            alt="Dog and Cat illustration"
            width={800} // 横に広げて見やすく
            height={300}
            className="opacity-80 max-w-full h-auto"
          />
          <p className="text-sm text-gray-500 mt-4">
            © 2025 Karin Tamura. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
