# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

「ensei」 - サッカースタジアムとチームの情報を管理するNext.js 15アプリケーション。

## 開発コマンド

```bash
# 開発サーバー起動（Turbopack使用）
yarn dev

# ビルド
yarn build

# プロダクションサーバー起動
yarn start

# リント
yarn lint

# Prismaマイグレーション実行
yarn prisma migrate dev

# Prismaクライアント生成
yarn prisma generate

# Prismaスタジオ起動（データベース確認）
yarn prisma studio
```

## アーキテクチャ概要

### 技術スタック
- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **データベース**: PostgreSQL (Supabase経由) + Prisma ORM
- **認証**: Supabase Auth
- **UI**: Mantine UI v7 + Tabler Icons
- **地図**: Google Maps (@vis.gl/react-google-maps)
- **状態管理**: nuqs (URLパラメータによる状態管理)
- **データフェッチング**: Next.js Server Components + Suspense

### コンポーネント構造
```
src/components/
├── atoms/        # 基本UIコンポーネント（Button, Input等）
├── molecules/    # 複合コンポーネント（Form, Card等）
├── organisms/    # 高度な複合コンポーネント（Header, List等）
└── ui/          # 共通UIコンポーネント
```

### 主要なルート構成
- `/` → `/stadiums` へリダイレクト
- `/stadiums` - スタジアム一覧・地図表示
- `/stadiums/[id]` - スタジアム詳細
- `/teams` - チーム一覧
- `/teams/[id]` - チーム詳細
- `/auth/*` - 認証関連（sign-in, sign-up, reset-password）

### データベーススキーマ
主要テーブル:
- `stadiums` - スタジアム情報（name, capacity, latitude, longitude, rating等）
- `teams` - チーム情報（name, category等）
- `matches` - 試合情報（teamId, stadiumId, date等）
- `stadium_tags` - スタジアムとタグの多対多関係
- `team_stadium` - チームとスタジアムの多対多関係

### 認証とミドルウェア
- Supabase Authを使用した認証システム
- `src/utils/supabase/middleware.ts`でルート保護を実装
- 未認証ユーザーは`/signin`へリダイレクト

### API構成
`src/app/api/`配下にAPIルートを配置:
- `/api/geocode` - 住所から座標を取得
- `/api/scraping/match` - 試合データのスクレイピング
- `/api/hello` - テスト用エンドポイント

### 環境変数
必須の環境変数（`.env.local`）:
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_GCP_API_KEY=  # Google Maps API用
```

### Supabaseクライアント
- `src/utils/supabase/client.ts` - クライアントサイド用
- `src/utils/supabase/server.ts` - サーバーサイド用

### 型定義とパスエイリアス
- TypeScriptのパスエイリアス: `@/*` → `./src/*`
- Prismaが自動生成する型定義を活用