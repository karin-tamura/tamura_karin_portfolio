import { Card, CardContent } from '@/components/ui/card'

const skills = ['TypeScript', 'Next.js', 'Tailwind CSS', 'Firebase', 'Prisma']

export function SkillsSection() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">スキル</h2>
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li key={skill} className="bg-muted px-3 py-1 rounded-full text-sm">
              {skill}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
