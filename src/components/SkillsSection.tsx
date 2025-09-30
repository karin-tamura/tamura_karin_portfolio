// src/components/SkillsSection.tsx
import type { ReactNode } from "react";
import {
  MonitorSmartphone,
  Server,
  Database,
  Settings,
  CheckCircle2,
  Wrench,
  KeyRound,
  Rocket,
} from "lucide-react";

// ---------- 型定義 ----------
type Skill = {
  name: string;
  description: string;
};

type SkillGroup = {
  category: string;
  icon: ReactNode;
  comment: string;
  skills: Skill[];
};

// ---------- データ ----------
const skillGroups = [
  {
    category: "フロントエンド",
    icon: <MonitorSmartphone className="w-5 h-5 text-gray-700" />,
    comment: "React / Next.js を中心にUIを構築しています。",
    skills: [
      {
        name: "TypeScript",
        description: "型安全なフロントエンド開発を支える言語",
      },
      { name: "React", description: "コンポーネント志向でUIを効率的に構築" },
      {
        name: "Next.js",
        description: "App Router対応、ルーティングやSSRも可能",
      },
      {
        name: "Tailwind CSS",
        description: "ユーティリティベースのスタイリング",
      },
      {
        name: "Chakra UI / shadcn/ui",
        description: "UIコンポーネントライブラリによる迅速な開発",
      },
      { name: "lucide-react", description: "アイコンライブラリ" },
      { name: "framer-motion", description: "リッチなアニメーション実装" },
      {
        name: "react-hook-form + Zod",
        description: "型安全なフォーム管理 & バリデーション",
      },
      { name: "SWR", description: "React用のデータフェッチライブラリ" },
      {
        name: "アクセシビリティ対応",
        description: "ARIA属性・キーボード操作の考慮",
      },
    ],
  },
  {
    category: "バックエンド / API",
    icon: <Server className="w-5 h-5 text-gray-700" />,
    comment: "Express + Prisma によるREST API設計・実装",
    skills: [
      { name: "Express", description: "Node.jsフレームワークでREST API実装" },
      { name: "Prisma ORM", description: "型安全なORMでDB操作" },
      {
        name: "Prisma Migrate",
        description: "マイグレーションファイル管理と実行",
      },
      { name: "Zod", description: "リクエスト/レスポンススキーマ検証" },
      { name: "Multer", description: "画像アップロード処理" },
      {
        name: "express-validator",
        description: "入力値のバリデーションとエラー制御",
      },
      {
        name: "ロギング / エラーハンドリング",
        description: "例外処理と構造化ログ",
      },
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
      { name: "Prisma Seed", description: "初期データ投入・シードスクリプト" },
      { name: "インデックス設計", description: "検索パフォーマンス最適化" },
    ],
  },
  {
    category: "アーキテクチャ / 環境構成",
    icon: <Settings className="w-5 h-5 text-gray-700" />,
    comment: "Dockerや環境変数管理で拡張性ある構成に。",
    skills: [
      {
        name: "Docker Compose",
        description: "Next.js + Express + DBを一括構成",
      },
      { name: ".env", description: "dev/stg/prod の環境変数管理" },
      { name: "json-server", description: "モックAPIとして導入、フェッチ可能" },
      {
        name: "ポート分離構成",
        description: "Next.jsとExpressを別ポートで実行",
      },
    ],
  },
  {
    category: "テスト / CI",
    icon: <CheckCircle2 className="w-5 h-5 text-gray-700" />,
    comment: "単体・E2E・CIを想定した構成を採用。",
    skills: [
      { name: "Vitest", description: "ユニットテスト用ライブラリ" },
      { name: "Supertest", description: "Express APIの正常・異常系テスト" },
      { name: "Playwright", description: "E2Eテスト自動化" },
      { name: "GitHub Actions", description: "CI/CDパイプライン定義" },
    ],
  },
  {
    category: "開発環境 / 補助ツール",
    icon: <Wrench className="w-5 h-5 text-gray-700" />,
    comment: "コード品質と効率的な開発を支援するツール群。",
    skills: [
      { name: "ESLint / Prettier", description: "Airbnbルールで整形・統一" },
      { name: "VSCode拡張", description: "Lint・補完支援に連携" },
      { name: "Figma", description: "デザイントークン / ハンドオフ" },
      {
        name: "lint-staged / pre-commit",
        description: "品質ゲートをCI前に実行",
      },
      { name: "OpenAPI形式", description: "API設計管理（YAML / Markdown）" },
    ],
  },
  {
    category: "認証・認可",
    icon: <KeyRound className="w-5 h-5 text-gray-700" />,
    comment: "Firebase Authentication を用いた認証基盤。",
    skills: [
      { name: "Firebase Authentication", description: "ユーザー認証管理" },
      {
        name: "firebase-admin",
        description: "トークン検証・ロールベース権限管理",
      },
    ],
  },
  {
    category: "デプロイ / 運用",
    icon: <Rocket className="w-5 h-5 text-gray-700" />,
    comment: "クラウドサービスへのデプロイと運用管理。",
    skills: [
      { name: "Render", description: "本番デプロイ環境" },
      { name: "Vercel", description: "フロントエンドのホスティング" },
      { name: "Sentry", description: "エラーモニタリング / アラート通知" },
    ],
  },
] satisfies SkillGroup[];

// ---------- コンポーネント ----------
export function SkillsSection() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold text-gray-900 tracking-wide mb-12 uppercase inline-block">
        SKILL
      </h2>

      <div className="relative left-1/2 -mx-[50vw] w-screen">
        <div className="mx-auto max-w-[1600px] px-[6vw]">
          {/* ★ 最大2列固定 */}
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 text-left">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition"
              >
                <div className="flex items-center gap-2 mb-3">
                  {group.icon}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {group.category}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">{group.comment}</p>
                <ul className="space-y-2">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>
                      <div className="font-medium text-gray-700 text-sm">
                        {skill.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {skill.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
