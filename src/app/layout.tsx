import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@mantine/core/styles.css";
import "./globals.css";
import {
  createTheme,
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { Header } from "@/components/ui/Header";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ensei",
  description: "ensei",
};
const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider theme={theme}>
          <NuqsAdapter>
            <Header />
            {children}
          </NuqsAdapter>
        </MantineProvider>
      </body>
    </html>
  );
}
