import { Card, CardContent } from '@/components/ui/card'

export function ProfileCard() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-2">田村華鈴</h2>
        <p className="text-sm text-muted-foreground">元地方公務員 / フルスタックエンジニア希望</p>
        <p className="mt-4 text-sm">
          地域と女性の未来をデザインする、女性エンジニアを目指します
        </p>
      </CardContent>
    </Card>
  )
}
