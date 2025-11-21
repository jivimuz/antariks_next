"use client"; // Diperlukan untuk hooks

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
// Impor ikon untuk fitur
import {
  ShoppingCart, // (BARU)
  Package, // (BARU)
  BarChart, // (BARU)
  Percent, // (BARU)
  TrendingUp,
  CheckCheck,
  Users,
  Clock,
  Github,
  Linkedin,
  CheckSquare,
} from "lucide-react";
import LangContext from "@/context/langContext";
import Header from "@/components/layout/headerComponent";
import Footer from "@/components/layout/footerComponent";

// -- Objek Konten Bilingual --
const allContent = {
  id: {
    header: {
      back: "Kembali ke Beranda",
    },
    hero: {
      title: "Studi Kasus: POS",
      subtitle:
        "Modernisasi Operasional Ritel & F&B dengan Sistem Point of Sale Cerdas",
      // (DIHAPUS) client: "Klien",
      // (DIHAPUS) clientValue: "Perusahaan Ritel XYZ",
      industry: "Industri",
      industryValue: "Ritel & F&B",
    },
    challenge: {
      title: "Tantangan",
      text: "Klien kami sebuah jaringan toko yang sedang berkembang, mengandalkan pencatatan manual. Ini menyebabkan antrian kasir yang panjang, stok bahan baku (kopi, susu) yang sering tidak akurat, dan tidak adanya laporan penjualan harian yang terpusat untuk manajemen.",
    },
    solution: {
      title: "Solusi Kami",
      text: "Antariks membangun sistem Point of Sale berbasis cloud (web & tablet) yang intuitif. Sistem ini menyederhanakan proses pemesanan, mengotomatiskan pengurangan stok (manajemen resep), dan menyediakan laporan analitik *real-time* untuk pemilik bisnis.",
      featuresTitle: "Fitur Utama Termasuk:",
      features: [
        {
          name: "Antarmuka Kasir Cepat",
          desc: "Proses transaksi yang cepat dan intuitif, mengurangi waktu antri pelanggan.",
        },
        {
          name: "Manajemen Inventaris & Resep",
          desc: "Stok bahan baku terpotong otomatis berdasarkan resep saat penjualan terjadi.",
        },
        {
          name: "Laporan Analitik",
          desc: "Dasbor penjualan, produk terlaris, dan laporan laba-rugi instan.",
        },
        {
          name: "Manajemen Promo & Diskon",
          desc: "Membuat dan mengelola program loyalitas atau diskon dengan mudah.",
        },
      ],
    },
    techStack: {
      title: "Tumpukan Teknologi (Bisa sesuai permintaan)",
    },
    results: {
      title: "Hasilnya",
      text: "POS langsung meningkatkan efisiensi dan visibilitas bisnis klien secara drastis.",
      items: [
        "Proses checkout 50% lebih cepat mengurangi antrian.",
        "Akurasi stok bahan baku meningkat hingga 99.8%.",
        "Laporan penjualan harian tersedia instan (sebelumnya 2 jam rekap manual).",
        "Peningkatan 15% retensi pelanggan berkat manajemen promo.",
      ],
    },
    gallery: {
      title: "Galeri Dasbor POS",
    },
    cta: {
      title: "Siap Modernisasi Bisnis Ritel Anda?",
      subtitle:
        "Diskusikan kebutuhan sistem POS spesifik Anda dengan asisten AI kami.",
      button: "Mulai Konsultasi (via AI)",
    },
    footer: {
      copyright: "Seluruh Hak Cipta.",
    },
  },
  en: {
    header: {
      back: "Back to Home",
    },
    hero: {
      title: "Case Study: POS",
      subtitle:
        "Modernizing Retail & F&B Operations with a Smart Point of Sale System",
      // (REMOVED) client: "Client",
      // (REMOVED) clientValue: "XYZ Retail Company",
      industry: "Industry",
      industryValue: "Retail & F&B",
    },
    challenge: {
      title: "The Challenge",
      text: "Our client is a growing shop chain, relied on manual order taking. This led to long checkout lines, frequent inaccuracies in raw material inventory (coffee beans, milk), and no centralized daily sales reports for management.",
    },
    solution: {
      title: "Our Solution",
      text: "Antariks built an intuitive cloud-based Point of Sale system (web & tablet). The system simplifies the ordering process, automates stock deduction (recipe management), and provides real-time analytical reports for business owners.",
      featuresTitle: "Key Features Included:",
      features: [
        {
          name: "Speedy Checkout Interface",
          desc: "Fast and intuitive transaction processing, reducing customer wait times.",
        },
        {
          name: "Inventory & Recipe Management",
          desc: "Raw material stocks are automatically deducted based on recipes when sales occur.",
        },
        {
          name: "Analytical Reports",
          desc: "Instant sales dashboards, best-selling products, and profit/loss reports.",
        },
        {
          name: "Promo & Discount Management",
          desc: "Easily create and manage loyalty programs or discounts.",
        },
      ],
    },
    techStack: {
      title: "Technology Stack (Can be by request)",
    },
    results: {
      title: "The Results",
      text: "POS immediately improved the client's efficiency and business visibility.",
      items: [
        "50% faster checkout process, reducing queues.",
        "Inventory accuracy for raw materials increased to 99.8%.",
        "Instant daily sales reports (previously 2 hours of manual recap).",
        "15% increase in customer retention via promo management.",
      ],
    },
    gallery: {
      title: "POS Dashboard Gallery",
    },
    cta: {
      title: "Ready to Modernize Your Retail Business?",
      subtitle: "Discuss your specific POS needs with our AI assistant.",
      button: "Start Consultation (via AI)",
    },
    footer: {
      copyright: "All Rights Reserved.",
    },
  },
};

