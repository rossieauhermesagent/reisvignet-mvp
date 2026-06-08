import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reisvignet.nl | Milieustickers & Vignetten",
  description: "Regel je milieustickers voor Frankrijk en vignetten voor Zwitserland in 2 minuten via iDEAL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600&family=Source+Code+Pro:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
