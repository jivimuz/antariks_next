import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/langContext";
import FloatChat from "@/components/addOn/floatChatComponent";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Antariks - Always be your it solution",
  description: "perusahaan teknologi yang berfokus pada solusi digital modern—mulai dari pengembangan aplikasi, sistem otomatisasi, hingga layanan AI yang scalable. Kami membantu bisnis bertransformasi lebih cepat, lebih efisien, dan lebih cerdas melalui teknologi yang dirancang dengan presisi dan pengalaman pengguna sebagai prioritas. Vendor Aplikasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <LangProvider>
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-5W6DGVBMJR" 
          strategy="afterInteractive" 
        />
        
        {/* Script 2: Konfigurasi inline */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5W6DGVBMJR');
          `}
        </Script>
        {children}
        <FloatChat/>
    </LangProvider>
      </body>
    </html>
  );
}
