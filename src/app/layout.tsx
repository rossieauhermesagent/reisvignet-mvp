import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Reisvignet.nl | Jouw officiële reisvignetten & milieustickers online",
    template: "%s | Reisvignet.nl"
  },
  description: "Vraag direct je vignet voor Zwitserland, Oostenrijk, Frankrijk en meer aan op basis van je kenteken. Snel, veilig en 100% officieel.",
  openGraph: {
    title: "Reisvignet.nl | Veilig op reis door Europa",
    description: "Al je vignetten en milieustickers in één keer geregeld op basis van je kenteken.",
    url: "https://reisvignet.nl",
    siteName: "Reisvignet.nl",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reisvignet.nl",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className={dmSans.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
