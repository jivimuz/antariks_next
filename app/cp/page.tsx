"use client"
import React, { useState, useEffect, useRef } from 'react';

// Impor ikon dari lucide-react (pengganti Font Awesome)
import {
    ArrowLeft,
    ArrowRight,
    Printer,
    Eye,
    Target,
    Code,
    Palette,
    Rocket,
    Star,
    Users,
    LineChart,
    Headset,
    Mail,
    Phone,
    Globe,
    Home
} from 'lucide-react';

// Data bahasa disimpan sebagai konstanta di luar komponen
const languageData = {
    id: {
        controls: {
            prevBtnTitle: "Slide Sebelumnya",
            nextBtnTitle: "Slide Berikutnya",
            printBtnText: "Download Profil PDF",
            printBtnTitle: "Cetak semua slide ke PDF"
        },
        slide1: {
            tag: "Company Profile 2025"
        },
        slide2: {
            title: "Tentang ANTARIKS",
            p1: "Antariks (PT. Antariks Global Technology) bukan hanya sekadar vendor. Kami adalah mitra teknologi Anda. Didirikan pada tahun 2022 dan menjadi PT di 2025, misi kami adalah menjembatani kesenjangan antara ide bisnis dan realitas digital.",
            p2: "Tim kami terdiri dari para engineer, desainer, dan ahli strategi yang terobsesi dengan kode yang bersih, desain yang fungsional, dan produk yang berdampak. Kami percaya pada kekuatan teknologi untuk menyelesaikan masalah nyata.",
        },
        slide3: {
            title: "Visi & Misi Kami",
            visiTitle: "Visi",
            visiText: "Menjadi penyedia solusi teknologi terdepan yang menghadirkan inovasi efektif, andal, dan berkelanjutan untuk mendukung transformasi digital di berbagai sektor industri.",
            misiTitle: "Misi",
            misiItems: [
                "Mengembangkan produk dan layanan teknologi yang berkualitas tinggi, aman, dan mudah diimplementasikan.",
                "Memberikan pengalaman layanan yang responsif dan profesional melalui kolaborasi yang transparan dengan setiap klien.",
                "Mendorong penerapan teknologi modern yang efisien untuk meningkatkan kinerja dan produktivias bisnis.",
                "Membangun budaya inovatif yang berfokus pada peningkatan kualitas, integritas, dan keberlanjutan.",
                "Menjadi mitra strategis yang dapat diandalkan dalam perjalanan transformasi digital perusahaan."
            ]
        },
        slide4: {
            title: "Founder Profile",
            team1Name: "Jivi Muzaqi Guntur",
            team1Title: "Founder & CEO",
            founderSaid: `Saya adalah Founder & CEO PT Antariks. Fokus saya pada pengembangan teknologi, strategi produk, dan memastikan setiap solusi yang kami bangun benar-benar berdampak.
Di Antariks, saya memimpin arah perusahaan dalam menciptakan platform digital untuk berbagai sektor, mulai dari:`,
            sc1: 'Manufaktur — sistem ERP, MES, dan automasi operasional.',
            sc2: 'Kesehatan — manajemen rumah sakit, klinik, dan dental care.',
            sc3: ' Keuangan & Layanan Publik — sistem informasi terintegrasi dan solusi data-driven.',
            sc4: 'Personalia — platform HRIS dan manajemen perusahaan.',
            sc5: 'Dan sektor lainnya.',

        },
        slide5: {
            title: "Layanan Kami",
            service1Title: "Web & App Development",
            service1Text: "Membangun platform digital yang cepat, aman, dan skalabel untuk semua perangkat.",
            service2Title: "Branding & Desain",
            service2Text: "Menciptakan identitas brand yang kuat, berkesan, dan kohesif secara visual.",
            service3Title: "Digital Marketing",
            service3Text: "Meluncurkan strategi pemasaran berbasis data untuk pertumbuhan bisnis yang terukur."
        },
        slide6: {
            title: "Beberapa Proyek Kami",
            project1Title: "ERP & MES Manufacturing",
            project1Desc: "Implementasi sistem ERP dan MES untuk meningkatkan efisiensi produksi dan integrasi operasional di sektor manufaktur.",

            project2Title: "Hospital & Dental Management System",
            project2Desc: "Pengembangan sistem manajemen rumah sakit dan klinik gigi dengan fokus pada alur pelayanan, rekam medis, dan automasi administrasi.",

            project3Title: "Point of Sale (POS)",
            project3Desc: "Pembuatan sistem POS modern untuk retail dan F&B dengan integrasi inventori, laporan real-time, dan fitur multi-outlet."
        },
        slide7: {
            title: "Mengapa Memilih Antariks?",
            points: [
                { title: "Inovasi Terdepan", text: "Kami selalu menggunakan teknologi terbaru untuk memberikan solusi terbaik dan relevan.", icon: Star },
                { title: "Pendekatan Kemitraan", text: "Klien adalah mitra. Kami tumbuh bersama Anda, kesuksesan Anda adalah kesuksesan kami.", icon: Users },
                { title: "Berbasis Data", text: "Setiap keputusan kreatif dan strategis didukung oleh data yang akurat untuk hasil optimal.", icon: LineChart },
                { title: "Dukungan Penuh", text: "Tim kami siap membantu Anda 24/7, memastikan semua proyek berjalan lancar tanpa hambatan.", icon: Headset }
            ]
        },
        slide8: {
            title: "Klien Kami"
        },
        slide9: {
            title: "Mari Terhubung",
            subtitle: "Siap untuk meluncurkan proyek Anda berikutnya ke level stratosfer?",
            contactEmail: "antariks.corp@gmail.com",
            contactPhone: "+62 821 2074 1970",
            contactWeb: "https://antariks.vercel.app",
            qrLabel: "Pindai saya" // BARU: Teks untuk
        }
    },
    en: {
        controls: {
            prevBtnTitle: "Previous Slide",
            nextBtnTitle: "Next Slide",
            printBtnText: "Download PDF Profile",
            printBtnTitle: "Print all slides to PDF"
        },
        slide1: {
            tag: "Company Profile 2025"
        },
        slide2: {
            title: "About ANTARIKS",
            p1: "Antariks (PT. Antariks Global Technology) isn't just a vendor. We are your technology partner. Founded in 2022 and become a PT in 2025, our mission is to bridge the gap between business ideas and digital reality.",
            p2: "Our team consists of engineers, designers, and strategists obsessed with clean code, functional design, and impactful products. We believe in the power of technology to solve real problems.",
        },
        slide3: {
            title: "Our Vision & Mission",
            visiTitle: "Vision",
            visiText: "To be a leading technology solutions provider that delivers effective, reliable, and sustainable innovations to support digital transformation across various industrial sectors.",
            misiTitle: "Mission",
            misiItems: [
                "Developing high-quality, secure, and easily implementable technology products and services.",
                "Providing a responsive and professional service experience through transparent collaboration with every client.",
                "Encouraging the adoption of efficient modern technologies to enhance business performance and productivity.",
                "Building an innovative culture focused on quality improvement, integrity, and sustainability.",
                "Becoming a reliable strategic partner in the company's digital transformation journey."
            ]
        },
        slide4: {
            title: "Founder Profile",
            team1Name: "Jivi Muzaqi Guntur",
            team1Title: "Founder & CEO",
            founderSaid: `I am the Founder & CEO of PT Antariks. My focus is on technology development, product strategy, and ensuring every solution we build truly impactful.
At Antariks, I lead the company's direction in creating digital platforms for various sectors, including:`,
            sc1: 'Manufacturing — ERP systems, MES, and operational automation.',
            sc2: 'Healthcare — hospital, clinic, and dental care management.',
            sc3: 'Finance & Public Services — integrated information systems and data-driven solutions.',
            sc4: 'Personnel — HRIS platforms and enterprise management.',
            sc5: 'And other sectors.',
        },
        slide5: {
            title: "Our Services",
            service1Title: "Web & App Development",
            service1Text: "Building fast, secure, and scalable digital platforms for all devices.",
            service2Title: "Branding & Design",
            service2Text: "Creating strong, memorable, and visually cohesive brand identities.",
            service3Title: "Digital Marketing",
            service3Text: "Launching data-driven marketing strategies for measurable business growth."
        },
        slide6: {
            title: "Some of Our Projects",
            project1Title: "ERP & MES Manufacturing",
            project1Desc: "Implementation of ERP and MES systems to improve production efficiency and operational integration in the manufacturing sector.",

            project2Title: "Hospital & Dental Management System",
            project2Desc: "Development of a hospital and dental clinic management system with a focus on service flow, medical records, and administrative automation.",

            project3Title: "Point of Sale (POS)",
            project3Desc: "Development of a modern POS system for retail and F&B with inventory integration, real-time reporting, and multi-outlet features."
        },
        slide7: {
            title: "Why Choose Antariks?",
            points: [
                { title: "Leading Innovation", text: "We always use the latest technology to provide the best and most relevant solutions.", icon: Star },
                { title: "Partnership Approach", text: "Clients are partners. We grow with you; your success is our success.", icon: Users },
                { title: "Data-Driven", text: "Every creative and strategic decision is backed by accurate data for optimal results.", icon: LineChart },
                { title: "Full Support", text: "Our team is ready to assist you 24/7, ensuring all projects run smoothly without interruption.", icon: Headset }
            ]
        },
        slide8: {
            title: "Our Clients"
        },
        slide9: {
            title: "Let's Connect",
            subtitle: "Ready to launch your next project into the stratosphere?",
            contactEmail: "antariks.corp@gmail.com",
            contactPhone: "+62 821 2074 1970",
            contactWeb: "https://antariks.vercel.app",
            qrLabel: "Scan me" // BARU: Teks untuk
        }
    }
};

