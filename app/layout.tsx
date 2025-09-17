import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { AuthUser } from "@/components/auth-user";
import { Providers } from "@/components/providers";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileNav } from "@/components/ui/mobile-nav";
import { PageTransition } from "@/components/ui/page-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AI Artistry — Create with AI: Video, Images, Design",
    template: "%s — AI Artistry",
  },
  description:
    "Generate AI-powered videos, images, and designs effortlessly. Built for creators and teams.",
  metadataBase: new URL("https://aiartistry.app"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AI Artistry",
    description:
      "Generate AI-powered videos, images, and designs effortlessly. Built for creators and teams.",
    url: "https://aiartistry.app",
    siteName: "AI Artistry",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AI Artistry Preview" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Artistry",
    description:
      "Generate AI-powered videos, images, and designs effortlessly. Built for creators and teams.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${orbitron.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <Providers>
          <header className="sticky top-0 z-50 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-blue-500" aria-hidden />
                <span className="font-semibold tracking-tight">AI Artistry</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <Link href="/generator" className="hover:opacity-80 transition-opacity">Generator</Link>
                <Link href="/dashboard" className="hover:opacity-80 transition-opacity">Dashboard</Link>
                <Link href="#pricing" className="hover:opacity-80 transition-opacity">Pricing</Link>
                <Link href="#contact" className="hover:opacity-80 transition-opacity">Contact</Link>
              </nav>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <AuthUser />
                <MobileNav />
              </div>
            </div>
          </header>
          <main className="min-h-[calc(100dvh-64px)]">
            <PageTransition>{children}</PageTransition>
          </main>
          <footer className="border-t">
            <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 md:grid-cols-3 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-blue-500" aria-hidden />
                  <span className="font-semibold tracking-tight">AI Artistry</span>
                </div>
                <p className="text-muted-foreground max-w-sm">Create high-quality AI visuals with production-ready pipelines.</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="font-medium">Product</div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><Link href="/generator" className="hover:opacity-80">Generator</Link></li>
                    <li><Link href="#pricing" className="hover:opacity-80">Pricing</Link></li>
                    <li><Link href="/dashboard" className="hover:opacity-80">Dashboard</Link></li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Company</div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><Link href="#" className="hover:opacity-80">Blog</Link></li>
                    <li><Link href="#" className="hover:opacity-80">Careers</Link></li>
                    <li><Link href="#contact" className="hover:opacity-80">Contact</Link></li>
                  </ul>
                </div>
              </div>
              <div className="md:text-right text-muted-foreground">© {new Date().getFullYear()} AI Artistry. All rights reserved.</div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
