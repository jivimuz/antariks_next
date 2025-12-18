"use client"; // Diperlukan untuk Next.js App Router agar bisa menggunakan hooks

import React, { useState, useEffect, useContext } from "react";
// (BARU) Import Head untuk menambahkan link CDN
// ERROR: 'next/head' tidak dapat di-resolve di lingkungan ini, akan dihapus.
// import Head from "next/head";
import {
  Code,
  Smartphone,
  PenTool,
  ChevronLeft,
  ChevronRight,
  Quote,
  Github,
  Linkedin,
  ArrowRight,
  Database,
  Cloud,
  MapPin,
  Video,
  ShoppingBag,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import LangContext, { allContent } from "@/context/langContext";
import Header from "@/components/layout/headerComponent";
import Footer from "@/components/layout/footerComponent";

// -- Data Bilingual untuk Produk dan Testimoni --
const products = [
  {
    title: {
      id: "Dental Care",
      en: "Dental Care",
    },
    description: {
      id: "Sistem manajemen klinik gigi terintegrasi yang menggunakan teknologi 3D mapping untuk visualisasi gigi pasien, memudahkan perencanaan perawatan, monitoring, dan rekam medis digital.",
      en: "An integrated dental clinic management system leveraging 3D mapping technology for patient teeth visualization, facilitating treatment planning, monitoring, and digital medical record management.",
    },
    imageUrl: "https://img.freepik.com/free-photo/team-female-dentists-treating-patients-teeth-visit-dentist-dentistry_169016-67227.jpg",
  },
  {
    title: {
      id: "Multi Level Agency System",
      en: "Multi Level Agency System",
    },
    description: {
      id: "Platform Multi Level Agency untuk Perusahaan yang mengelola agen, komisi, dan paket perjalanan secara efisien, otomatisasi tracking downline, verifikasi pembayaran, dan distribusi bonus.",
      en: "A comprehensive Multi Level Agency platform for Company to manage agents, commissions, and travel packages efficiently, automating downline tracking, payment verification, and bonus distribution.",
    },
    imageUrl: "https://img.freepik.com/free-photo/business-team-raising-hands-up-celebrating-victory-front-office_1150-2540.jpg",
  },
  {
    title: {
      id: "Hospital Management System",
      en: "Hospital Management System",
    },
    description: {
      id: "Sistem manajemen rumah sakit terintegrasi untuk menyederhanakan pelayanan pasien dengan koneksi BPJS dan Satu Sehat, mengotomatisasi administrasi dan manajemen rekam medis.",
      en: "An integrated Hospital Management System streamlining patient care with BPJS and Satu Sehat integration, automating administrative tasks and medical record management.",
    },
    imageUrl: "https://img.freepik.com/free-photo/side-view-doctor-working-laptop_23-2148231360.jpg",
  },
  {
    title: {
      id: "Manufacture Execution System (MES)",
      en: "Manufacture Execution System (MES)",
    },
    description: {
      id: "Sistem MES berbasis web untuk perusahaan manufaktur untuk memonitor, melacak, dan mengontrol produksi secara real-time, meningkatkan produktivitas dan efisiensi.",
      en: "A web-based Manufacturing Execution System for manufacturing companies to monitor, track, and control production in real-time, enhancing productivity and efficiency.",
    },
    imageUrl: "https://img.freepik.com/free-photo/portrait-businesswoman-owner_23-2148828328.jpg",
  },
  {
    title: {
      id: "Enterprise Resouces Planning (ERP)",
      en: "Enterprise Resouces Planning (ERP)",
    },
    description: {
      id: "Sistem ERP berbasis web untuk perusahaan manufaktur, mengoptimalkan operasi, produksi, dan akses data real-time antar departemen.",
      en: "A web-based ERP system for manufacturing companies, optimizing operations, production, and providing real-time data access across departments.",
    },
    imageUrl: "https://img.freepik.com/free-photo/factory-workers-checking-quality-products-large-industrial-hall_342744-160.jpg",
  },
  {
    title: {
      id: "Umrah & Hajj Jamaah Management System",
      en: "Umrah & Hajj Jamaah Management System",
    },
    description: {
      id: "Sistem manajemen jamaah berbasis web untuk pendaftaran, perencanaan itinerari, dan pengelolaan dokumen, memudahkan tracking dan pelayanan personal.",
      en: "A web-based Umrah and Hajj management system to simplify pilgrim registration, itinerary planning, and document management, ensuring efficient tracking and personalized service.",
    },
    imageUrl: "https://img.freepik.com/free-photo/row-people-various-ages-patient-waiting-see-doctor_632498-1148.jpg",
  },
  {
    title: {
      id: "Human Resource Information System (HRIS)",
      en: "Human Resource Information System (HRIS)",
    },
    description: {
      id: "memungkinkan akses HR seperti absensi, cuti, dan profil karyawan dengan pengalaman yang responsif dan mudah digunakan.",
      en: "providing seamless access to HR functions such as attendance, leave requests, and employee profiles with a responsive, user-friendly experience.",
    },
    imageUrl: "https://img.freepik.com/free-photo/business-team-working-cafe-table_1262-3704.jpg",
  },
  {
    title: {
      id: "Financing Analysis System",
      en: "Financing Analysis System",
    },
    description: {
      id: "Sistem analisis pembiayaan koperasi berbasis web untuk evaluasi pinjaman, tracking pembayaran, dan analisis kesehatan finansial anggota.",
      en: "A web-based Cooperative Financing Analysis System to evaluate loans, track repayments, and assess members' financial health.",
    },
    imageUrl: "https://img.freepik.com/free-photo/business-meeting-office_1268-21531.jpg",
  },
  // {
  //   title: {
  //     id: "Patient Registration & Hospital Info App",
  //     en: "Patient Registration & Hospital Info App",
  //   },
  //   description: {
  //     id: "Aplikasi mobile untuk registrasi pasien dan informasi rumah sakit, mempermudah booking janji, akses rekam medis, dan update penting.",
  //     en: "A mobile application for patient registration and hospital information, streamlining appointments, medical record access, and important updates.",
  //   },
  //   imageUrl: "https://img.freepik.com/free-photo/happiness-cheerful-elderly-woman-men-talking-with-female-caregiver-nurse-doctor-having-health-checking-consult-living-areacaretakers-with-senior-couple-sitting-living-room-nursing-home_609648-3092.jpg",
  // },
];

const testimonials = [
  {
    quote: {
      id: "Tim ini mengubah ide mentah kami menjadi produk yang fungsional dan indah. Profesionalisme dan keahlian teknis mereka tidak tertandingi.",
      en: "This team turned our raw idea into a functional, beautiful product. Their professionalism and technical expertise are unmatched.",
    },
    name: "Anya Forger",
    title: "CEO, TechNova Solutions",
  },
  {
    quote: {
      id: "Proses pengembangan sangat transparan. Kami selalu tahu progresnya, dan hasil akhirnya melebihi ekspektasi kami.",
      en: "The development process was incredibly transparent. We always knew the progress, and the final result exceeded our expectations.",
    },
    name: "Loid Hendriks",
    title: "CTO, DigitalFrontiers",
  },
  {
    quote: {
      id: "Bukan hanya pengembang, mereka adalah mitra strategis. Mereka memberikan wawasan berharga yang membantu membentuk produk kami.",
      en: "They aren't just developers; they are strategic partners. They provided valuable insights that helped shape our product.",
    },
    name: "Yor Briar",
    title: "Product Manager, InnoVentures",
  },
];

// -- Komponen Hero dengan Animasi Mengetik --
const Hero = () => {
  const { t } = useContext(LangContext);
  const [typedText, setTypedText] = useState("");
  const textToType = t.hero.typing; // Mengambil dari context
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delay = 2000;

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    const type = () => {
      const currentText = textToType.substring(0, index);
      setTypedText(currentText);

      if (!isDeleting) {
        // Mengetik
        if (index < textToType.length) {
          index++;
          timeoutId = setTimeout(type, typingSpeed);
        } else {
          // Sudah penuh, tunggu delay sebelum mulai delete
          isDeleting = true;
          timeoutId = setTimeout(type, delay);
        }
      } else {
        // Menghapus
        if (index > 0) {
          index--;
          timeoutId = setTimeout(type, deletingSpeed);
        } else {
          // Sudah kosong, mulai mengetik lagi
          isDeleting = false;
          timeoutId = setTimeout(type, typingSpeed);
        }
      }
    };

    timeoutId = setTimeout(type, 500); // delay awal
    return () => clearTimeout(timeoutId);
  }, [textToType]);


  return (<>

    <section
      id="home"
      // (DARI KODE ANDA) Menambahkan class parallax dan bg-cover
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-center overflow-hidden parallax"
      // (DARI KODE ANDA) Menambahkan style backgroundImage
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')"
      }}
    >
      <div className="absolute inset-0 bg-gray-900/70"></div>
      {/* Animasi Latar Belakang (Floating Code Snippets) */}
      <div className="absolute inset-0 z-0 ">
        <span className="absolute text-green-500 top-1/4 left-1/4 text-2xl animate-float">
          &lt;/&gt;
        </span>
        <span className="absolute text-green-500 top-1/2 left-3/4 text-xl animate-float-delay-1">
          &#123;...&#125;
        </span>
        <span className="absolute text-green-500 top-3/4 left-1/2 text-3xl animate-float-delay-2">
          [ ]
        </span>
        <span className="absolute text-green-500 top-1/3 left-1/2 text-lg animate-float">
          0101
        </span>
        <span className="absolute text-green-500 top-2/3 left-1/4 text-2xl animate-float-delay-1">
          const
        </span>
        <span className="absolute text-green-500 top-1/2 left-1/4 text-2xl animate-float">
          &lt;/&gt;
        </span>
        <span className="absolute text-green-500 top-1/4 left-3/4 text-xl animate-float-delay-1">
          &#123;...&#125;
        </span>
        <span className="absolute text-green-500 top-1/3 left-2/3 text-3xl animate-float-delay-2">
          [ ]
        </span>
        <span className="absolute text-green-500 top-3/4 left-2/3 text-lg animate-float">
          0101
        </span>
        <span className="absolute text-green-500 top-1/3 left-3/4 text-2xl animate-float-delay-1">
          const
        </span>
      </div>

      <div className="relative z-10 p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
          {t.hero.heading1}
          <br />
          <span className="text-green-400 h-20 md:h-24 block">
            {typedText}
            <span className="inline-block w-1 h-10 md:h-14 bg-emerald-400 ml-1 animate-pulse"></span>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl mx-auto">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col md:flex-row w-full">
          <a
            href="/chat"
            className="bg-emerald-600 m-1 w-full text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg shadow-green-600/30 transition-all duration-300 hover:bg-emerald-500 hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-1 transform"
          >
            {t.hero.cta}
          </a>

          <a
            href="/cp"
            className="bg-blue-600 m-1 w-full text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg shadow-green-600/30 transition-all duration-300 hover:bg-blue-500 hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-1 transform"
          >
            Company Profile
          </a>
        </div>

      </div>
      
    </section>
    {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none ">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -70 1440 350"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[100px] " >
        <path fill="#030712"  d="M0,160L40,176C80,192,160,224,240,202.7C320,181,400,107,480,106.7C560,107,640,181,720,218.7C800,256,880,256,960,245.3C1040,235,1120,213,1200,181.3C1280,149,1360,107,1400,85.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
      </svg>
    </div> */}
  </>
  );
};

