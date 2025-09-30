"use client";
import { ExternalLink, PlayCircle } from "lucide-react";

export function WorksAndAchievements() {
  const achievements = [
    {
      year: "2020年〜2024年",
      description: "福岡県立大学 公共社会学専攻にて女性キャリア論を研究",
    },
    {
      year: "2024年4月〜8月",
      description: "上五島町役場 税務課にて住民対応と課税業務を経験",
    },
    {
      year: "2024年12月～2025年9月",
      description: "Ms.Engineerにて、エンジニアとしての基礎知識を習得",
    },
  ];

  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold text-gray-900 tracking-wide mb-12 uppercase inline-block">
        WORKS & ACHIEVEMENTS
      </h2>

      <div className="relative left-1/2 -mx-[50vw] w-screen">
        <div className="mx-auto max-w-[1600px] px-[6vw]">
          {/* 2列レイアウト */}
          <div className="grid gap-8 md:grid-cols-2 text-left">
            {/* 左：LATEST WORKS */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-bold mb-4">LATEST WORKS</h3>
              <h4 className="text-lg font-semibold">
                仙台市病児保育検索アプリ
              </h4>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                仙台市在住ユーザーが病児保育施設を簡単に検索・申込できるように設計しました。
                UI/UXをリードし、TypeScriptと自動テストを導入することで、
                信頼できる開発体制を実現しました。
              </p>

              <ul className="mt-4 list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Next.js / Express / Prisma / Firebase Authentication</li>
                <li>アプリのフロントエンドリーダーとしてUIを主導</li>
                <li>E2EテストにPlaywrightを導入し品質保証を実現</li>
              </ul>

              {/* 📂 リンク集 */}
              <div className="mt-6 flex gap-3 justify-center md:justify-start flex-wrap">
                <a
                  href="https://www.canva.com/design/DAGxziJS9jg/view?utm_content=DAGxziJS9jg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border hover:shadow transition text-sm"
                >
                  <PlayCircle size={18} /> デモスライドを見る
                </a>

                <a
                  href="https://github.com/karin-tamura/sendai-sick-childcare-search"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border hover:shadow transition text-sm"
                >
                  <ExternalLink size={18} /> リポジトリ
                </a>

                {/* ★ Figmaリンク */}
                <a
                  href="https://www.figma.com/design/AyXuyDvkMtwpfKaWiYwiwr/%E7%97%85%E5%85%90%E4%BF%9D%E8%82%B2%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88?node-id=0-1&t=RWh6EzyBTHPq0gkp-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border hover:shadow transition text-sm"
                >
                  <ExternalLink size={18} /> Figmaデザインを見る
                </a>
              </div>
            </div>

            {/* 右：ACHIEVEMENTS */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-bold mb-4">ACHIEVEMENTS</h3>
              <div className="relative pl-10 border-l-2 border-dotted border-gray-400">
                {achievements.map((item, index) => (
                  <div key={index} className="relative mb-8">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-gray-800 rounded-full z-10"></div>
                    <div className="ml-4">
                      <p className="text-black font-bold text-sm">
                        {item.year}
                      </p>
                      <p className="text-gray-800 text-xs mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
