export function Achievements() {
  const achievements = [
    { year: "2018 Jul.", description: "第11回 書道パフォーマンス甲子園 出場" },
    { year: "2020 Apr.", description: "福岡県立大学 人間社会学部 公共社会学科 地域社会学専攻" },
    { year: "2024 Mar.", description: "福岡県立大学 人間社会学部 公共社会学科 卒業" },
    { year: "2024 Apr.", description: "上五島町町役場 首席入庁 税務課にて課税業務を担当" },
    { year: "2024 Aug.", description: "上五島町町役場 一身上の都合により退職" },
    { year: "2024 Dec.", description: "Ms,Engineer 入学" },
    { year: "2025 Sep.", description: "Ms.Engineer 卒業" },
  ];

  return (
    <section className="my-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">ACHIEVEMENTS</h2>

      <div className="bg-white shadow-md rounded-xl p-8">
        <div className="relative pl-10 border-l-2 border-dotted border-gray-400">
          {achievements.map((item, index) => (
            <div key={index} className="relative mb-10">
              {/* ● ドット */}
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-gray-800 rounded-full z-10"></div>

              {/* テキスト */}
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
