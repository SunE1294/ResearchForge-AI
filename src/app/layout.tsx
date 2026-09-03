import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-sans-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ResearchForge AI | Discipline-Aware Academic Co-Pilot",
  description:
    "A discipline-aware, bilingual academic co-pilot transitioning students from thesis ambiguity to structured, ethical research execution.",
  keywords: [
    "Academic Research",
    "Thesis Co-Pilot",
    "Undergraduate & Graduate Thesis",
    "OpenAlex",
    "Semantic Scholar",
    "Gantt Milestones",
    "Ethical AI",
    "Bangladesh Higher Education"
  ],
  authors: [{ name: "ResearchForge AI Core Team" }],
  openGraph: {
    title: "ResearchForge AI | Discipline-Aware Academic Co-Pilot",
    description:
      "A discipline-aware, bilingual academic co-pilot transitioning students from thesis ambiguity to structured, ethical research execution.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${notoBengali.variable}`}>
      <body className="font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <OnboardingModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
