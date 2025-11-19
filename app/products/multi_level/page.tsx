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
  GitBranch,
  Users,
  DollarSign,
  BarChart,
  Smartphone,
  CheckCheck,
  TrendingUp,
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
      title: "Studi Kasus: Multi Level Agency",
      subtitle:
        "Platform Web Admin & Aplikasi Mobile untuk Manajemen Agensi Multi-Level",
      industry: "Industri",
      industryValue: "Asuransi / Real Estat / MLM",
    },
    challenge: {
      title: "Tantangan",
      text: "Klien kami adalah sebuah perusahaan asuransi besar, kesulitan mengelola jaringan agensi mereka yang kompleks. Perhitungan komisi multi-level (upline/downline) dilakukan secara manual, menyebabkan keterlambatan pembayaran dan kesalahan. Agen di lapangan tidak memiliki visibilitas *real-time* atas performa tim atau potensi komisi mereka.",
    },
    solution: {
      title: "Solusi Kami",
      text: "Antariks merancang sebuah platform ganda. Dasbor Web Admin memungkinkan manajemen untuk membuat aturan komisi yang kompleks dan memvisualisasikan hierarki agensi. Aplikasi Mobile (iOS/Android) memberdayakan agen dengan data *real-time*.",
      featuresTitle: "Fitur Utama Termasuk:",
      features: [
        {
          name: "Dasbor Admin: Visualisasi Hierarki",
          desc: "Tampilan *tree-view* interaktif untuk semua upline dan downline.",
        },
        {
          name: "Dasbor Admin: Mesin Komisi",
          desc: "Mengatur aturan komisi, bonus, dan *overriding* yang kompleks secara dinamis.",
        },
        {
          name: "Aplikasi Agen: Dasbor Performa",
          desc: "Melacak penjualan pribadi, komisi yang diperoleh, dan performa tim (downline).",
        },
        {
          name: "Aplikasi Agen: Alat Rekrutmen",
          desc: "Generator tautan referral unik dan materi pelatihan digital untuk agen baru.",
        },
      ],
    },
    techStack: {
      title: "Tumpukan Teknologi (Bisa sesuai permintaan)",
    },
    results: {
      title: "Hasilnya",
      text: "Multi Level Agency mengotomatiskan proses bisnis inti klien dan meningkatkan retensi agen.",
      items: [
        "Perhitungan komisi 100% otomatis, mengurangi waktu proses dari 5 hari menjadi 5 menit.",
        "Peningkatan 40% dalam rekrutmen agen baru melalui aplikasi mobile.",
        "Akurasi data penjualan 99.9% di seluruh jaringan.",
        "Transparansi komisi penuh meningkatkan kepercayaan dan motivasi agen.",
      ],
    },
    gallery: {
      adminTitle: "Galeri Dasbor",
    },
    cta: {
      title: "Siap Mengelola Jaringan Anda?",
      subtitle:
        "Diskusikan kebutuhan sistem manajemen agensi Anda dengan asisten AI kami.",
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
      title: "Case Study: Multi Level Agency",
      subtitle:
        "Web Admin & Mobile App Platform for Multi-Level Agency Management",
      industry: "Industry",
      industryValue: "Insurance / Real Estate / MLM",
    },
    challenge: {
      title: "The Challenge",
      text: "Our client is a large insurance company, struggled to manage their complex agency network. Multi-level commission calculations (upline/downline) were done manually, causing payment delays and errors. Agents in the field had no real-time visibility into their team's performance or commission potential.",
    },
    solution: {
      title: "Our Solution",
      text: "Antariks designed a dual platform. The Web Admin Dashboard allows management to create complex commission rules and visualize the agency hierarchy. The Mobile App (iOS/Android) empowers agents with real-time data.",
      featuresTitle: "Key Features Included:",
      features: [
        {
          name: "Admin Dashboard: Hierarchy Visualization",
          desc: "Interactive tree-view display of all uplines and downlines.",
        },
        {
          name: "Admin Dashboard: Commission Engine",
          desc: "Dynamically set complex commission rules, bonuses, and overrides.",
        },
        {
          name: "Agent App: Performance Dashboard",
          desc: "Track personal sales, earned commissions, and team (downline) performance.",
        },
        {
          name: "Agent App: Recruitment Tools",
          desc: "Unique referral link generator and digital training materials for new agents.",
        },
      ],
    },
    techStack: {
      title: "Technology Stack (Can be by request)",
    },
    results: {
      title: "The Results",
      text: "Multi Level Agency automated the client's core business processes and improved agent retention.",
      items: [
        "100% automated commission calculation, reducing processing time from 5 days to 5 minutes.",
        "40% increase in new agent recruitment via the mobile app.",
        "99.9% sales data accuracy across the entire network.",
        "Full commission transparency boosted agent trust and motivation.",
      ],
    },
    gallery: {
      adminTitle: "Dashboard Gallery ",
    },
    cta: {
      title: "Ready to Manage Your Network?",
      subtitle:
        "Discuss your specific agency management system needs with our AI assistant.",
      button: "Start Consultation (via AI)",
    },
    footer: {
      copyright: "All Rights Reserved.",
    },
  },
};


