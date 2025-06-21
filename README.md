This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

## Development Scripts

```bash
# 開発サーバー起動（Turbopack使用）
yarn dev

# ビルド
yarn build

# プロダクションサーバー起動
yarn start

# リント
yarn lint
yarn lint:fix

# フォーマット
yarn format
yarn format:check

# 型チェック
yarn type-check

# Prismaマイグレーション実行
yarn prisma migrate dev

# Prismaクライアント生成
yarn prisma generate

# Prismaスタジオ起動（データベース確認）
yarn prisma studio
```

## Code Quality Tools

このプロジェクトでは以下のツールを使用してコード品質を維持しています：

- **ESLint**: JavaScript/TypeScriptの静的解析
- **Prettier**: コードフォーマッター
- **TypeScript**: 型安全性の確保
- **Prisma**: データベースORM

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
