import { MonitorSmartphone, Server, Database, Settings, CheckCircle2, Wrench } from "lucide-react";

export function SkillsSection() {
  const skillGroups = [
    {
      category: "フロントエンド",
      icon: <MonitorSmartphone className="w-5 h-5 text-gray-700" />,
      comment: "React / Next.js を中心にUIを構築しています。",
      skills: [
        { name: "TypeScript", description: "型安全なフロントエンド開発を支える言語" },
        { name: "React", description: "コンポーネント志向でUIを効率的に構築" },
        { name: "Next.js", description: "App Router対応、ルーティングやSSRも可能" },
        { name: "Tailwind CSS", description: "ユーティリティベースのスタイリング" },
        { name: "Chakra UI", description: "コンポーネントUIライブラリによる迅速なUI構築" },
        { name: "SWR", description: "React用のデータフェッチライブラリ" },
      ],
    },
    {
      category: "バックエンド / API",
      icon: <Server className="w-5 h-5 text-gray-700" />,
      comment: "Express + Prisma によるREST API設計・実装",
      skills: [
        { name: "Express", description: "Node.jsフレームワークでREST API実装" },
        { name: "Prisma ORM", description: "型安全なORMでDB操作" },
        { name: "Prisma Migrate", description: "マイグレーションファイル管理と実行" },
        { name: "express-validator", description: "入力値のバリデーションとエラー制御" },
        { name: "API仕様書", description: "Markdown / OpenAPI形式で設計を管理" },
      ],
    },
    {
      category: "データベース",
      icon: <Database className="w-5 h-5 text-gray-700" />,
      comment: "MySQLとSQLiteを用途に応じて使い分けています。",
      skills: [
        { name: "MySQL", description: "本番用DB。Prismaと連携" },
        { name: "SQLite", description: "テスト用インメモリDB。Prismaと連携" },
        { name: "正規化設計", description: "リレーションを考慮したDB設計" },
      ],
    },
    {
      category: "アーキテクチャ / 環境構成",
      icon: <Settings className="w-5 h-5 text-gray-700" />,
      comment: "Dockerや環境変数管理で拡張性ある構成に。",
      skills: [
        { name: "Docker Compose", description: "Next.js + Express + DBを一括構成" },
        { name: ".env", description: "環境変数による設定切替" },
        { name: "json-server", description: "モックAPIとして導入、フェッチ可能" },
        { name: "ポート分離構成", description: "Next.jsとExpressを別ポートで実行" },
      ],
    },
    {
      category: "テスト / CI",
      icon: <CheckCircle2 className="w-5 h-5 text-gray-700" />,
      comment: "単体・E2E・CIを想定した構成を採用。",
      skills: [
        { name: "Vitest", description: "ユニットテスト用ライブラリ" },
        { name: "Supertest", description: "Express APIの正常・異常系テスト" },
        { name: "CI導入想定", description: "GitHub Actions等でテスト実行可能な構成" },
      ],
    },
    {
      category: "開発環境 / 補助ツール",
      icon: <Wrench className="w-5 h-5 text-gray-700" />,
      comment: "コード品質と効率的な開発を支援するツール群。",
      skills: [
        { name: "ESLint / Prettier", description: "Airbnbルールで整形・統一" },
        { name: "VSCode拡張", description: "Lint・補完支援に連携" },
        { name: "OpenAPI形式", description: "API設計管理（YAML / Markdown）" },
      ],
    },
  ];

  return (
    <section className="my-20 px-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 tracking-wide mb-12 uppercase">
        SKILL
      </h2>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto text-left">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="bg-white rounded-xl shadow p-6 border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-1">
              {group.icon}
              <h3 className="text-lg font-semibold text-gray-800">
                {group.category}
              </h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">{group.comment}</p>
            <ul className="space-y-2">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <div className="font-medium text-gray-700">{skill.name}</div>
                  <div className="text-sm text-gray-500">{skill.description}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
