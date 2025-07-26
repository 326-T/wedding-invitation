# GitHub Actions Setup Guide

## Required Repository Secrets

以下のシークレットをGitHubリポジトリの Settings > Secrets and variables > Actions で設定してください。

### Production Environment (main branch)

| Secret Name | Description | 取得方法 |
|-------------|-------------|----------|
| `SUPABASE_ACCESS_TOKEN` | Supabase CLI用のアクセストークン | [Supabase Dashboard](https://supabase.com/dashboard) > Settings > Access Tokens |
| `SUPABASE_PROJECT_REF` | SupabaseプロジェクトのProject Reference ID | Supabase Dashboard > Settings > General > Reference ID |
| `SUPABASE_DB_PASSWORD` | Supabaseデータベースパスワード | Supabaseプロジェクト作成時に設定したパスワード |

## Environment Setup

### 1. Supabase Access Token取得

1. [Supabase Dashboard](https://supabase.com/dashboard)にログイン
2. Settings > Access Tokens に移動
3. "Generate new token" をクリック
4. 適切な名前を設定（例: "GitHub Actions"）
5. 生成されたトークンをコピー

### 2. Project Reference ID取得

1. Supabaseプロジェクトのダッシュボードに移動
2. Settings > General に移動
3. "Reference ID" の値をコピー

### 3. GitHub Repository Secretsの設定

1. GitHubリポジトリページに移動
2. Settings タブをクリック
3. 左サイドバーから "Secrets and variables" > "Actions" を選択
4. "New repository secret" をクリック
5. 上記の表に従ってシークレットを一つずつ追加

## Workflow Triggers

### CI/CD Pipeline (`ci.yml`)
- **Trigger**: `main` ブランチへのpush/PR
- **Permissions**: `contents: write`, `pull-requests: write`, `issues: write`
- **Jobs**: 
  - Lint & Type Check (全てのイベント)
  - Test (全てのイベント)  
  - Migration Preview (PR時のみ) - PRコメントにマイグレーション差分を表示
  - Migration (main branch push時のみ) - 本番マイグレーション実行

## Manual Migration

必要に応じて手動でマイグレーションを実行：

```bash
# ローカルでマイグレーションを確認
npx supabase db diff --linked

# 本番環境にマイグレーションを適用（通常は自動実行される）
npx supabase db push
```

## Troubleshooting

### Common Issues

1. **"Project not linked" エラー**
   - `SUPABASE_PROJECT_REF` が正しく設定されているか確認
   - プロジェクトが存在し、アクセス可能か確認

2. **"Authentication failed" エラー**
   - `SUPABASE_ACCESS_TOKEN` が有効か確認
   - トークンの権限が適切か確認

3. **"Database connection failed" エラー**
   - `SUPABASE_DB_PASSWORD` が正しいか確認
   - データベースが起動しているか確認

4. **型生成に失敗**
   - スキーマが存在するか確認
   - `public` スキーマにテーブルが存在するか確認

5. **PRコメント作成に失敗**
   - リポジトリの Settings > Actions > General で "Workflow permissions" を確認
   - "Read and write permissions" が選択されているか確認
   - または "Read repository contents and packages permissions" + 個別権限設定