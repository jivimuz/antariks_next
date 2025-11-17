"use client"; // Diperlukan untuk hooks

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
// Impor ikon
import {
  Github,
  Linkedin,
  Lightbulb, // Untuk Inovasi
  Gem, // Untuk Kualitas
  Users, // Untuk Kemitraan
  ShieldCheck, // Untuk Integritas
  Target, // Untuk Misi
  Eye, // Untuk Visi
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
      title: "Tentang Antariks",
      subtitle:
        "Arsitek di Balik Solusi Digital Anda. Kami lebih dari sekadar pengembang; kami adalah mitra strategis Anda dalam inovasi.",
    },
    story: {
      title: "Kisah Kami",
      p1: "Didirikan pada tahun 2022 dari semangat bersama untuk teknologi dan pemecahan masalah, Antariks (PT. Antariks Global Technology) dimulai sebagai tim kecil developer dan desainer. Kami melihat banyak bisnis di Cirebon dan sekitarnya kesulitan beradaptasi dengan era digital.",
      p2: "Pada tahun 2025, kami resmi terdaftar sebagai PT untuk melebarkan sayap. Misi kami tetap sama: menjembatani kesenjangan antara ide bisnis yang brilian dan eksekusi teknis yang sempurna. Kami percaya bahwa software yang hebat dibangun di atas kode yang bersih, desain yang fungsional, dan pemahaman mendalam tentang tujuan bisnis klien.",
    },
    mission: {
      title: "Misi & Visi Kami",
      mision_title: "Misi",
      // (DIUBAH) Misi sekarang adalah array berdasarkan gambar
      mision_descs: [
        "Mengembangkan produk dan layanan teknologi berkualitas tinggi, aman, dan mudah diimplementasikan.",
        "Memberikan pengalaman layanan yang responsif dan profesional melalui kolaborasi transparan dengan setiap klien.",
        "Mendorong adopsi teknologi modern yang efisien untuk meningkatkan kinerja dan produktivitas bisnis.",
        "Membangun budaya inovatif yang berfokus pada peningkatan kualitas, integritas, dan keberlanjutan.",
        "Menjadi mitra strategis yang andal dalam perjalanan transformasi digital perusahaan.",
      ],
      vision_title: "Visi",
      // (DIUBAH) Visi diperbarui berdasarkan gambar
      vision_desc:
        "Menjadi penyedia solusi teknologi terkemuka yang memberikan inovasi efektif, andal, dan berkelanjutan untuk mendukung transformasi digital di berbagai sektor industri.",
    },
    values: {
      title: "Nilai-Nilai Inti Kami",
      subtitle:
        "Prinsip yang memandu setiap baris kode, setiap desain, dan setiap interaksi klien.",
      items: [
        {
          name: "Inovasi",
          desc: "Kami tidak hanya mengikuti tren; kami menerapkannya untuk memecahkan masalah nyata.",
        },
        {
          name: "Kualitas",
          desc: "Dari kode backend hingga piksel frontend, kami terobsesi dengan standar tertinggi.",
        },
        {
          name: "Kemitraan",
          desc: "Kesuksesan Anda adalah kesuksesan kami. Kami bekerja bersama Anda, bukan untuk Anda.",
        },
        {
          name: "Integritas",
          desc: "Transparansi, kejujuran, dan keandalan adalah fondasi dari setiap proyek.",
        },
      ],
    },
    team: {
      title: "Temui Founder Kami",
      subtitle:
        "Orang di balik visi dan teknologi Antariks.",
      members: [
        {
          name: "Jivi Muzaqi Guntur",
          role: "CEO & Founder",
          img: "/image/executive/jv.jpg",
        },
      
      ],
    },
    cta: {
      title: "Siap Berkolaborasi?",
      subtitle:
        "Mari kita diskusikan bagaimana tim kami dapat membantu mewujudkan visi Anda.",
      button: "Mulai Proyek Anda",
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
      title: "About Antariks",
      subtitle:
        "The Architects Behind Your Digital Solutions. We are more than developers; we are your strategic partners in innovation.",
    },
    story: {
      title: "Our Story",
      p1: "Founded in 2022 from a shared passion for technology and problem-solving, Antariks (PT. Antariks Global Technology) began as a small team of developers and designers. We saw many businesses in Cirebon and beyond struggling to adapt to the digital age.",
      p2: "In 2025, we officially registered as a PT (Private Limited Company) to expand our reach. Our mission remains the same: to bridge the gap between brilliant business ideas and flawless technical execution. We believe great software is built on clean code, functional design, and a deep understanding of our client's business goals.",
    },
    mission: {
      title: "Our Mission & Vision",
      mision_title: "Mission",
      // (CHANGED) Mission is now an array based on the image
      mision_descs: [
        "Developing high-quality, secure, and easily implementable technology products and services.",
        "Providing a responsive and professional service experience through transparent collaboration with every client.",
        "Encouraging the adoption of efficient modern technologies to enhance business performance and productivity.",
        "Building an innovative culture focused on quality improvement, integrity, and sustainability.",
        "Becoming a reliable strategic partner in the company's digital transformation journey.",
      ],
      vision_title: "Vision",
      // (CHANGED) Vision updated based on the image
      vision_desc:
        "To be a leading technology solutions provider that delivers effective, reliable, and sustainable innovations to support digital transformation across various industrial sectors.",
    },
    values: {
      title: "Our Core Values",
      subtitle:
        "The principles that guide every line of code, every design, and every client interaction.",
      items: [
        {
          name: "Innovation",
          desc: "We don't just follow trends; we apply them to solve real-world problems.",
        },
        {
          name: "Quality",
          desc: "From backend code to frontend pixels, we are obsessed with the highest standards.",
        },
        {
          name: "Partnership",
          desc: "Your success is our success. We work with you, not just for you.",
        },
        {
          name: "Integrity",
          desc: "Transparency, honesty, and reliability are the foundation of every project.",
        },
      ],
    },
    team: {
      title: "Meet Our Team",
      subtitle:
        "The people behind the vision and technology of Antariks.",
      members: [
          {
          name: "Jivi Muzaqi Guntur",
          role: "CEO & Founder",
          img: "/image/executive/jv.jpg",
        },
       
      ],
    },
    cta: {
      title: "Ready to Collaborate?",
      subtitle:
        "Let's discuss how our team can help bring your vision to life.",
      button: "Start Your Project",
    },
    footer: {
      copyright: "All Rights Reserved.",
    },
  },
};

