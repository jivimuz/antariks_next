"use client"
import Footer from "@/components/layout/footerComponent";
import Header from "@/components/layout/headerComponent";
import LangContext from "@/context/langContext";
import { CheckCircle, DollarSign, Package, Settings, TrendingUp, Users } from "lucide-react";
import { useContext } from "react";

// -- Objek Konten Bilingual --
const allContent = {
  id: {
    header: {
      back: "Kembali ke Beranda",
    },
    hero: {
      title: "Studi Kasus: ERP",
      subtitle:
        "Perusahaan Manufaktur dengan Solusi ERP Terintegrasi",
      industry: "Industri",
      industryValue: "Manufaktur & Produksi",
    },
    challenge: {
      title: "Tantangan",
      text: "Perusahaan Manufaktur menghadapi inefisiensi operasional yang signifikan. Proses mereka sangat manual, mengandalkan spreadsheet yang tersebar. Hal ini menyebabkan kesalahan data inventaris, keterlambatan dalam pelacakan produksi, dan kesulitan dalam menyusun laporan keuangan yang akurat.",
    },
    solution: {
      title: "Solusi Kami",
      text: "Antariks merancang dan membangun sebuah sistem ERP *custom* berbasis web yang mengkonsolidasikan semua proses bisnis inti ke dalam satu platform yang terpadu. Sistem ini memberikan visibilitas *real-time* dari lantai produksi hingga ke tim keuangan.",
      featuresTitle: "Fitur Utama Termasuk:",
      features: [
        {
          name: "Manajemen Inventaris",
          desc: "Pelacakan stok *real-time*, peringatan stok minimum, dan manajemen multi-gudang.",
        },
        {
          name: "Pelacakan Produksi",
          desc: "Pemantauan *Work-in-Progress* (WIP) dari bahan baku hingga barang jadi.",
        },
        {
          name: "Akuntansi & Keuangan",
          desc: "Integrasi *General Ledger* (GL), manajemen piutang (AR) dan utang (AP).",
        },
        {
          name: "Manajemen SDM",
          desc: "Database karyawan, manajemen absensi, dan penggajian (payroll).",
        },
      ],
    },
    techStack: {
      title: "Tumpukan Teknologi (Bisa sesuai permintaan)",
    },
    results: {
      title: "Hasilnya",
      text: "Penerapan ERP secara langsung berdampak pada efisiensi dan profitabilitas klien.",
      items: [
        "Peningkatan 30% dalam kecepatan pemrosesan pesanan.",
        "Pengurangan 95% kesalahan entri data manual di inventaris.",
        "Visibilitas 100% pada biaya produksi secara *real-time*.",
        "Penutupan buku keuangan 2x lebih cepat setiap bulan.",
      ],
    },
    gallery: {
      title: "Galeri Modul",
    },
    cta: {
      title: "Siap Mendigitalkan Bisnis Anda?",
      subtitle:
        "Diskusikan kebutuhan ERP spesifik Anda dengan asisten AI kami atau hubungi tim kami hari ini.",
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
      title: "Case Study: ERP",
      subtitle:
        "Empowering Manufacture Company with an Integrated ERP Solution",
      industry: "Industry",
      industryValue: "Manufacturing & Production",
    },
    challenge: {
      title: "The Challenge",
      text: "Manufacture Company faced significant operational inefficiencies. Their processes were highly manual, relying on scattered spreadsheets. This led to inventory data errors, delays in production tracking, and difficulty in generating accurate financial reports.",
    },
    solution: {
      title: "Our Solution",
      text: "Antariks designed and built a custom web-based ERP system that consolidated all core business processes into one unified platform. The system provides real-time visibility from the production floor to the finance team.",
      featuresTitle: "Key Features Included:",
      features: [
        {
          name: "Inventory Management",
          desc: "Real-time stock tracking, low-stock alerts, and multi-warehouse management.",
        },
        {
          name: "Production Tracking",
          desc: "Work-in-Progress (WIP) monitoring from raw materials to finished goods.",
        },
        {
          name: "Accounting & Finance",
          desc: "Integrated General Ledger (GL), Accounts Receivable (AR), and Accounts Payable (AP).",
        },
        {
          name: "HR Management",
          desc: "Employee database, attendance management, and payroll processing.",
        },
      ],
    },
    techStack: {
      title: "Technology Stack (Can be by request)",
    },
    results: {
      title: "The Results",
      text: "The implementation of ERP had a direct impact on the client's efficiency and profitability.",
      items: [
        "30% increase in order processing speed.",
        "95% reduction in manual data entry errors for inventory.",
        "100% real-time visibility into production costs.",
        "2x faster financial book closing each month.",
      ],
    },
    gallery: {
      title: "Module Gallery",
    },
    cta: {
      title: "Ready to Digitize Your Business?",
      subtitle:
        "Discuss your specific ERP needs with our AI assistant or contact our team today.",
      button: "Start Consultation (via AI)",
    },
    footer: {
      copyright: "All Rights Reserved.",
    },
  },
};

// -- Context 

// -- Komponen Konten Halaman ERP --
const ERPPageContent = () => {
    
  const { lang } = useContext(LangContext);
  const t = allContent[lang];
  const featureIcons = [Package, Settings, DollarSign, Users];

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
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-center ">
           
            <div className="text-gray-300">
              <span className="block text-sm font-bold text-gray-500 uppercase">
                {t.hero.industry}
              </span>
              {t.hero.industryValue}
            </div>
          </div>
        </div>
      </section>

      {/* Gambar Utama ERP */}
      <section className="bg-gray-900 pb-16 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl  w-1/3 mx-auto rounded-xl shadow-2xl overflow-hidden border-2 border-emerald-700/50">
            <img
              src="/image/projects/erp/1.jpg"
              alt="ERP Meeting"
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
                "PHP",
                "Java",
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
                src="/image/projects/erp/2.jpeg"
                alt="Modul Inventaris"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
                src="/image/projects/erp/3.jpeg"
                alt="Modul Keuangan"
                className="w-full h-auto"
              />
            </div>
             <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
                src="/image/projects/erp/4.jpeg"
                alt="Modul Inventaris"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
                src="/image/projects/erp/5.jpeg"
                alt="Modul Keuangan"
                className="w-full h-auto"
              />
            </div>
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
                src="/image/projects/erp/6.jpeg"
                alt="Modul Inventaris"
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
              <img
                src="/image/projects/erp/7.jpeg"
                alt="Modul Keuangan"
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
export default function ERPPortfolioPage() {
  return (
    <>
      {/* Style global untuk font dan logo SVG */}
      <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
        <Header/>
        <main className="mt-10 md:mt-0">
          <ERPPageContent />
        </main>
        <Footer />
      </div>
    </>
  );
}