const Services = () => {
  const { t } = useContext(LangContext);
  
  const serviceItems = [
    { icon: Code, ...t.services.items[0] },
    { icon: Smartphone, ...t.services.items[1] },
    { icon: Cloud, ...t.services.items[2] },
    { icon: PenTool, ...t.services.items[3] },
    { icon: Database, ...t.services.items[4] },
    { icon: ArrowRight, ...t.services.items[5] }, // Asumsi item terakhir ada
  ];

  return (
    <section id="services" className="relative py-20 md:py-28 bg-gray-900 overflow-hidden">
      
      {/* --- 1. Elemen Dekoratif Latar Belakang (Ambient Glow) --- */}
      {/* Bola cahaya hijau samar di kiri atas */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      {/* Bola cahaya hijau samar di kanan bawah */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      
      {/* Grid Pattern Halus (Opsional, menambah tekstur) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 inline-block relative">
            {t.services.title}
            {/* Garis hiasan di bawah judul */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-500 rounded-full"></div>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-6">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((item, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-500 ease-out hover:-translate-y-2"
            >
              {/* Efek Gradient Hover di Background Kartu */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Konten Kartu */}
              <div className="relative z-10">
                {/* Icon Wrapper yang lebih keren */}
                <div className="w-14 h-14 mb-6 rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center group-hover:border-green-500/50 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300">
                  <item.icon
                    size={28}
                    className="text-gray-300 group-hover:text-green-400 transition-colors duration-300"
                  />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Dekorasi panah kecil atau garis saat hover (Opsional) */}
                <div className="mt-6 w-8 h-1 bg-gray-700 rounded-full group-hover:w-full group-hover:bg-green-500 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// (BARU) Komponen Tech Stack
const TechStack = () => {
  const { t } = useContext(LangContext);
  const techs = [
    // { name: "PHP", icon: "devicon-php-plain text-blue-300" },
    // { name: "JavaScript", icon: "devicon-javascript-plain text-yellow-300" },
    { name: "Laravel", icon: "devicon-laravel-plain text-red-400" },
    { name: "CodeIgniter", icon: "devicon-codeigniter-plain text-red-500" },
    { name: "Node.js", icon: "devicon-nodejs-plain text-green-400" },
    { name: "React", icon: "devicon-react-original text-blue-400" },
    { name: "Vue.js", icon: "devicon-vuejs-plain text-green-400" },
    { name: "React Native", icon: "devicon-react-original text-blue-400" },
    { name: "Electron", icon: "devicon-electron-original text-blue-200" },
    { name: "Express.js", icon: "devicon-express-original text-gray-300" },
    { name: "Next.js", icon: "devicon-nextjs-original text-white" },
    { name: "Python", icon: "devicon-python-plain text-yellow-300" },
    { name: "MySQL", icon: "devicon-mysql-plain text-blue-300" },
    { name: "MS SQL", icon: "devicon-microsoftsqlserver-plain text-red-400" },
    // { name: "Oracle", icon: "devicon-oracle-original text-red-500" },
    { name: "Java", icon: "devicon-java-plain text-orange-400" },
    { name: "TypeScript", icon: "devicon-typescript-plain text-blue-400" },
    // { name: "Figma", icon: "devicon-figma-plain text-purple-400" },
    // { name: "Docker", icon: "devicon-docker-plain text-blue-400" },
    // { name: "Git", icon: "devicon-git-plain text-orange-500" },
    // { name: "AWS", icon: "devicon-amazonwebservices-original text-orange-400" },
  ];

  return (
    <section id="tech-stack" className="py-20 md:py-28 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.techStack.title}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t.techStack.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 md:gap-8">
          {techs.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center p-5 bg-gray-900/60 backdrop-blur rounded-2xl border border-gray-800 shadow-xl hover:border-emerald-500/40 hover:shadow-emerald-500/10 transition-all duration-300"
            >
              <i
                className={`${tech.icon} text-5xl text-blue-300 group-hover:text-blue-400 transition-all`}
              ></i>
              <span className="mt-3 text-sm font-medium text-gray-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// -- Komponen Slider Produk --
const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Mock data context jika belum ada, pastikan sesuaikan dengan context asli Anda
  const { lang, t } = useContext(LangContext); 
  
  // Asumsi data products diambil dari props atau context, disini saya pakai variabel dummy untuk struktur
  // Pastikan variabel 'products' tersedia di scope ini
  
  const prevSlide = () => {
    setCurrentIndex(
      currentIndex === 0 ? products.length - 1 : currentIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex(
      currentIndex === products.length - 1 ? 0 : currentIndex + 1
    );
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  return (
    <section id="products" className="relative py-20 md:py-28 bg-gray-900 overflow-hidden">
      
      {/* --- 1. Ambient Background Effects (Sama seperti Services) --- */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 inline-block relative">
            {t.products.title}
            <div className="absolute -bottom-2 right-0 w-16 h-1 bg-emerald-500 rounded-full"></div>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
            {t.products.subtitle}
          </p>
        </div>

        {/* --- Slider Utama --- */}
        <div className="relative max-w-5xl mx-auto group">
          
          {/* Main Card Container */}
          <div className="overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 relative">
            
            {/* Slider Track */}
            <div
              className="flex transition-transform duration-700 ease-out will-change-transform"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products.map((product, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 min-w-full bg-gray-900/60"
                >
                  <div className="flex flex-col md:flex-row h-auto md:h-[500px] ">
                    
                    {/* -- Bagian Gambar -- */}
                    <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden group-hover:shadow-inner">
                      {/* Image dengan Scale Effect */}
                      <div 
                        className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 ease-in-out scale-100 hover:scale-110"
                        style={{ backgroundImage: `url('${product.imageUrl}')` }}
                      ></div>
                      
                      {/* Overlay Gradient agar teks terbaca jika gambar gelap & transisi halus ke bagian teks */}
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-900 via-transparent to-transparent opacity-80 md:opacity-100"></div>
                      
                      {/* Badge/Tag Keren di pojok gambar */}
                      <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
                        <ShoppingBag size={12} className="text-emerald-400" />
                        BEST SELLER
                      </div>
                    </div>

                    {/* -- Bagian Konten Teks -- */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center  md:bg-transparent relative">
                      {/* Garis dekoratif vertikal */}
                      <div className="hidden md:block absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

                      <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mb-4">
                        {product.title[lang]}
                      </h3>
                      
                      <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        {product.description[lang]}
                      </p>

                      {/* Tombol Action Dummy */}
                      <button className="w-fit group/btn flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40">
                        Lihat Detail
                        <ArrowUpRight size={18} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- Navigasi Arrows (Floating & Glassy) --- */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-gray-800/50 backdrop-blur-md border border-gray-600 text-white p-4 rounded-full hover:bg-emerald-500 hover:border-emerald-500 hover:scale-110 transition-all duration-300 shadow-lg z-20 group-hover:opacity-100 md:opacity-0"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-gray-800/50 backdrop-blur-md border border-gray-600 text-white p-4 rounded-full hover:bg-emerald-500 hover:border-emerald-500 hover:scale-110 transition-all duration-300 shadow-lg z-20 group-hover:opacity-100 md:opacity-0"
          >
            <ChevronRight size={24} />
          </button>

          {/* --- Navigasi Dots (Indikator) --- */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentIndex === index
                    ? "w-8 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    : "w-2 bg-gray-600 hover:bg-gray-500"
                }`}
              ></button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// -- Komponen Tentang Kami (About Us) dengan Animasi Matrix --
const AboutUs = () => {
  const { t } = useContext(LangContext);
  return (
    <section id="about" className="py-20 md:py-28 bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Sisi Kiri: Teks */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t.about.title} <span className="text-green-400">Antariks</span>
            </h2>
            <p className="text-lg text-gray-300 mb-4">{t.about.p1}</p>
            <p className="text-lg text-gray-300 mb-8">{t.about.p2}</p>
            <a
              href="/chat"
              className="text-green-400 font-semibold text-lg group"
            >
              {t.about.cta}
              <ArrowRight className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-2" />
            </a>
          </div>

          {/* Sisi Kanan: Animasi Matrix */}
          <div className="lg:w-1/2 w-full h-80 lg:h-96 relative">
            <div className="absolute inset-0 bg-emerald-900/10 rounded-xl overflow-hidden">
              {/* Animasi Matrix Sederhana */}
              <div className="absolute inset-0 grid grid-cols-20 gap-1 opacity-20">
                {Array.from({ length: 400 }).map((_, i) => (
                  <span
                    key={i}
                    className="text-green-500 text-xs font-mono animate-matrix"
                    style={{
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${Math.random() * 5 + 3}s`,
                    }}
                  >
                    {Math.random() > 0.5 ? "0" : "1"}
                  </span>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Code
                  size={120}
                  className="text-green-400 opacity-30 transform rotate-12"
                />
              </div>
            </div>
            <div className="absolute inset-4 bg-gray-900 rounded-lg shadow-2xl flex items-center justify-center p-6">
              <p className="text-gray-300 text-xl font-mono text-center">
                <span className="text-green-400">if</span> (<span style={{ color: "#993222" }}>problem</span>) &#123;
                <br />
                &nbsp;&nbsp;Antariks.<span style={{ color: "yellow" }}>solve</span>();
                <br />
                &#125; <span className="text-green-400">else</span> &#123;
                <br />
                &nbsp;&nbsp;Antariks.<span style={{ color: "#2866d1" }}>innovate</span>();
                <br />
                &#125;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VideoSection = () => {
  const { t } = useContext(LangContext);

  const videos = [
    {
      url: "https://www.youtube.com/embed/9rwxMmwsUS8?controls=0&autoplay=1&mute=1&playsinline=1&loop=1&playlist=9rwxMmwsUS8",
      label: "Implementation Video 1"
    },
    {
      url: "https://www.youtube.com/embed/1N4LrvYZcoo?controls=0&autoplay=1&mute=1&playsinline=1&loop=1&playlist=1N4LrvYZcoo",
      label: "Implementation Video 2"
    }
  ];

  return (
    <section id="videos" className="relative py-20 md:py-28  overflow-hidden">
      
      {/* --- 1. Ambient Background (Konsisten dengan section lain) --- */}

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-gray-800/50 border border-gray-700 shadow-lg backdrop-blur-sm">
            <Video size={24} className="text-emerald-400" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.video.title}
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t.video.subtitle}
          </p>
        </div>

        {/* Grid Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {videos.map((video, index) => (
            <div key={index} className="group relative">
              
              {/* Efek Glow di belakang video saat hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-70 transition duration-500 group-hover:duration-200"></div>
              
              {/* Container Video Utama */}
              <div className="relative rounded-2xl bg-gray-900 ring-1 ring-gray-700 overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.01]">
                
                {/* Header Bar ala Window (Opsional - memberi kesan aplikasi) */}
                <div className="h-8 bg-gray-800/90 border-b border-gray-700 flex items-center px-4 space-x-2 backdrop-blur-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-2 text-xs text-gray-500 font-mono uppercase tracking-wider">
                    {video.label}
                  </span>
                </div>

                {/* Wrapper Iframe 16:9 */}
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    src={video.url}
                    title={`Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  ></iframe>

                  {/* Overlay Dekoratif (Scanline / Vignette) */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900/40 to-transparent shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]"></div>
                  
                  {/* Badge "Live Preview" di pojok video */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-white tracking-wide">PREVIEW</span>
                  </div>

                </div>
              </div>

              {/* Dekorasi Geometris di luar kotak */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-xl -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// (BARU) Komponen Mitra Kami
// const Partners = () => {
//   const { t } = useContext(LangContext);
//   const logos = t.partners.logos || [];
//   // Duplikat logo untuk efek scroll tak terbatas
//   // const extendedLogos = [...logos, ...logos];
//   const extendedLogos = [...logos];

//   return (
//     <section id="partners" className="py-20 md:py-28 bg-gray-900">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             {t.partners.title}
//           </h2>
//           <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//             {t.partners.subtitle}
//           </p>
//         </div>
//       </div>
//       <div className=" scroller-wrapper w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_1rem,_black_calc(100%-1rem),transparent_100%)] items-center justify-center">
//         <ul className="flex items-center justify-center  [&_li]:mx-8  hover:[animation-play-state:paused]">
//         {/* <ul className="flex items-center justify-center  [&_li]:mx-8 animate-infinite-scroll hover:[animation-play-state:paused]"> */}
//           {extendedLogos.map((logo, index) => (
//             <li key={index}>
//               <img
//                 src={logo.src}
//                 alt={logo.alt}
//                 className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
//               />
//             </li>
//           ))}
//         </ul>

//       </div>
//     </section>
//   );
// };

// // -- Komponen Testimoni (Slider Sederhana) --
// const TestimonialSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const { lang, t } = useContext(LangContext);

//   useEffect(() => {
//     // Auto-play slider
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000); // Ganti slide setiap 5 detik

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section id="testimonials" className="py-20 md:py-28 bg-gray-950">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             {t.testimonials.title}
//           </h2>
//           <p className="text-lg text-gray-400">{t.testimonials.subtitle}</p>
//         </div>
//         {/* Penyesuaian responsif: min-h- agar pas di mobile */}
//         <div className="relative max-w-3xl mx-auto min-h-[20rem]">
//           {testimonials.map((item, index) => (
//             <div
//               key={index}
//               className={`absolute w-full transition-opacity duration-1000 ease-in-out ${
//                 index === currentIndex ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               {index === currentIndex && (
//                 <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 text-center shadow-lg">
//                   <Quote
//                     size={40}
//                     className="text-green-600 mx-auto mb-6"
//                     fill="currentColor"
//                   />
//                   <p className="text-xl italic text-gray-300 mb-6">
//                     "{item.quote[lang]}"
//                   </p>
//                   <h4 className="text-lg font-semibold text-white">
//                     {item.name}
//                   </h4>
//                   <p className="text-green-400">{item.title}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// -- Komponen Lokasi & Peta --
const LocationMap = () => {
  const { t } = useContext(LangContext);
  return (
    <section id="location" className="relative py-20 md:py-28 bg-gray-900 overflow-hidden">
         {/* --- 1. Ambient Background Effects (Sama seperti Services) --- */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.location.title}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t.location.subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16  ">
          {/* Sisi Kiri: Detail Alamat */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-gray-800 py-12 px-10 md:py-22  rounded-xl shadow-lg border border-gray-700">
              <div className="flex items-start gap-4">
                <MapPin
                  size={40}
                  className="text-green-400 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {t.location.hq}
                  </h3>
                  <p className="text-gray-300 text-lg mb-2">
                    {t.location.address}
                    <br />
                    {t.location.city}
                  </p>
                  <p className="text-gray-400 mb-1">
                    <strong>{t.location.email}</strong><br /> admin@antariks.id <br /> antariks.corp@gmail.com
                  </p>
                  <p className="text-gray-400">
                    <strong>{t.location.phone}</strong><br /> +62 811-2003-0163 (Sales & Marketing) <br /> +62 821-2074-1970 (Support)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Peta */}
          <div className="lg:w-1/2 w-full h-80 lg:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.937982929093!2d108.52618479599339!3d-6.711641494594766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee3004c0bdb1b%3A0xe3d7a1cd0042f4f1!2sAntariks!5e0!3m2!1sid!2sid!4v1763516652987!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
                               className="rounded-xl shadow-2xl border border-gray-700 border-0  inset-0 filter grayscale invert contrast-75 opacity-80 hover:opacity-100 transition-opacity" 

            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};



// -- Komponen Utama App --
export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <section className="min-h-screen bg-black"></section> // skeleton aman
    );
  }
  return (
    <>
      {/* ERROR: Komponen <Head> dari 'next/head' tidak tersedia.
        CSS Devicon akan dimuat melalui <style jsx global> di bawah.
        Judul halaman akan diatur oleh lingkungan sandbox.
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
        <title>Antariks - Solusi Software Inovatif</title>
      </Head>
      */}
      <div className="bg-gray-950 text-gray-200 antialiased font-sans">
        {/* CSS Global untuk Animasi */}
        <style jsx global>{`
          /* (BARU) Memuat Devicon CSS via @import untuk menggantikan <Head> */
          @import url('https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css');
          @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@600;700&display=swap');

          @keyframes float {
            0% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.1;
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
              opacity: 0.3;
            }
            100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.1;
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delay-1 {
            animation: float 8s ease-in-out infinite 1s;
          }
          .animate-float-delay-2 {
            animation: float 7s ease-in-out infinite 2s;
          }

          @keyframes matrix {
            from {
              opacity: 0;
              color: #10b981;
            }
            to {
              opacity: 1;
              color: #34d399;
              transform: translateY(10px);
            }
          }
       

          /* (BARU) CSS untuk infinite horizontal scroll */
          @keyframes infinite-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%); /* Diubah ke -50% karena ada 2 list */
            }
          }
          .animate-infinite-scroll {
            display: flex;
            animation: infinite-scroll 3s linear infinite;
            width: max-content;
          }
                .animate-matrix {
            animation: matrix 1s linear infinite alternate;
          }

       .parallax {
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
      }
      @media (max-width: 768px) {
        .parallax {
          background-attachment: scroll;
        }
      }
      /* (BARU) Opsi untuk pause on hover */
      .scroller-wrapper:hover .animate-infinite-scroll {
        animation-play-state: paused;
      }
        `}</style>

        <Header />
        <main>
          <Hero />
          
          <VideoSection />
          <Services />
          {/* (BARU) Menambahkan TechStack */}
          <TechStack />
          <ProductSlider />
          <AboutUs />
          {/* (BARU) Menambahkan Partners */}
          {/* <Partners /> */}
          {/* <TestimonialSlider /> */}
          <LocationMap />
        </main>
        <Footer />
      </div>
    </>
  );
}