// -- Context Bahasa --

// -- Komponen Konten Halaman Tentang Kami --
const AboutUsPageContent = () => {
  const { lang } = useContext(LangContext);
  const t = allContent[lang];
  const valueIcons = [Lightbulb, Gem, Users, ShieldCheck];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-gray-900 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-green-400 max-w-3xl mx-auto">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Kisah & Misi/Visi */}
      <section className="py-16 md:py-28 bg-gray-950">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Kisah Kami */}
            <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {t.story.title}
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>{t.story.p1}</p>
                <p>{t.story.p2}</p>
              </div>
            </div>

            {/* Misi & Visi */}
            <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {t.mission.title}
              </h2>
              <div className="space-y-6">
                  {/* Visi */}
                <div className="flex items-start gap-4 pt-6 border-t border-gray-800">
                  <Eye
                    className="text-green-500 mt-1 flex-shrink-0"
                    size={24}
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {t.mission.vision_title}
                    </h3>
                    <p className="text-gray-300 text-lg">
                      {t.mission.vision_desc}
                    </p>
                  </div>
                </div>
                {/* (MODIFIKASI) Render Misi sebagai List */}
                <div className="flex items-start gap-4 ">
                  <Target
                    className="text-green-500 mt-1 flex-shrink-0"
                    size={24}
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {t.mission.mision_title}
                    </h3>
                    <ul className="space-y-2 list-disc list-inside text-gray-300 text-lg">
                      {t.mission.mision_descs.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai-Nilai Kami */}
      <section className="py-16 md:py-28 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.values.title}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t.values.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {t.values.items.map((item, index) => {
              const Icon = valueIcons[index] || ShieldCheck;
              return (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 text-center transition-all duration-300 hover:border-green-500 hover:shadow-green-500/10"
                >
                  <Icon
                    className="text-green-400 mx-auto mb-4"
                    size={40}
                    strokeWidth={1.5}
                  />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tim Kami */}
      <section className="py-16 md:py-28 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.team.title}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t.team.subtitle}
            </p>
          </div>
          <div className="grid  mx-auto justify-center align-center">
            {t.team.members.map((member, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl shadow-xl border border-gray-800 overflow-hidden text-center group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-green-400 mb-4">{member.role}</p>
                  <a
                    href="https://www.linkedin.com/in/jivimuz" // Ganti dengan URL LinkedIn asli
                    target="_blank"
                    className="text-gray-500 hover:text-green-400 transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin size={24} className="mx-auto" />
                  </a>
                </div>
              </div>
            ))}
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
export default function AboutUsPage() {

  return (
    
      <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
        <Header />
        <main className="mt-10 md:mt-0">
          <AboutUsPageContent />
        </main>
        <Footer />
      </div>
  );
}