const totalSlides = 9;

// Komponen Toggle Bahasa
const LanguageToggle = ({ lang, onToggle }: { lang: 'id' | 'en'; onToggle: () => void }) => (
    <div className="flex items-center gap-2.5">
        <span className="text-sm font-bold text-gray-200 font-sans">ID</span>
        <label htmlFor="langToggle" className="relative inline-block w-12 h-7 cursor-pointer">
            <input
                id="langToggle"
                type="checkbox"
                className="opacity-0 w-0 h-0 peer"
                checked={lang === 'en'}
                onChange={onToggle}
            />
            <span className="absolute top-0 left-0 right-0 bottom-0 bg-slate-600 rounded-full transition-colors peer-focus:ring-2 peer-focus:ring-[#157557]"></span>
            <span className="absolute left-1 bottom-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
        </label>
        <span className="text-sm font-bold text-gray-200 font-sans">EN</span>
    </div>
);

// Komponen Kontrol Navigasi
const PresentationControls = ({ current, total, lang, onPrev, onNext, onPrint, onLangToggle }: { current: number; total: number; lang: 'id' | 'en'; onPrev: () => void; onNext: () => void; onPrint: () => void; onLangToggle: () => void }) => {
    const t = languageData[lang as keyof typeof languageData].controls;

    return (
        <>

            <div className="flex items-center justify-center flex-wrap gap-4 mb-5 bg-[#0D1126] py-3 px-5 rounded-lg shadow-lg border border-slate-700 print:hidden z-50">
                {/* Tombol Navigasi */}
                <a
                    href='/'
                    title={"Home"}
                    className="bg-emerald-700 text-white py-2.5 px-4 rounded-md font-bold text-sm transition-all hover:bg-blue-600 hover:scale-105 flex items-center gap-2"
                >
                    <Home size={18} />
                    <span>Home</span>
                </a>
                <button
                    onClick={onPrev}
                    disabled={current === 1}
                    title={t.prevBtnTitle}
                    className="bg-[#157557] text-white p-2.5 rounded-md font-bold transition-all hover:bg-[#1c946e] hover:scale-105 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:scale-100"
                >
                    <ArrowLeft size={18} />
                </button>
                <span className="text-gray-200 font-bold font-sans text-base min-w-[50px] text-center">
                    {current} / {total}
                </span>
                <button
                    onClick={onNext}
                    disabled={current === total}
                    title={t.nextBtnTitle}
                    className="bg-[#157557] text-white p-2.5 rounded-md font-bold transition-all hover:bg-[#1c946e] hover:scale-105 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:scale-1100"
                >
                    <ArrowRight size={18} />
                </button>

                {/* Toggle Bahasa */}
                <div className="mx-2">
                    <LanguageToggle lang={lang} onToggle={onLangToggle} />
                </div>

                {/* Tombol Download */}
                <button
                    onClick={onPrint}
                    title={t.printBtnTitle}
                    className="bg-blue-700 text-white py-2.5 px-4 rounded-md font-bold text-sm transition-all hover:bg-blue-600 hover:scale-105 flex items-center gap-2"
                >
                    <Printer size={16} />
                    <span>{t.printBtnText}</span>
                </button>
            </div>
        </>
    );
};