// -- Context Bahasa --

// -- Komponen Konten Halaman POS --
const POSPageContent = () => {
  const { lang } = useContext(LangContext);
  const t = allContent[lang];
  const featureIcons = [ShoppingCart, Package, BarChart, Percent];
  const resultIcons = [Clock, CheckCheck, BarChart, Users];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-gray-900 text-center relative overflow-hidden">
         {/* --- 1. Ambient Background Effects (Sama seperti Services) --- */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="container mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-green-400 mb-8">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-center">
            {/* (DIHAPUS) Bagian Klien */}
            <div className="text-gray-300">
              <span className="block text-sm font-bold text-gray-500 uppercase">
                {t.hero.industry}
              </span>
              {t.hero.industryValue}
            </div>
          </div>
        </div>
     <br />
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden border-2 border-green-700/50">
            <img
              src="/image/projects/pos/1.png"
              alt="POS Admin Dashboard"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Tantangan & Solusi */}
      <section className="py-16 md:py-28 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Tantangan */}
            <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t.challenge.title}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {t.challenge.text}
              </p>
            </div>

            {/* Solusi */}
            <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t.solution.title}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {t.solution.text}
              </p>

              <h3 className="text-xl font-semibold text-green-400 mb-4">
                {t.solution.featuresTitle}
              </h3>
              <div className="space-y-4">
                {t.solution.features.map((feature, index) => {
                  const Icon = featureIcons[index] || CheckSquare;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Icon
                        className="text-green-500 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <h4 className="font-semibold text-white">
                          {feature.name}
                        </h4>
                        <p className="text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Hasil */}
      <section className="py-16 md:py-28 bg-gray-900 relative overflow-hidden">
         {/* --- 1. Ambient Background Effects (Sama seperti Services) --- */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Tech Stack */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {t.techStack.title}
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Vue",
                "Laravel",
                "MySQL",
                "API",
              ].map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-800 text-green-300 text-sm font-medium px-4 py-2 rounded-full border border-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Hasil */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {t.results.title}
            </h2>
            <p className="text-gray-300 text-lg mb-6">{t.results.text}</p>
            <ul className="space-y-3">
              {t.results.items.map((item, index) => {
                const Icon = resultIcons[index] || TrendingUp;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <Icon
                      className="text-green-500 mt-1 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-lg text-gray-200">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Galeri - Menggunakan rasio web */}
      <section className="py-16 md:py-28 bg-gray-950">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            {t.gallery.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
              src="/image/projects/pos/2.png"
                alt="Dasbor Penjualan POS"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
              src="/image/projects/pos/3.png"
                alt="Manajemen Stok POS"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-28 bg-gray-900 text-center relative overflow-hidden">
         {/* --- 1. Ambient Background Effects (Sama seperti Services) --- */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-lg text-gray-300 mb-8">{t.cta.subtitle}</p>
          <a
            href="/chat" // Arahkan ke halaman chatbot
            className="bg-green-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg shadow-green-600/30 transition-all duration-300 hover:bg-green-500 hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-1 transform"
          >
            {t.cta.button}
          </a>
        </div>
      </section>
    </>
  );
};

// -- Komponen Halaman Utama --
export default function POSPortfolioPage() {

  return (
   
      <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
        <Header />
        <main className="mt-10 md:mt-0">
          <POSPageContent />
        </main>
        <Footer />
      </div>
  );
}