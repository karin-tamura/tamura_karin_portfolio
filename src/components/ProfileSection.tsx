import Image from "next/image"

export function ProfileSection() {
  return (
    <section className="my-24 px-6 text-center">
      {/* 見出し */}
      <h2 className="text-3xl font-bold mb-10 tracking-wide text-gray-900">
        ABOUT ME
      </h2>

      {/* プロフィール画像 */}
      <Image
        src="/profile.jpg"
        alt="プロフィール画像"
        width={160}
        height={160}
        className="rounded-full mx-auto mb-6 shadow-lg border-4 border-white"
      />

      {/* 名前 */}
      <h3 className="text-2xl font-semibold text-gray-800">田村華鈴</h3>

      {/* 自己紹介文 */}
      <p className="mt-6 text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto whitespace-pre-line font-medium">
        平成13年10月13日、島生まれ、島育ちの見習いエンジニアの華鈴と申します。<br />
        新卒では故郷の町役場で税務課職員として課税業務をしておりました。<br />
        しかし、業務の中で、DX化に追い付くことができず、損をしてしまう高齢者の存在を見聞きし、<br />
        サービスを使う側ではなく作る側になりたいと思い、転職を決意しました。<br />
        社会学の知識を活かし、クライアントに寄り添った制作のできるエンジニアを目指しています。
      </p>
    </section>
  )
}
