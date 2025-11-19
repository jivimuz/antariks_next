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
  Settings,
  ClipboardList,
  CheckSquare,
  Wrench,
  TrendingUp,
  ZapOff,
  ClipboardCheck,
  FileMinus,
  Github,
  Linkedin,
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
      title: "Studi Kasus: MES ",
      subtitle:
        "Merampingkan Produksi Perusahaan Manufaktur dengan Pelacakan Cut-to-Pack", // (DIPERBARUI)
      industry: "Industri",
      industryValue: "Garment & Pakaian Jadi",
    },
    challenge: {
      title: "Tantangan",
      text: "Sebuah Perusahaan Manufaktur Garmen kesulitan melacak Work-in-Progress (WIP) di berbagai lini jahit yang kompleks. Sering terjadi bottleneck (hambatan) di bagian cutting atau finishing, namun sulit diidentifikasi secara cepat. Perhitungan efisiensi dan insentif operator masih manual dan rawan kesalahan.", // (DIPERBARUI)
    },
    solution: {
      title: "Solusi Kami",
      text: "Antariks mengembangkan sebuah sistem MES (Manufacturing Execution System) berbasis Mobile App yang fokus pada pelacakan bundle (ikatan kain) menggunakan QR code. Sistem ini memantau setiap langkah dari cutting, sewing (per lini), quality control, hingga packing secara real-time.", // (DIPERBARUI)
      featuresTitle: "Fitur Utama Termasuk:",
      features: [
        {
          name: "Pelacakan Bundle (QR Code)",
          desc: "Memindai QR pada setiap bundle untuk melacak lokasi dan status pekerjaan secara akurat.",
        },
        {
          name: "Monitoring Lini Produksi",
          desc: "Dasbor real-time untuk supervisor melihat output per lini, target, dan efisiensi operator.",
        },
        {
          name: "Analisis Bottleneck",
          desc: "Mengidentifikasi di mana pekerjaan menumpuk (misal, antrian di QC atau stasiun jahit tertentu).",
        },
        {
          name: "Perhitungan Insentif Operator",
          desc: "Menghitung output dan efisiensi operator secara otomatis untuk perhitungan bonus yang transparan.",
        },
      ],
    },
    techStack: {
      title: "Tumpukan Teknologi (Bisa sesuai permintaan)",
    },
    results: {
      title: "Hasilnya",
      text: "Implementasi GarmentFlow memberikan visibilitas penuh atas lantai produksi dan data akurat untuk pengambilan keputusan.",
      items: [
        "Peningkatan 25% pada throughput (output) harian.",
        "Pengurangan 90% kesalahan pelacakan pesanan manual.",
        "Identifikasi bottleneck 5x lebih cepat oleh supervisor.",
        "Perhitungan insentif operator yang akurat dan transparan.",
      ],
    },
    gallery: {
      title: "Galeri Aplikasi Mobile MES", // (DIPERBARUI)
    },
    cta: {
      title: "Siap Merampingkan Produksi Perusahaan Anda?",
      subtitle:
        "Diskusikan kebutuhan MES spesifik Anda dengan asisten AI kami atau hubungi tim kami hari ini.",
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
      title: "Case Study: MES",
      subtitle:
        "Streamlining a Manufacturing Company's Production with Cut-to-Pack Tracking", // (DIPERBARUI)
      industry: "Industry",
      industryValue: "Garment & Apparel",
    },
    challenge: {
      title: "The Challenge",
      text: "A leading Manufacturing Company struggled to track Work-in-Progress (WIP) across complex sewing lines. Bottlenecks frequently occurred at cutting or finishing stations but were hard to identify quickly. Operator efficiency and incentive calculations were still manual and prone to errors.", // (DIPERBARUI)
    },
    solution: {
      title: "Our Solution",
      text: "Antariks developed a custom Mobile App MES focused on tracking fabric bundles using QR codes. The system monitors every step from cutting, sewing (per line), quality control, to packing in real-time.", // (DIPERBARUI)
      featuresTitle: "Key Features Included:",
      features: [
        {
          name: "Bundle Tracking (QR Code)",
          desc: "Scanning QR codes on each bundle to accurately track job location and status.",
        },
        {
          name: "Production Line Monitoring",
          desc: "Real-time dashboards for supervisors to see output per line, targets, and operator efficiency.",
        },
        {
          name: "Bottleneck Analysis",
          desc: "Identifying where work is piling up (e.g., QC queues or specific sewing stations).",
        },
        {
          name: "Operator Incentive Calculation",
          desc: "Automatically calculating operator output and efficiency for transparent bonus payroll.",
        },
      ],
    },
    techStack: {
      title: "Technology Stack (Can be by request)",
    },
    results: {
      title: "The Results",
      text: "The GarmentFlow implementation provided full visibility over the production floor and accurate data for decision-making.",
      items: [
        "25% increase in daily production throughput.",
        "90% reduction in manual order tracking errors.",
        "5x faster bottleneck identification by supervisors.",
        "Accurate and transparent operator incentive calculation.",
      ],
    },
    gallery: {
      title: "MES Mobile App Gallery", // (DIPERBARUI)
    },
    cta: {
      title: "Ready to Streamline Your Company Production?",
      subtitle:
        "Discuss your specific MES needs with our AI assistant or contact our team today.",
      button: "Start Consultation (via AI)",
    },
    footer: {
      copyright: "All Rights Reserved.",
    },
  },
};