// BARU: Komponen Footer Slide
const SlideFooter = () => (
    <div className="absolute bottom-6 left-16 right-16 z-20 flex justify-center items-center gap-x-8 print:left-8 print:right-8 print:bottom-4">
        <div className="flex items-center gap-2 text-sm text-gray-400 print:text-black">
            <Globe size={14} className="text-[#157557]" />
            <span className="print:text-black">antariks.vercel.app</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400 print:text-black">
            <Mail size={14} className="text-[#157557]" />
            <span className="print:text-black">antariks.corp@gmail.com</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400 print:text-black">
            <Phone size={14} className="text-[#157557]" />
            <span className="print:text-black">+62 821 2074 1970</span>
        </div>
    </div>
);

// Komponen utama Presentasi
export default function App() {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [lang, setLang] = useState<'id' | 'en'>('id');

    // BARU: Ref untuk kontainer yang akan diukur
    const mainRef = useRef<HTMLElement>(null);

    // 't' adalah objek terjemahan berdasarkan state 'lang'
    const t = languageData[lang];

    // BARU: useEffect untuk Scaling (Penskalaan) - DIPERBAIKI
    useEffect(() => {
        const main = mainRef.current;
        if (!main) return;

        const handleResize = () => {
            if (main) {
                // Hitung skala berdasarkan lebar kontainer
                const scale = main.offsetWidth / 1280;
                // Terapkan skala ke variabel CSS
                document.documentElement.style.setProperty('--slide-scale', `${scale}`);
            }
        };

        handleResize(); // Terapkan skala awal saat mount
        window.addEventListener('resize', handleResize); // Tambahkan listener untuk resize

        return () => window.removeEventListener('resize', handleResize); // Cleanup listener
    }, []); // Array dependensi kosong, hanya berjalan sekali saat mount

    // Navigasi Keyboard
    useEffect(() => {
        const handleKeyDown = (e: { key: string; }) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide]); // Tambahkan currentSlide sebagai dependensi

    // Fungsi Navigasi
    const handleNext = () => setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
    const handlePrev = () => setCurrentSlide(prev => Math.max(prev - 1, 1));
    const handleLangToggle = () => setLang(prev => (prev === 'id' ? 'en' : 'id'));
    const handlePrint = () => window.print();

    // BARU: Kelas untuk slide (kanvas) yang akan diskalakan
    const slideBaseClasses = `
      absolute top-0 left-0
      w-full h-full 
      bg-[#0D1126] 
      flex-col 
      overflow-hidden 
      transition-opacity 
      duration-500 
      font-sans
    `;

    // BARU: Kelas untuk wrapper di DALAM slide, ini yang akan diskalakan
    const slideWrapperClasses = `
      w-[1280px] h-[720px] 
      p-16 
      flex flex-col
      transform-origin-top-left 
      scale-[var(--slide-scale,1)] 
      print:transform-none 
      print:w-full print:h-full print:p-16
    `;

    // Kelas untuk cetak (tetap sama)
    const slidePrintClasses = "print:flex print:!opacity-100 print:w-full print:h-[99vh] print:shadow-none print:border print:rounded-none print:bg-white print:text-black print:break-after-page print:relative";

    // Fungsi untuk mendapatkan kelas slide
    const getSlideClasses = (slideNum: number) => {
        return `
            ${slideBaseClasses} 
            ${slidePrintClasses}
            ${currentSlide === slideNum ? 'flex opacity-100' : 'hidden opacity-0'}
        `;
    };

    // Efek "Blob" (diterjemahkan ke Tailwind)
    const BlobEffect = () => (
        <>
            <div className="absolute -left-24 -top-24 w-72 h-72 bg-gradient-radial from-[rgba(21,117,87,0.2)] to-transparent to-70% blur-3xl filter print:hidden"></div>
            <div className="absolute -right-24 -bottom-24 w-72 h-72 bg-gradient-radial from-[rgba(21,117,87,0.2)] to-transparent to-70% blur-3xl filter print:hidden"></div>
        </>
    );

    // Kelas untuk Judul Slide (hapus 'md:' prefix)
    const slideTitleClasses = "w-full mb-10 text-4xl font-bold text-white border-l-4 border-[#157557] pl-4 print:text-black print:border-[#157557]";

    return (
        <div className="flex flex-col items-center justify-center 
    min-h-screen bg-slate-700 
    p-2 md:p-5 
    print:bg-white print:p-0">
            <PresentationControls
                current={currentSlide}
                total={totalSlides}
                lang={lang}
                onPrev={handlePrev}
                onNext={handleNext}
                onPrint={handlePrint}
                onLangToggle={handleLangToggle}
            />

            {/* Kontainer untuk semua slide */}
            <div className="w-full flex justify-center">
                <div className="w-full max-w-[1280px]">
                    <main
                        ref={mainRef} // BARU: Tambahkan ref di sini
                        className="relative w-full aspect-video print:aspect-auto print:h-auto"
                    >

                        {/* Slide 1: Cover */}
                        <div id="slide1" className={getSlideClasses(1)}>
                            {/* BARU: Wrapper penskalaan di dalam */}
                            <div className={`${slideWrapperClasses} items-center justify-center text-center`}>
                                <BlobEffect />
                                <div className="relative z-10">
                                    <svg viewBox="0 0 600 200" width="600" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="logoGradient">
                                                <stop offset="0%" stopColor="#394531" />
                                                <stop offset="50%" stopColor="#69A148" />
                                                <stop offset="100%" stopColor="#394531" />
                                            </linearGradient>
                                        </defs>
                                        <g className="logo-icon">
                                            <path d="M 280 50 L 300 30 L 320 50" fill="none" stroke="url(#logoGradient)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M 290 50 L 300 42 L 310 50" fill="none" stroke="url(#logoGradient)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        {/* Class 'logo-text' dan 'tagline' perlu didefinisikan, atau gunakan kelas Tailwind */}
                                        <text x="50%" y="60%" alignmentBaseline="middle" textAnchor="middle" className="text-8xl font-bold fill-white print:fill-black">ANTARIKS</text>
                                        <text x="50%" y="75%" alignmentBaseline="middle" textAnchor="middle" className="text-2xl fill-gray-300 print:fill-gray-700">
                                            Always be your IT solution
                                        </text>
                                    </svg>
                                    <div className="inline-block mt-8 px-5 py-2 text-lg text-white border border-[#157557] bg-[rgba(21,117,87,0.2)] rounded-full print:text-black print:border-gray-400 print:bg-gray-100">
                                        {t.slide1.tag}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide 2: Tentang Kami */}
                        <div id="slide2" className={getSlideClasses(2)}>
                            <div className={slideWrapperClasses}>
                                <BlobEffect />
                                <h2 className={slideTitleClasses}>{t.slide2.title}</h2>
                                <div className="flex-grow w-full grid grid-cols-2 gap-12 items-start">
                                    <div className="text-gray-200 text-xl leading-relaxed space-y-5 print:text-black">
                                        <p>{t.slide2.p1}</p>
                                        <p>{t.slide2.p2}</p>
                                    </div>
                                    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-slate-700 print:border-gray-300">
                                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Interior kantor Antariks" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <SlideFooter /> {/* Footer ditambahkan */}
                            </div>
                        </div>

                        {/* Slide 3: Visi & Misi */}
                        <div id="slide3" className={getSlideClasses(3)}>
                            <div className={slideWrapperClasses}>
                                <BlobEffect />
                                <h2 className={slideTitleClasses}>{t.slide3.title}</h2>
                                <div className="flex-grow w-full grid grid-cols-2 gap-10">
                                    {/* Visi */}
                                    <div className="bg-[rgba(255,255,255,0.03)] border border-slate-700 rounded-lg p-8 print:bg-gray-50 print:border-gray-200">
                                        <h3 className="text-2xl font-bold text-[#157557] border-b border-slate-700 pb-3 mb-4 flex items-center gap-3 print:border-gray-300">
                                            <Eye size={24} /> {t.slide3.visiTitle}
                                        </h3>
                                        <p className="text-gray-200 text-lg leading-relaxed print:text-black">{t.slide3.visiText}</p>
                                    </div>
                                    {/* Misi */}
                                    <div className="bg-[rgba(255,255,255,0.03)] border border-slate-700 rounded-lg p-8 print:bg-gray-50 print:border-gray-200">
                                        <h3 className="text-2xl font-bold text-[#157557] border-b border-slate-700 pb-3 mb-4 flex items-center gap-3 print:border-gray-300">
                                            <Target size={24} /> {t.slide3.misiTitle}
                                        </h3>
                                        <ul className="list-disc list-inside text-gray-200 space-y-2 text-base leading-relaxed print:text-black">
                                            {t.slide3.misiItems.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <SlideFooter /> {/* Footer ditambahkan */}
                            </div>
                        </div>

                        {/* Slide 4: Tim Kami */}
                        <div id="slide4" className={getSlideClasses(4)}>
                            <div className={slideWrapperClasses}>
                                <BlobEffect />
                                <h2 className={slideTitleClasses}>{t.slide4.title}</h2>
                                <div className="flex-grow w-full flex justify-around items-start gap-10">
                                    {/* Anggota Tim 1 */}
                                    <div className="text-center">
                                        <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-[#157557] mb-4 mx-auto">
                                            <img src="/image/executive/jv.jpg" alt={t.slide4.team1Name} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="text-2xl font-bold text-white print:text-black">{t.slide4.team1Name}</p>
                                        <p className="text-lg text-[#157557] font-medium">{t.slide4.team1Title}</p>
                                    </div>
                                    {/* Anggota Tim 2 */}
                                    <div className="text-left w-2/3">
                                        <p className="text-xl mb-4 font-bold text-white print:text-black">~ Jivi Muzaqi Guntur ~</p>
                                        <br />
                                        {/* Perbaikan: Gunakan 'whitespace-pre-line' untuk menjaga baris baru dari template literal */}
                                        <p className="text-xl mb-2 text-white print:text-black whitespace-pre-line">{t.slide4.founderSaid}</p>
                                        <br />
                                        <ul className="w-full text-xl text-left list-disc ml-6 text-white">
                                            <li>{t.slide4.sc1}</li>
                                            <li>{t.slide4.sc2}</li>
                                            <li>{t.slide4.sc3}</li>
                                            <li>{t.slide4.sc4}</li>
                                            <li>{t.slide4.sc5}</li>
                                        </ul>
                                    </div>
                                </div>
                                <SlideFooter /> {/* Footer ditambahkan */}
                            </div>
                        </div>

                        {/* Slide 5: Layanan Kami */}
                        <div id="slide5" className={getSlideClasses(5)}>
                            <div className={slideWrapperClasses}>
                                <BlobEffect />
                                <h2 className={slideTitleClasses}>{t.slide5.title}</h2>
                                <div className="flex-grow w-full flex justify-around items-stretch gap-8">
                                    {/* Layanan 1 */}
                                    <div className="flex-1 flex flex-col items-center text-center bg-[rgba(255,255,255,0.03)] border border-slate-700 rounded-lg p-8 transition-all hover:bg-[rgba(21,117,87,0.1)] hover:border-[#157557] print:bg-gray-50 print:border-gray-200">
                                        <div className="text-5xl text-[#157557] mb-4"><Code size={50} /></div>
                                        <h3 className="text-2xl font-bold text-white mb-2 print:text-black">{t.slide5.service1Title}</h3>
                                        <p className="text-gray-200 text-lg leading-relaxed print:text-black">{t.slide5.service1Text}</p>
                                    </div>
                                    {/* Layanan 2 */}
                                    <div className="flex-1 flex flex-col items-center text-center bg-[rgba(255,255,255,0.03)] border border-slate-700 rounded-lg p-8 transition-all hover:bg-[rgba(21,117,87,0.1)] hover:border-[#157557] print:bg-gray-50 print:border-gray-200">
                                        <div className="text-5xl text-[#157557] mb-4"><Palette size={50} /></div>
                                        <h3 className="text-2xl font-bold text-white mb-2 print:text-black">{t.slide5.service2Title}</h3>
                                        <p className="text-gray-200 text-lg leading-relaxed print:text-black">{t.slide5.service2Text}</p>
                                    </div>
                                    {/* Layanan 3 */}
                                    <div className="flex-1 flex flex-col items-center text-center bg-[rgba(255,255,255,0.03)] border border-slate-700 rounded-lg p-8 transition-all hover:bg-[rgba(21,117,87,0.1)] hover:border-[#157557] print:bg-gray-50 print:border-gray-200">
                                        <div className="text-5xl text-[#157557] mb-4"><Rocket size={50} /></div>
                                        <h3 className="text-2xl font-bold text-white mb-2 print:text-black">{t.slide5.service3Title}</h3>
                                        <p className="text-gray-200 text-lg leading-relaxed print:text-black">{t.slide5.service3Text}</p>
                                    </div>
                                </div>
                                <SlideFooter /> {/* Footer ditambahkan */}
                            </div>
                        </div>

                        {/* Slide 6: Proyek Kami */}
                        <div id="slide6" className={getSlideClasses(6)}>
                            <div className={slideWrapperClasses}>
                                <BlobEffect />
                                <h2 className={slideTitleClasses}>{t.slide6.title}</h2>
                                <div className="flex-grow w-full flex justify-around items-start gap-10">
                                    {/* Proyek 1 */}
                                    <div className="flex-1 text-center">
                                        <div className="w-full h-64 rounded-lg overflow-hidden border-2 border-[#157557] mb-4">
                                            <img src="https://img.freepik.com/free-photo/factory-workers-checking-quality-products-large-industrial-hall_342744-160.jpg" alt={t.slide6.project1Title} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="text-2xl font-bold text-white print:text-black">{t.slide6.project1Title}</p>
                                        <p className="text-base text-gray-200 mt-1 print:text-black">{t.slide6.project1Desc}</p>
                                    </div>
                                    {/* Proyek 2 */}
                                    <div className="flex-1 text-center">
                                        <div className="w-full h-64 rounded-lg overflow-hidden border-2 border-[#157557] mb-4">
                                            <img src="https://img.freepik.com/free-photo/side-view-doctor-working-laptop_23-2148231360.jpg" alt={t.slide6.project2Title} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="text-2xl font-bold text-white print:text-black">{t.slide6.project2Title}</p>
                                        <p className="text-base text-gray-200 mt-1 print:text-black">{t.slide6.project2Desc}</p>
                                    </div>
                                    {/* Proyek 3 */}
                                    <div className="flex-1 text-center">
                                        <div className="w-full h-64 rounded-lg overflow-hidden border-2 border-[#157557] mb-4">
                                            <img src="https://img.freepik.com/free-photo/business-team-working-cafe-table_1262-3704.jpg" alt={t.slide6.project3Title} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="text-2xl font-bold text-white print:text-black">{t.slide6.project3Title}</p>
                                        <p className="text-base text-gray-200 mt-1 print:text-black">{t.slide6.project3Desc}</p>
                                    </div>
                                </div>
                                <SlideFooter /> {/* Footer ditambahkan */}
                            </div>
                        </div>

                        {/* Slide 7: Keunggulan */}
                        <div id="slide7" className={getSlideClasses(7)}>
                            <div className={slideWrapperClasses}>
                                <BlobEffect />
                                <h2 className={slideTitleClasses}>{t.slide7.title}</h2>
                                <div className="flex-grow w-full flex items-center justify-center">
                                    <ul className="space-y-6 max-w-3xl">
                                        {t.slide7.points.map((point, index) => {
                                            const Icon = point.icon;
                                            return (
                                                <li key={index} className="flex items-start gap-5">
                                                    <Icon className="text-[#157557] w-12 h-12 flex-shrink-0 mt-1" />
                                                    <div>
                                                        <strong className="text-white text-xl font-bold print:text-black">{point.title}:</strong>
                                                        <span className="text-gray-200 text-xl ml-2 print:text-black">{point.text}</span>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <SlideFooter /> {/* Footer ditambahkan */}
                            </div>
                        </div>

                        {/* Slide 8: Mitra Kami */}
                        <div id="slide8" className={getSlideClasses(8)}>
                            <div className={slideWrapperClasses}>
                                <BlobEffect />
                                <h2 className={slideTitleClasses}>{t.slide8.title}</h2>
                                <div className="flex flex-row mt-20 items-center justify-center mx-20" >
                                    <div className="w-1/3 p-1 m-1 rounded-lg h-50 flex items-center justify-center grayscale opacity-80 transition-all hover:grayscale-0 hover:opacity-100 hover:scale-105 print:grayscale-0 print:opacity-100 print:bg-white print:bg-grey print:shadow">
                                        <img src={`/image/partners/pt1.png`} alt={`Logo Mitra `} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div className="w-1/3 p-1 m-1 rounded-lg h-50 flex items-center justify-center grayscale opacity-80 transition-all hover:grayscale-0 hover:opacity-100 hover:scale-105 print:grayscale-0 print:opacity-100 print:bg-white print:bg-grey print:shadow">
                                        <img src={`/image/partners/pt2.png`} alt={`Logo Mitra `} className="max-w-full max-h-full object-contain" />
                                    </div>
                                </div>
                                <SlideFooter /> {/* Footer ditambahkan */}
                            </div>
                        </div>


                        {/* Slide 9: Kontak */}
                        <div id="slide9" className={getSlideClasses(9)}>
                            <div className={`${slideWrapperClasses} items-center justify-center text-center`}>
                                <BlobEffect />
                                <div className="relative z-10 w-full flex flex-col items-center">
                                    <h2 className="text-8xl font-bold text-white print:text-black">{t.slide9.title}</h2>
                                    <p className="text-2xl text-gray-200 mt-5 max-w-2xl mx-auto print:text-black">{t.slide9.subtitle}</p>

                                    {/* Kontainer Flex untuk Info & QR */}
                                    <div className="mt-10 flex flex-row items-center justify-center gap-20 w-full">

                                        {/* Kolom 1: Info Teks */}
                                        <div className="text-2xl text-white space-y-4 text-left print:text-black">
                                            <div className="flex items-center gap-3">
                                                <Mail className="text-[#157557]" />
                                                <span>{t.slide9.contactEmail}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Phone className="text-[#157557]" />
                                                <span>{t.slide9.contactPhone}</span>
                                            </div>
                                            <a href='https://antariks.vercel.app' target='_blank' className="flex items-center gap-3">
                                                <Globe className="text-[#157557]" />
                                                <span>{t.slide9.contactWeb}</span>
                                            </a>
                                        </div>

                                        {/* Kolom 2: Placeholder QR Code */}
                                        <div className="text-center">
                                            <div className="w-40 h-40 bg-white rounded-lg flex items-center justify-center font-bold text-gray-800 p-2 print:border print:border-gray-400">
                                                {/* Di sini Anda akan menempatkan komponen QR Code (cth: dari 'qrcode.react') */}
                                                <img src="/image/webqr.png" alt="" />
                                            </div>
                                            <p className="text-gray-300 mt-2 text-sm print:text-black">{t.slide9.qrLabel}</p>
                                        </div>

                                    </div>
                                </div>
                                {/* <SlideFooter /> <-- Dihapus dari slide 9 */}
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}