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
  description: "Aumente sua produtividade com o MindTasker! Gerencie tarefas, projetos e metas de forma eficiente. Controle seu tempo com Pomodoro e cronômetro para melhor organização. Experimente agora!",
  keywords: [
    "MindTasker",
    "produtividade",
    "gestão de tarefas",
    "organização",
    "tarefas",
    "tarefa",
    "metas",
    "metas mensais",
    "melhorias",
    "projetos",
    "cronômetro",
    "pomodoro",
    "tarefas",
    "gerenciamento",
    "gerenciamento de projetos",
    "gerenciamento de tarefas",
    "gerenciamento de metas",
    "gerenciamento de cronômetro",
    "gerenciamento de pomodoro",
    "organização de tarefas",
    "organização de projetos",
    "organização de metas",
    "organização de cronômetro",
    "organização de pomodoro",
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
      "Aumente sua produtividade com o MindTasker! Gerencie tarefas, projetos e metas de forma eficiente. Controle seu tempo com Pomodoro e cronômetro para melhor organização. Experimente agora!",
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
      "Aumente sua produtividade com o MindTasker! Gerencie tarefas, projetos e metas de forma eficiente. Controle seu tempo com Pomodoro e cronômetro para melhor organização. Experimente agora!",
    images: ["/MindTaskerLight.svg"],
    creator: "@MindTasker",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32", type: "image/png", },
      { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16", type: "image/png", },
      { rel: "manifest", url: "/site.webmanifest", },
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0fd815", },
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ]
  },
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
      <head>
        <meta name="theme-color" content="#0fd815" />
      </head>
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