// -- Context Bahasa --

// -- Komponen Konten Halaman MES --
const MESPageContent = () => {
  const { lang } = useContext(LangContext);
  const t = allContent[lang];
  const featureIcons = [Settings, ClipboardList, CheckSquare, Wrench];
  const resultIcons = [TrendingUp, ZapOff, ClipboardCheck, FileMinus];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-gray-900 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-emerald-400 mb-8">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-center sm:text-center">
            
            <div className="text-gray-300">
              <span className="block text-sm font-bold text-gray-500 uppercase">
                {t.hero.industry}
              </span>
              {t.hero.industryValue}
            </div>
          </div>
        </div>
      </section>

      {/* (MODIFIKASI) Gambar Utama MES - Mockup Mobile */}
      <section className="bg-gray-900 pb-16 md:pb-28">
        <div className="container mx-auto px-6">
          {/* Phone Mockup */}
          <div className="relative mx-auto w-72 max-w-xs bg-gray-800 rounded-[2.5rem] shadow-2xl p-4 border-4 border-gray-700">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20 border-b-4 border-l-4 border-r-4 border-gray-700"></div>
            {/* Screen */}
            <div className="w-full h-[550px] bg-gray-950 rounded-[2rem] overflow-hidden shadow-inner">
              <img
                src="/image/projects/mes/2.jpg"
                alt="FactoryFlow MES Mobile App"
                className="w-full h-full object-cover"
              />
            </div>
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

              <h3 className="text-xl font-semibold text-emerald-400 mb-4">
                {t.solution.featuresTitle}
              </h3>
              <div className="space-y-4">
                {t.solution.features.map((feature, index) => {
                  const Icon = featureIcons[index] || CheckSquare;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Icon
                        className="text-emerald-500 mt-1 flex-shrink-0"
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
      <section className="py-16 md:py-28 bg-gray-900">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Tech Stack */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {t.techStack.title}
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Java",
                "PHP",
                "Javascript",
                "MSSQL",
                "Jquery",
                "API",
                "etc.",
              ].map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-800 text-emerald-300 text-sm font-medium px-4 py-2 rounded-full border border-gray-700"
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
                      className="text-emerald-500 mt-1 flex-shrink-0"
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

      {/* (MODIFIKASI) Galeri - Menggunakan rasio mobile */}
      <section className="py-16 md:py-28 bg-gray-950">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            {t.gallery.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {/* Placeholder 1 */}
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800 max-w-xs justify-center align-center">
              <img
                src="/image/projects/mes/1.jpg"
                alt="Dasbor Supervisor Mobile"
                className="w-full h-150"
              />
            </div>
            {/* Placeholder 2 */}
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800 max-w-xs justify-center align-center">
              <img
                src="/image/projects/mes/3.jpg"
                alt="Modul Pelacakan Bundle"
                className="w-full h-150"
              />
            </div>
            {/* Placeholder 3 */}
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800 max-w-xs justify-center align-center">
              <img
                src="/image/projects/mes/4.png"
                alt="Input Kontrol Kualitas"
                className="w-full h-150"
              />
            </div>
            {/* Placeholder 4 */}
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800 max-w-xs justify-center align-center">
              <img
                src="/image/projects/mes/5.png"
                alt="Laporan Efisiensi"
                className="w-full h-150"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-28 bg-gray-900 text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-lg text-gray-300 mb-8">{t.cta.subtitle}</p>
          <a
            href="/chat" // Arahkan ke halaman chatbot
            className="bg-emerald-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-500/50 hover:-translate-y-1 transform"
          >
            {t.cta.button}
          </a>
        </div>
      </section>
    </>
  );
};

// -- Komponen Halaman Utama --
export default function MESPortfolioPage() {
  

  return (
    <>
   
      <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
        <Header />
        <main className="mt-10 md:mt-0">
          <MESPageContent />
        </main>
        <Footer />
      </div>
    </>
  );
}