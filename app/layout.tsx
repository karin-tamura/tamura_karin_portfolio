// app/layout.tsx
import './globals.css' // ← グローバルCSSがある場合のみ

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
