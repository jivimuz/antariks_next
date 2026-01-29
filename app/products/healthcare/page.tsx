"use client";

import React, { useState, useContext, createContext } from "react";
// Impor ikon
import {
  Stethoscope,
  Activity,
  CalendarCheck,
  FileText,
  HeartPulse,
  Pill,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  ShieldCheck,
  Monitor,
  Menu,
  X,
  ChevronDown,
  Github,
  Linkedin,
  Instagram,
  MapPin,
  Mail,
  Phone,
  Globe,
  ArrowRight
} from "lucide-react";
import LangContext from "@/context/langContext";
import Header from "@/components/layout/headerComponent";
import Footer from "@/components/layout/footerComponent";

// --- 1. DATA KONTEN (GABUNGAN GLOBAL & LOKAL) ---
const allContent = {
  id: {
    // Data Navigasi (Untuk Header & Footer)
    navLinks: [
      { href: "/#services", label: "Layanan" },
      { href: "/#products", label: "Produk" },
      { href: "/#about", label: "Tentang Kami" },
      { href: "/#location", label: "Lokasi" },
      { href: "/#testimonials", label: "Testimoni" },
      { 
        label: "Karir", 
        href: "#",
        children: [
          { href: "/career", label: "Lowongan Kerja" }
        ]
      }
    ],
    contactCta: "Konsultasi Sekarang",
    footer: {
      copyright: "Seluruh Hak Cipta.",
    },
    // Data Halaman Dental
    hero: {
      title: "Studi Kasus: DentFlow System",
      subtitle: "Sistem Informasi Manajemen Klinik Gigi & Kesehatan Terintegrasi",
      client: "Klien",
      clientValue: "Klinik Gigi Sehat Keluarga",
      industry: "Industri",
      industryValue: "Kesehatan (Healthcare)",
    },
    challenge: {
      title: "Tantangan",
      text: "Klinik menghadapi kendala dalam pengelolaan rekam medis pasien yang masih berbasis kertas (rawan hilang dan rusak). Selain itu, antrian pasien sering menumpuk karena proses pendaftaran yang lambat, dan dokter kesulitan memvisualisasikan kondisi gigi pasien (odontogram) secara digital untuk riwayat perawatan jangka panjang.",
    },
    solution: {
      title: "Solusi Kami",
      text: "Antariks mengembangkan 'DentFlow', sistem manajemen klinik berbasis web (Laravel & jQuery) yang stabil dan cepat. Sistem ini mendigitalkan seluruh perjalanan pasien (patient journey) dari pendaftaran online, pemeriksaan dokter dengan odontogram visual, resep digital ke farmasi, hingga pembayaran di kasir.",
      featuresTitle: "Fitur Unggulan:",
      features: [
        {
          title: "Odontogram Interaktif",
          desc: "Dokter dapat menandai kondisi gigi pada visualisasi rahang 3D/2D secara langsung di layar.",
        },
        {
          title: "Rekam Medis Elektronik (EMR)",
          desc: "Penyimpanan riwayat alergi, diagnosa, dan tindakan medis yang aman dan mudah dicari.",
        },
        {
          title: "Sistem Antrian & Display",
          desc: "Integrasi dengan layar TV ruang tunggu untuk pemanggilan pasien otomatis.",
        },
        {
          title: "Manajemen Farmasi & Stok",
          desc: "Pengurangan stok obat otomatis saat resep ditebus dan peringatan kadaluarsa.",
        },
      ],
    },
    techStack: {
      title: "Teknologi yang Digunakan",
      subtitle: "Dipilih untuk keandalan, keamanan data, dan kecepatan akses di jaringan lokal maupun cloud.",
    },
    results: {
      title: "Dampak Bisnis",
      text: "Transformasi digital ini meningkatkan efisiensi operasional dan kepercayaan pasien secara signifikan.",
      items: [
        "Waktu tunggu pasien berkurang 50% berkat sistem antrian efisien.",
        "Akses rekam medis pasien instan (< 3 detik) oleh dokter.",
        "Eliminasi 100% kesalahan pembacaan resep obat (tulisan tangan).",
        "Laporan pendapatan harian yang akurat dan real-time.",
      ],
    },
    gallery: {
      title: "Galeri Aplikasi",
    },
    cta: {
      title: "Modernisasi Klinik Anda Sekarang",
      subtitle: "Diskusikan kebutuhan sistem manajemen kesehatan Anda bersama konsultan ahli kami.",
      button: "Konsultasi Gratis",
    },
  },
  en: {
    // Navigation Data
    navLinks: [
      { href: "/#services", label: "Services" },
      { href: "/#products", label: "Products" },
      { href: "/#about", label: "About Us" },
      { href: "/#location", label: "Location" },
      { href: "/#testimonials", label: "Testimonials" },
      { 
        label: "Career", 
        href: "#",
        children: [
          { href: "/career", label: "Job Openings" }
        ]
      }
    ],
    contactCta: "Consult Now",
    footer: {
      copyright: "All Rights Reserved.",
    },
    // Dental Page Data
    hero: {
      title: "Case Study: DentFlow System",
      subtitle: "Integrated Dental & Healthcare Clinic Management Information System",
      client: "Client",
      clientValue: "Sehat Keluarga Dental Clinic",
      industry: "Industry",
      industryValue: "Healthcare",
    },
    challenge: {
      title: "The Challenge",
      text: "The clinic faced issues with paper-based medical records (prone to loss and damage). Patient queues often piled up due to slow registration, and doctors struggled to visualize patient dental conditions (odontogram) digitally for long-term treatment history.",
    },
    solution: {
      title: "Our Solution",
      text: "Antariks developed 'DentFlow', a robust web-based clinic management system (Laravel & jQuery). It digitizes the entire patient journey from online registration, doctor examination with visual odontogram, digital prescription to pharmacy, and cashier payment.",
      featuresTitle: "Key Features:",
      features: [
        {
          title: "Interactive Odontogram",
          desc: "Doctors can mark dental conditions on 3D/2D jaw visualizations directly on screen.",
        },
        {
          title: "Electronic Medical Records (EMR)",
          desc: "Secure and searchable storage for allergies, diagnoses, and medical procedures.",
        },
        {
          title: "Queue & Display System",
          desc: "Integration with waiting room TV screens for automated patient calling.",
        },
        {
          title: "Pharmacy & Stock Management",
          desc: "Automatic stock deduction upon prescription redemption and expiry alerts.",
        },
      ],
    },
    techStack: {
      title: "Technology Stack",
      subtitle: "Chosen for reliability, data security, and speed on local or cloud networks.",
    },
    results: {
      title: "Business Impact",
      text: "This digital transformation significantly improved operational efficiency and patient trust.",
      items: [
        "Patient wait times reduced by 50% thanks to efficient queuing.",
        "Instant medical record access (< 3 seconds) for doctors.",
        "100% elimination of prescription reading errors (handwriting).",
        "Accurate and real-time daily revenue reporting.",
      ],
    },
    gallery: {
      title: "Application Gallery",
    },
    cta: {
      title: "Modernize Your Clinic Now",
      subtitle: "Discuss your healthcare management system needs with our expert consultants.",
      button: "Free Consultation",
    },
  },
};

