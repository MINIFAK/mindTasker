import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./sessionProvider";
import { Toaster } from "@/components/ui/shadcn/sonner";

const inter = Inter({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-inter',
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: "MindTasker",
    template: "%s | MindTasker",
  },
  description: "Organize seu tempo, projetos e tarefas. Melhore sua produtividade com o MindTasker.",
  keywords: [
    "MindTasker",
    "produtividade",
    "gestão de tarefas",
    "organização",
    "tarefas",
    "metas",
    "melhorias",
  ],
  applicationName: "MindTasker",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
    }
  },
  openGraph: {
    title: "MindTasker - Organize seu tempo",
    description:
      "Com MindTasker, gerencie suas tarefas de forma fácil e eficiente!",
    url: "https://mindtasker.vercel.app/",
    siteName: "MindTasker",
    images: [
      {
        url: "/MindTaskerLight.svg",
        width: 1200,
        height: 630,
        alt: "MindTasker - Organize sua vida",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindTasker - Organize sua tempo",
    description:
      "Melhore sua produtividade e organize seu tempo com o MindTasker.",
    images: ["/MindTaskerLight.svg"],
    creator: "@MindTasker",
  },
  icons: '/favicon.ico',
  alternates: {
    canonical: "https://mindtasker.vercel.app/", // URL canônica
    languages: {
      "pt-BR": "https://mindtasker.vercel.app/", // Alternativa para português
    },
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} bg-[#F2F2F2]`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
