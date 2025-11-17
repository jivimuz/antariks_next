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
  Users,
  Smartphone,
  MapPin,
  Bell,
  TrendingUp,
  CheckCheck,
  UserCheck,
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
      title: "Studi Kasus: Umrah and Hajj App",
      subtitle:
        "Digitalisasi Manajemen Jamaah untuk Perusahaan Travel Haji & Umrah",
      industry: "Industri",
      industryValue: "Travel Haji & Umrah",
    },
    challenge: {
      title: "Tantangan",
      text: "Perusahaan Travel mengelola ratusan data jamaah secara manual menggunakan spreadsheet. Proses ini rentan *human error*, sulit melacak status pembayaran, dan memvalidasi dokumen (paspor, visa). Selain itu, komunikasi antara mutawif (pembimbing) di lapangan dengan jamaah sering terputus.",
    },
    solution: {
      title: "Solusi Kami",
      // (MODIFIKASI) Diubah ke platform web/dasbor
      text: "Antariks mengembangkan 'Umrah and Hajj App', sebuah platform terintegrasi berbasis web yang terdiri dari Dasbor Admin untuk manajemen dan Aplikasi Mobile pendamping untuk Jamaah. Sistem ini menyatukan data jamaah, keuangan, jadwal, dan komunikasi dalam satu sistem yang efisien.",
      featuresTitle: "Fitur Utama Termasuk:",
      features: [
        {
          name: "Manajemen Jamaah & Dokumen",
          desc: "Database terpusat untuk paspor, visa, status pembayaran, dan manasit (pembagian kamar).",
        },
        {
          name: "Aplikasi Mobile Jamaah",
          desc: "Jadwal ibadah *real-time*, notifikasi, panduan doa, dan tombol darurat (SOS).",
        },
        {
          name: "Dasbor Keuangan (Finance)",
          desc: "Melacak pembayaran, mengelola paket, dan membuat laporan keuangan.",
        },
        {
          name: "Notifikasi & Broadcast",
          desc: "Mengirim pengumuman penting (misal: perubahan jadwal) ke semua jamaah secara instan.",
        },
      ],
    },
    techStack: {
      title: "Tumpukan Teknologi",
    },
    results: {
      title: "Hasilnya",
      text: "Umrah and Hajj App berhasil mentransformasi cara kerja klien, meningkatkan efisiensi operasional dan kepuasan jamaah.",
      items: [
        "Pengurangan 90% kesalahan entri data jamaah dan dokumen.",
        "Peningkatan 30% pada kepuasan jamaah berkat komunikasi yang lancar.",
        "Visibilitas 100% lokasi rombongan melalui pelacakan GPS.",
        "Proses konfirmasi pembayaran 2x lebih cepat.",
      ],
    },
    gallery: {
      // (MODIFIKASI) Judul galeri
      title: "Galeri Dasbor Umrah and Hajj App",
    },
    cta: {
      title: "Siap Mendigitalkan Travel Anda?",
      subtitle:
        "Diskusikan kebutuhan sistem manajemen travel Anda dengan asisten AI kami.",
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
      title: "Case Study: Umrah and Hajj App",
      subtitle:
        "Digitizing Pilgrim Management for Hajj & Umrah Travel Agency",
      industry: "Industry",
      industryValue: "Hajj & Umrah Travel",
    },
    challenge: {
      title: "The Challenge",
      text: "Travel Agency was managing hundreds of pilgrim data manually using spreadsheets. This process was prone to human error, made tracking payment statuses difficult, and validating documents (passports, visas) was cumbersome. Furthermore, communication between Mutawifs (guides) in the field and pilgrims often broke down.",
    },
    solution: {
      title: "Our Solution",
      // (MODIFIKASI) Diubah ke platform web/dasbor
      text: "Antariks developed 'Umrah and Hajj App', an integrated web-based platform consisting of an Admin Dashboard for management and a companion Mobile App for pilgrims. The app unifies pilgrim data, financials, schedules, and communication into one efficient system.",
      featuresTitle: "Key Features Included:",
      features: [
        {
          name: "Pilgrim & Document Management",
          desc: "Centralized database for passports, visas, payment status, and room manifests.",
        },
        {
          name: "Pilgrim Mobile App",
          desc: "Real-time worship schedules, notifications, prayer guides, and an SOS (emergency) button.",
        },
        {
          name: "Finance Dashboard",
          desc: "Track payments, manage packages, and generate financial reports.",
        },
        {
          name: "Broadcast & Notifications",
          desc: "Instantly send important announcements (e.g., schedule changes) to all pilgrims.",
        },
      ],
    },
    techStack: {
      title: "Technology Stack",
    },
    results: {
      title: "The Results",
      text: "Umrah and Hajj App successfully transformed the client's workflow, improving operational efficiency and pilgrim satisfaction.",
      items: [
        "90% reduction in pilgrim and document data entry errors.",
        "30% increase in pilgrim satisfaction thanks to seamless communication.",
        "100% visibility of group locations via GPS tracking.",
        "2x faster payment confirmation processing.",
      ],
    },
    gallery: {
      // (MODIFIKASI) Judul galeri
      title: "Umrah and Hajj App Dashboard Gallery",
    },
    cta: {
      title: "Ready to Digitize Your Travel Agency?",
      subtitle:
        "Discuss your specific travel management system needs with our AI assistant.",
      button: "Start Consultation (via AI)",
    },
    footer: {
      copyright: "All Rights Reserved.",
    },
  },
};

// -- Komponen Konten Halaman Haji & Umrah --
const HajiUmrahPageContent = () => {
  const { lang } = useContext(LangContext);
  const t = allContent[lang];
  const featureIcons = [Users, Smartphone, MapPin, Bell];
  const resultIcons = [CheckCheck, TrendingUp, UserCheck, Clock];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-gray-900 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-green-400 mb-8">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-center">
            
            <div className="text-gray-300">
              <span className="block text-sm font-bold text-gray-500 uppercase">
                {t.hero.industry}
              </span>
              {t.hero.industryValue}
            </div>
          </div>
        </div>
      </section>

      {/* (MODIFIKASI) Gambar Utama - Layout Web Dashboard */}
      <section className="bg-gray-900 pb-16 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden border-2 border-green-700/50">
            <img
              src="/image/projects/umrah_and_hajj/1.png"
              alt="Umrah and Hajj App Admin Dashboard"
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
      <section className="py-16 md:py-28 bg-gray-900">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Tech Stack */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {t.techStack.title}
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Laravel", // (Tambahan)
                "React", // (MODIFIKASI) Diubah dari React Native
                "Node.js",
                "MySQL",
                "AWS",
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

      {/* (MODIFIKASI) Galeri - Menggunakan rasio web */}
      <section className="py-16 md:py-28 bg-gray-950">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            {t.gallery.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
                src="/image/projects/umrah_and_hajj/2.png"
                alt="Dasbor Manajemen Jamaah"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
                src="/image/projects/umrah_and_hajj/3.png"
                alt="Dasbor Keuangan"
                className="w-full h-auto"
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
            href="/chatbot" // Arahkan ke halaman chatbot
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
export default function HajiUmrahPortfolioPage() {
  

  return (
    
      <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
        <Header />
        <main className="mt-10 md:mt-0">
          <HajiUmrahPageContent />
        </main>
        <Footer />
      </div>
  );
}