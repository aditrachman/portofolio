import type { Metadata } from "next";
import { Grotesk } from "@/libs/font";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aditrachman.github.io/"),
  title: {
    default: "Adit Rachman",
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
    siteName: "aditrachman.github.io",
    title: "Adit Rachman",
    description:
      "Frontend Developer yang suka bikin proyek web modern, fokus di desain simpel, fungsional, dan user-friendly.",
    images: [
      "https://media.discordapp.net/attachments/1310990889065123883/1324049418474749953/Untitled_8.png?ex=6776bc9d&is=67756b1d&hm=5dc0e70688eecc7add808c723df77e427c9ce3833933f95a85f2183aa5fa66ef&=&format=webp&quality=lossless",
    ],
    locale: "en-ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adit Rachman",
    description:
      "Frontend Developer | Ngebangun web apps modern dengan desain clean dan pengalaman pengguna yang nyaman.",
    images: [
      "https://media.discordapp.net/attachments/1310990889065123883/1324049418474749953/Untitled_8.png?ex=6776bc9d&is=67756b1d&hm=5dc0e70688eecc7add808c723df77e427c9ce3833933f95a85f2183aa5fa66ef&=&format=webp&quality=lossless",
    ],
    creator: "@aditrachman",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Grotesk.className} antialiased`}>
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
