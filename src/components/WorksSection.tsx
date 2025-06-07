import Image from "next/image";

const works = [
  {
    title: "家計簿アプリ",
    category: "Design / Development / Firebase",
    image: "/works/kakeibo.png", // public/works/kakeibo.png に配置
  },
  {
    title: "プロフィールサイト",
    category: "Next.js / TailwindCSS",
    image: "/works/profile.png",
  },
  {
    title: "観光PRサイト",
    category: "React / UI Design",
    image: "/works/tourism.png",
  },
  {
    title: "行政相談窓口",
    category: "UX / DX推進",
    image: "/works/dx_support.png",
  },
];

export function WorksSection() {
  return (
    <section className="my-24 px-6 text-center">
      <h2 className="text-3xl font-bold mb-10 tracking-wide text-gray-900">WORKS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {works.map((work) => (
          <div key={work.title} className="bg-white shadow-md rounded-md overflow-hidden text-left">
            <div className="relative w-full h-48">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{work.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{work.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