// -- Komponen Konten Halaman MLA --
const MLAPageContent = () => {
  const { lang } = useContext(LangContext);
  const t = allContent[lang];
  const featureIcons = [GitBranch, DollarSign, Smartphone, Users];
  const resultIcons = [Clock, TrendingUp, CheckCheck, Users];

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
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-center ">
            {/* Industri */}
            <div className="text-gray-300">
              <span className="block text-sm font-bold text-gray-500 uppercase">
                {t.hero.industry}
              </span>
              {t.hero.industryValue}
            </div>
          </div>
        </div>
      </section>

      {/* (MODIFIKASI) Galeri Gambar Utama - Menampilkan Web & Mobile */}
      <section className="bg-gray-900 pb-16 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Kiri: Mockup Mobile */}
            <div className="relative mx-auto w-72 max-w-xs bg-gray-800 rounded-[2.5rem] shadow-2xl p-4 border-4 border-gray-700 lg:order-1">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20 border-b-4 border-l-4 border-r-4 border-gray-700"></div>
              <div className="w-full h-[550px] bg-gray-950 rounded-[2rem] overflow-hidden shadow-inner">
                <img
                  src="/image/projects/mla/1.jpg"
                  alt="MLA Agent Mobile App"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Kanan: Dasbor Web */}
            <div className="lg:col-span-2 lg:order-2">
              <div className="max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden border-2 border-green-700/50">
                <img
                  src="/image/projects/mla/5.png"
                  alt="Multi Level Agency Admin Dashboard"
                  className="w-full h-auto"
                />
              </div>
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
                "Jquery (Admin)",
                "React Native (Agent)",
                "Laravel",
                "MySQL",
                "Rest API",
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

      {/* Galeri - Menampilkan Keduanya */}
      <section className="py-16 md:py-28 bg-gray-950">
        <div className="container mx-auto px-6">
          {/* Galeri Admin Web */}
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            {t.gallery.adminTitle}
          </h2>
          <div className="flex flex-grow mb-16 text-center justify-center align-center">
            <div className="rounded-lg mr-2 overflow-hidden shadow-lg border border-gray-800">
              <img
                src="/image/projects/mla/4.png"
                alt="Dasbor Analitik Komisi"
                className="w-full h-auto max-h-100"
              />
            </div>
           
          
            {/* Placeholder 3 */}
            <div className="rounded-lg mr-2 overflow-hidden shadow-lg border border-gray-800 max-w-xs justify-center align-center">
              <img
                src="/image/projects/mla/2.jpg"
                alt="Jaringan Downline"
                className="w-full h-auto max-h-100"
              />
            </div>
            {/* Placeholder 4 */}
            <div className="rounded-lg mr-2 overflow-hidden shadow-lg border border-gray-800 max-w-xs justify-center align-center">
              <img
                src="/image/projects/mla/3.jpg"
                alt="Alat Rekrutmen"
                className="w-full h-auto max-h-100"
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
export default function MLAPortfolioPage() {

  return (
      <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
        <Header />
        <main>
          <MLAPageContent />
        </main>
        <Footer />
      </div>
  );
}