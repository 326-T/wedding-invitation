# 結婚式招待フォーム

Next.js と Supabase を使用した結婚式の招待状フォームアプリケーションです。

## 機能

- 📝 出席者情報の入力フォーム（氏名、メールアドレス、出席可否）
- 👥 参加人数の選択
- 🍽️ 食物アレルギー・食事制限の記入
- 💌 お祝いメッセージの入力
- 📊 Supabase を使用したデータベース管理

## 技術スタック

- **フレームワーク**: Next.js 15.4.4 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **データベース**: Supabase
- **フォント**: Geist Sans & Geist Mono

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. ローカル開発環境の選択

#### オプション A: ローカル Supabase を使用（推奨）

```bash
# Supabase CLIを使ってローカル環境を起動
npx supabase start

# 初回のみ：マイグレーションを適用
npx supabase db reset
```

ローカル開発用の `.env.local` ファイルを作成：

```bash
# ローカル開発用設定
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
```

**ローカル Supabase のサービス:**
- Database: http://127.0.0.1:54322
- Studio: http://127.0.0.1:54323
- API: http://127.0.0.1:54321
- Inbucket (Email): http://127.0.0.1:54324

#### オプション B: リモート Supabase を使用

`.env.local` ファイルを作成し、本番の Supabase プロジェクトの認証情報を設定：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Supabase の SQL エディタで以下のテーブルを作成：

```sql
CREATE TABLE invitation_responses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  attendance VARCHAR(20) NOT NULL CHECK (attendance IN ('attending', 'not_attending')),
  guest_count INTEGER DEFAULT 1,
  dietary_restrictions TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. アプリケーションの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアプリケーションが起動します。

## スクリプト

### アプリケーション
- `npm run dev` - 開発サーバーの起動（Turbopack 使用）
- `npm run build` - プロダクションビルド
- `npm run start` - プロダクションサーバーの起動
- `npm run lint` - ESLint によるコードチェック

### Supabase（ローカル開発）
- `npx supabase start` - ローカル Supabase サービスの起動
- `npx supabase stop` - ローカル Supabase サービスの停止
- `npx supabase status` - サービスの状態確認
- `npx supabase db reset` - データベースのリセット（マイグレーション適用）
- `npx supabase migration new <name>` - 新しいマイグレーションファイルの作成

## プロジェクト構成

```
src/
├── app/
│   ├── api/invitation/route.ts    # フォーム送信API
│   ├── globals.css                # グローバルスタイル
│   ├── layout.tsx                 # ルートレイアウト
│   └── page.tsx                   # メインページ
├── components/
│   └── InvitationForm.tsx         # 招待フォームコンポーネント
└── lib/
    └── supabase.ts                # Supabase クライアント設定
```

## デプロイ

### Vercel でのデプロイ

1. GitHub リポジトリを Vercel に接続
2. 環境変数を設定
3. デプロイ

詳細は [Next.js デプロイドキュメント](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。
