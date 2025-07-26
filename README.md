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

### コード品質
- `npm run lint` - Biome による静的解析
- `npm run format` - コードフォーマット
- `npm run check` - リントとフォーマットのチェック
- `npm run check:fix` - 自動修正付きチェック

### Supabase（ローカル開発）
- `npx supabase start` - ローカル Supabase サービスの起動
- `npx supabase stop` - ローカル Supabase サービスの停止
- `npx supabase status` - サービスの状態確認
- `npx supabase db reset` - データベースのリセット（マイグレーション適用）
- `npx supabase migration new <name>` - 新しいマイグレーションファイルの作成
- `npx supabase gen types typescript --linked` - TypeScript型定義の生成

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

## CI/CD Pipeline

このプロジェクトは GitHub Actions を使用した自動化された CI/CD パイプラインを備えています。

### 自動化された処理

#### メインブランチ (`main`) プッシュ時
- コード品質チェック（Biome）
- TypeScript 型チェック
- ビルドテスト
- **Supabase マイグレーション自動実行**
- 型定義ファイル自動生成・コミット

#### プルリクエスト時
- コード品質チェック
- TypeScript 型チェック
- ビルドテスト
- **マイグレーション差分表示**（PRコメント）

### 必要な設定

GitHub Actions を使用するには、リポジトリに以下のシークレットが必要です：

| シークレット名 | 説明 |
|---------------|------|
| `SUPABASE_ACCESS_TOKEN` | Supabase CLI 用アクセストークン |
| `SUPABASE_PROJECT_REF` | 本番環境プロジェクト ID |
| `SUPABASE_DB_PASSWORD` | データベースパスワード |

詳細な設定手順は [.github/SETUP.md](./.github/SETUP.md) を参照してください。

### ワークフロー（トランクベース開発）

1. **機能開発** → ローカルまたはfeatureブランチで開発
2. **プルリクエスト** → `main` ブランチへの PR 作成
   - 自動で品質チェック実行
   - マイグレーション差分がPRコメントに表示
3. **本番デプロイ** → マージ後、自動でマイグレーション実行

## デプロイ

### Vercel でのデプロイ

1. GitHub リポジトリを Vercel に接続
2. 環境変数を設定
3. デプロイ

詳細は [Next.js デプロイドキュメント](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。

### 環境変数

本番環境では以下の環境変数が必要です：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
```
