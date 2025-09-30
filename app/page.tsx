// app/page.tsx
import Hero from "@/components/Hero";
import { ProfileSection } from "@/components/ProfileSection";
import { SkillsSection } from "@/components/SkillsSection";
import { WorksAndAchievements } from "@/components/WorksAndAchievements";

// ← ふわふわ装飾（ページ最上部・フルブリード）
function TopWave() {
  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 bg-sky-100">
      {/* 上部の余白（高さはお好みで） */}
      <div className="mx-auto max-w-[1600px] h-10" />
      {/* 下辺の波（ふわふわ） */}
      <svg
        className="block w-full h-16 text-white"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0V27.35C93.73,75,192.6,49.69,321.39,56.49
             c58.43,13.79,111.8,37.72,168.42,48.07
             c118.09,21.62,233.81-25.27,351.25-37.25
             C944.93,56.22,1055.15,64.09,1156.29,98.38
             L1200,113.77V0Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <main className="px-6 relative z-10">
        <Hero />
        <ProfileSection />
        <SkillsSection />
        <WorksAndAchievements />
      </main>
    </>
  );
}