// -- Komponen Konten Halaman Dental --
const DentalPageContent = () => {
  
    const { lang } = useContext(LangContext);
    const t = allContent[lang];
  const featureIcons = [Stethoscope, FileText, Monitor, Pill];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-gray-900 text-center relative overflow-hidden">
        {/* --- Ambient Background Effects --- */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-emerald-400 mb-8">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-center">
            <div className="text-gray-300">
              <span className="block text-sm font-bold text-gray-500 uppercase">
                {t.hero.client}
              </span>
              {t.hero.clientValue}
            </div>
            <div className="text-gray-300">
              <span className="block text-sm font-bold text-gray-500 uppercase">
                {t.hero.industry}
              </span>
              {t.hero.industryValue}
            </div>
          </div>
        </div>

        <br />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden border-2 border-emerald-700/50">
            <img
              src="/image/projects/healthcare/img1.png"
              alt="Dental EMR"
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

              <h3 className="text-xl font-semibold text-emerald-400 mb-4">
                {t.solution.featuresTitle}
              </h3>
              <div className="space-y-4">
                {t.solution.features.map((feature, index) => {
                  const Icon = featureIcons[index] || CheckCircle;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Icon
                        className="text-emerald-500 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <h4 className="font-semibold text-white">
                          {feature.title}
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
         {/* --- Ambient Background Effects --- */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative z-10">
          {/* Tech Stack */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {t.techStack.title}
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Laravel",
                "MySQL",
                "jQuery",
                "Bootstrap 5",
                "AJAX",
                "Chart.js",
                "REST API",
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
              {t.results.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <TrendingUp
                    className="text-emerald-500 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-lg text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Galeri */}
      <section className="py-16 md:py-28 bg-gray-950">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            {t.gallery.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
                src="/image/projects/healthcare/img2.png"
                alt="Antarmuka Odontogram"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
                src="/image/projects/healthcare/img3.png"
                alt="Daftar Pasien (Dummy)"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
                src="/image/projects/healthcare/img4.png"
                alt="Daftar Ruang Tunggu"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
                src="/image/projects/healthcare/img5.png"
                alt="Monitor Antrian"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-28 bg-gray-900 text-center relative overflow-hidden">
         {/* --- Ambient Background Effects --- */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 max-w-2xl relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-lg text-gray-300 mb-8">{t.cta.subtitle}</p>
          <a
            href="/chat"
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
export default function DentalPortfolioPage() {

  const { lang } = useContext(LangContext);
  const t = allContent[lang];

  return (
   
      <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
        <Header />
        <main className="mt-10 md:mt-0">
          <DentalPageContent />
        </main>
        <Footer />
      </div>
  );
}