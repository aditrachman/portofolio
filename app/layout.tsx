import type { Metadata } from "next";
import { Grotesk } from "@/libs/font";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const ogImage = "/assets/og-image.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://aditrachman.vercel.app"),
  title: {
    default: "Adit Rachman — Frontend Developer & Data Analyst | Magelang",
    template: "%s - Adit Rachman",
  },
  description:
    "Frontend Developer yang suka bikin proyek web modern, fokus di desain simpel, fungsional, dan user-friendly.",
  keywords: [
    "AditRachman",
    "nextjs",
    "frontend developer",
    "aditrachman",
    "portofolio",
  ],
  openGraph: {
    siteName: "aditrachman.vercel.app",
    title: "Adit Rachman",
    description:
      "Frontend Developer yang suka bikin proyek web modern, fokus di desain simpel, fungsional, dan user-friendly.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Adit Rachman — Frontend Developer & Data Analyst",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adit Rachman",
    description:
      "Frontend Developer | Ngebangun web apps modern dengan desain clean dan pengalaman pengguna yang nyaman.",
    images: [ogImage],
    creator: "@aditrachman",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Adit Rachman",
    jobTitle: "Frontend Developer",
    url: "https://aditrachman.vercel.app",
    sameAs: [
      "https://github.com/aditrachman",
      "https://instagram.com/aditrachman_",
    ],
  };

  return (
    <html lang="id">
      <body className={`${Grotesk.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="e9a956c2-369e-471d-a48e-d2e94e587bff"
        ></script>
      </body>
    </html>
  );
}
