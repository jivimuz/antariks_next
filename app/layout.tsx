import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/langContext";
import FloatChat from "@/components/addOn/floatChatComponent";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ✅ PENTING: set base URL biar canonical / OG URL rapi
const siteUrl = "https://antariks.id";
const siteName = "Antariks";
const defaultTitle = "Antariks - Always be your IT solution";
const defaultDescription =
  "Antariks adalah perusahaan teknologi yang berfokus pada solusi digital modern—mulai dari pengembangan aplikasi, sistem otomatisasi, hingga layanan AI yang scalable. Kami membantu bisnis bertransformasi lebih cepat, lebih efisien, dan lebih cerdas melalui teknologi yang dirancang dengan presisi dan pengalaman pengguna sebagai prioritas. Basecamp: Cirebon.";

// ✅ viewport terpisah di Next App Router
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10B981", // emerald-ish (optional)
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // ✅ Title template (biar halaman lain bisa override)
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,

  // ✅ SEO fundamental
  applicationName: siteName,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Software House Indonesia",
    "Vendor Aplikasi",
    "Jasa Pembuatan Aplikasi",
    "Jasa Website",
    "ERP",
    "MES",
    "POS",
    "Automation",
    "AI Solutions",
    "Cirebon",
    "Antariks",
  ],
  authors: [{ name: "Antariks", url: siteUrl }],
  creator: "Antariks",
  publisher: "Antariks",

  // ✅ Canonical & language alternates (kalo kamu ada /en dll)
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "en-US": "/en", // kalau belum punya, hapus aja biar gak 404
    },
  },

  // ✅ Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ✅ Open Graph (buat preview WA/FB/LinkedIn)
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/og.png", // bikin file ini di /public/og.png (1200x630)
        width: 1200,
        height: 630,
        alt: "Antariks - Always be your IT solution",
      },
    ],
  },

  // ✅ Twitter Card
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og.png"],
    // site: "@antariks", // kalau ada
    // creator: "@antariks",
  },

  // ✅ Icons (pastikan file ada di /public)
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/image/logo.png" }],
  },

  // ✅ Extra meta (optional tapi bagus)
  category: "technology",

  // ✅ Verification (isi kalau kamu punya)
  // verification: {
  //   google: "GOOGLE_SITE_VERIFICATION_CODE",
  // },

  // ✅ Apple web app (optional)
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "default",
  },

  // ✅ Format detection biar gak auto-link nomor/email di iOS
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LangProvider>
          {/* ✅ Google Analytics - recommended: use next/script */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-5W6DGVBMJR"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5W6DGVBMJR', { anonymize_ip: true });
            `}
          </Script>

          {/* ✅ JSON-LD: Organization + LocalBusiness (SEO boost) */}
          <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Antariks",
                  url: siteUrl,
                  logo: `${siteUrl}/icon.png`,
                  description: defaultDescription,
                  sameAs: [
                    // isi kalau ada:
                    // "https://www.linkedin.com/company/antariks",
                    // "https://www.instagram.com/antariks",
                  ],
                },
                {
                  "@type": "LocalBusiness",
                  name: "Antariks",
                  url: siteUrl,
                  image: `${siteUrl}/og.png`,
                  description: defaultDescription,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Cirebon",
                    addressRegion: "Jawa Barat",
                    addressCountry: "ID",
                  },
                  areaServed: "ID",
                  priceRange: "$$",
                },
              ],
            })}
          </Script>

          {children}
          <FloatChat />
        </LangProvider>
      </body>
    </html>
  );
}
