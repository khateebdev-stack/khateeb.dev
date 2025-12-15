import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://khateeb.dev'),
  title: {
    default: "Khateeb | Full Stack Developer & Digital Strategist",
    template: "%s | Khateeb"
  },
  description: "I build high-performance websites, apps, and digital systems that drive sales and efficiency. Expert in Next.js, React Native, and Business Automation.",
  keywords: ["Full Stack Developer", "Web Development", "Mobile Apps", "Next.js", "React Native", "SEO", "Digital Marketing", "Business Automation", "CRM", "LMS"],
  authors: [{ name: "Khateeb" }],
  creator: "Khateeb",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://khateeb.dev",
    title: "Khateeb | Full Stack Developer & Digital Strategist",
    description: "Empowering businesses with conversion-first digital systems. Web, Mobile, and Automation solutions.",
    siteName: "Khateeb Portfolio",
    images: [
      {
        url: "/og-image.png", // We will generate this next
        width: 1200,
        height: 630,
        alt: "Khateeb - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khateeb | Full Stack Developer & Digital Strategist",
    description: "High-performance websites and apps. Let's build your digital future.",
    images: ["/og-image.png"],
    creator: "@khateeb",
  },
  icons: {
    icon: "/logo1.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// import ChatWidget from "@/components/chat/ChatWidget";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden w-full`}
      >
        <meta name="google-site-verification" content="3v-uiQavaGlQc7NDD4GmJl7_0-bnMk9Km9CsK4OCysM" />
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col relative w-full overflow-x-hidden">
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            {/* <ChatWidget /> */}
          </div>
        </ThemeProvider>

        {/* --- AD NETWORK INTEGRATION (Safe: Only loads on /tools/ URLs) --- */}

        {/* 1. Google AdSense (Auto Ads) */}
        <SafeAdContainer
          scriptSrc="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5348419488742899"
          scriptId="google-adsense"
        />

        {/* 2. Monetag (Push/Multi-Tag) */}
        <SafeAdContainer
          scriptSrc="https://al5sm.com/tag.min.js"
          scriptId="monetag-multitag"
          attributes={{ 'data-zone': '10327103' }}
        />

        {/* 3. Monetag (Vignette) */}
        <SafeAdContainer
          scriptSrc="https://gizokraijaw.net/vignette.min.js"
          scriptId="monetag-vignette"
          attributes={{ 'data-zone': '10327118' }}
        />

        {/* 4. Monetag (Service Worker Registration for Push Ads) */}
        <SafeAdContainer>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                        if ('serviceWorker' in navigator) {
                            navigator.serviceWorker.register('/sw.js').then(function(registration) {
                                console.log('✅ Monetag Service Worker Registered for scope:', registration.scope);
                            }).catch(function(err) {
                                console.log('❌ Monetag Service Worker failed:', err);
                            });
                        }
                    `
            }}
          />
        </SafeAdContainer>
      </body>
    </html>
  );
}
