export function Achievements() {
  const achievements = [
    {
      year: "2018年",
      description: "第11回 書道パフォーマンス甲子園 出場（チームワーク力）",
    },
    {
      year: "2020年〜2024年",
      description: "福岡県立大学 公共社会学専攻にて地域行政・住民参画を研究",
    },
    {
      year: "2024年4月〜8月",
      description:
        "上五島町役場 税務課にて住民対応と課税業務を経験（説明力）",
    },
    {
      year: "2024年12月",
      description: "Ms.Engineer 加入。エンジニアとしてのキャリア再構築に挑戦（行動力に自信あり）",
    },
    {
      year: "2025年6月",
      description: "Next.js＋Express＋Prisma による家計簿管理アプリケーションを開発",
    },
  ];

  return (
    <section className="my-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">ACHIEVEMENTS</h2>

      <div className="bg-white shadow-md rounded-xl p-8">
        <div className="relative pl-10 border-l-2 border-dotted border-gray-400">
          {achievements.map((item, index) => (
            <div key={index} className="relative mb-10">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-gray-800 rounded-full z-10"></div>

              <div className="ml-4">
                <p className="text-black font-bold text-base">{item.year}</p>
                <p className="text-gray-800 text-sm mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
