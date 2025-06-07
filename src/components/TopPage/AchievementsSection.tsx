import { Card, CardContent } from '@/components/ui/card'

const achievements = [
  '書道甲子園 出場（高校生）',
  '福岡県立大学 人間社会学部 公共社会学科 入学',
  '卒論：女性リーダーの社会進出と地方創生',
  '故郷の町役場で税務課 税務班に所属',
  'MsEにてポートフォリオ開発完了',
]

export function AchievementsSection() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">実績</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm">
          {achievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
