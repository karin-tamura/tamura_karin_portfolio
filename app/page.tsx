import Hero from "@/components/Hero"
import { ProfileSection } from "@/components/ProfileSection"
import { SkillsSection } from "@/components/SkillsSection"
import { Achievements } from "@/components/Achievements"

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-6">
      <Hero />
      <ProfileSection />
      <SkillsSection />
      <Achievements />
    </main>
  )
}
