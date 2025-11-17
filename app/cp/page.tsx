"use client"
import React, { useState, useEffect, useContext } from 'react';

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
import LangContext, { allContent } from '@/context/langContext';
import Header from '@/components/layout/headerComponent';

// Data bahasa disimpan sebagai konstanta di luar komponen


const totalSlides = 9;
// Komponen Kontrol Navigasi
const PresentationControls = ({ current, total, lang, onPrev, onNext, onPrint }: { current: number; total: number; lang: 'id' | 'en'; onPrev: () => void; onNext: () => void; onPrint: () => void; }) => {
  const t = allContent[lang];

    return (
        <>
          
        <div className="flex items-center justify-center flex-wrap gap-4 mb-5 bg-[#0D1126] py-3 px-5 rounded-lg shadow-lg border border-slate-700 print:hidden z-2">
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
                title={t.controls.prevBtnTitle}
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
                title={t.controls.nextBtnTitle}
                className="bg-[#157557] text-white p-2.5 rounded-md font-bold transition-all hover:bg-[#1c946e] hover:scale-105 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:scale-100"
            >
                <ArrowRight size={18} />
            </button>

        
            {/* Tombol Download */}
            <button
                onClick={onPrint}
                title={t.controls.printBtnTitle}
                className="bg-blue-700 text-white py-2.5 px-4 rounded-md font-bold text-sm transition-all hover:bg-blue-600 hover:scale-105 flex items-center gap-2"
            >
                <Printer size={16} />
                <span>{t.controls.printBtnText}</span>
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

    // 't' adalah objek terjemahan berdasarkan state 'lang'
      const { t,lang } = useContext(LangContext);


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
    const handlePrint = () => window.print();

    // Kelas dasar untuk semua slide
    // Penting: 'print:flex' akan menimpa 'hidden' saat mencetak
    // 'print:!opacity-100' menimpa 'opacity-0'
    const slideBaseClasses = ` w-full 
    h-full 
    bg-[#0D1126] 
    rounded-lg 
    shadow-2xl 
    p-6 md:p-16 
    flex-col 
    relative 
    overflow-hidden 
    transition-opacity 
    duration-500 
    font-sans`;
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

    // Kelas untuk Judul Slide
    const slideTitleClasses = "w-full mb-10 text-2xl md:text-4xl font-bold text-white border-l-4 border-[#157557] pl-4 print:text-black print:border-[#157557]";

    return (
        <>
        <Header />
        <div className="flex flex-col items-center justify-center 
    min-h-screen bg-slate-700 
    p-2 md:p-5 mt-20 print:mt-0
    print:bg-white print:p-0">
            <PresentationControls
                current={currentSlide}
                total={totalSlides}
                lang={lang}
                onPrev={handlePrev}
                onNext={handleNext}
                onPrint={handlePrint}
            />

            {/* Kontainer untuk semua slide */}
            {/* Penting: Kita merender SEMUA slide, tapi hanya menampilkan yang aktif.
                Ini penting agar 'window.print()' dapat "melihat" semua slide.
            */}
    <div className="w-full text-center md:hidden block  print:hidden">No Supported for mobile view <br /> (Please turn on desktop mode)</div>
            <div className="w-full flex justify-center slide-scaler">
    <div className=" w-[1280px] hidden md:block print:block">
            <main className="   relative 
     
    w-[1280px] 
    aspect-video 
    print:w-auto 
    print:h-auto">

                {/* Slide 1: Cover */}
                <div id="slide1" className={`items-center justify-center text-center ${getSlideClasses(1)}`}>
                    <BlobEffect />
                    <div className="relative z-10">
                 
                        <svg viewBox="0 0 600 200" width="600"  xmlns="http://www.w3.org/2000/svg">
                        
                            <defs>
                                <linearGradient id="logoGradient-noanimate">
                                    <stop offset="0%" stopColor="#394531" /> 
                                    <stop offset="50%" stopColor="#69A148" />
                                    <stop offset="100%" stopColor="#394531" /> 
                                </linearGradient>
                            </defs>
                            <g className="logo-icon-noanimate">
                                <path d="M 280 50 L 300 30 L 320 50" fill="none" stroke="url(#logoGradient-noanimate)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                
                                <path d="M 290 50 L 300 42 L 310 50" fill="none" stroke="url(#logoGradient-noanimate)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        
                            <text x="50%" y="60%" className="logo-text-noanimate">ANTARIKS</text>
                            
                            <text x="50%" y="75%" className="tagline-noanimate">
                                Always be your IT solution
                            </text>
                        
                        </svg> 
                        <div className="inline-block mt-8 px-5 py-2 text-lg text-white border border-[#157557] bg-[rgba(21,117,87,0.2)] rounded-full print:text-black print:border-gray-400 print:bg-gray-100">
                            {t.slide1.tag}
                        </div>
                    </div>
                </div>

                {/* Slide 2: Tentang Kami */}
                <div id="slide2" className={getSlideClasses(2)}>
                    <BlobEffect />
                    <h2 className={slideTitleClasses}>{t.slide2.title}</h2>
                    <div className="flex-grow w-full grid grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="text-gray-200 text-base md:text-xlleading-relaxed space-y-5 print:text-black">
                            <p>{t.slide2.p1}</p>
                            <p>{t.slide2.p2}</p>
                        </div>
                        <div className="w-full h-[400px] rounded-lg overflow-hidden border border-slate-700 print:border-gray-300">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Interior kantor Antariks" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <SlideFooter /> {/* BARU: Footer ditambahkan */}
                </div>

                {/* Slide 3: Visi & Misi */}
                <div id="slide3" className={getSlideClasses(3)}>
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
                    <SlideFooter /> {/* BARU: Footer ditambahkan */}
                </div>

                {/* Slide 4: Tim Kami */}
                <div id="slide4" className={getSlideClasses(4)}>
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
                        <div className="text-center w-2/3">
                            <p className="text-base md:text-xl mb-4 font-bold text-white print:text-black">~ Jivi Muzaqi Guntur ~</p>
<br />
                            <p className="text-base md:text-xl mb-2 text-white print:text-black">{t.slide4.founderSaid}</p>
<br />
                           
                           <ul className="w-full text-base md:text-xl text-left list-disc ml-6">
                            <li>{t.slide4.sc1}</li>
                            <li>{t.slide4.sc2}</li>
                            <li>{t.slide4.sc3}</li>
                            <li>{t.slide4.sc4}</li>
                            <li>{t.slide4.sc5}</li>
                            </ul>

                        </div>
                      
                    </div>
                    <SlideFooter /> {/* BARU: Footer ditambahkan */}
                </div>
                
                {/* Slide 5: Layanan Kami */}
                <div id="slide5" className={getSlideClasses(5)}>
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
                            <div className="text-5xl text-[#157557] mb-4"><Palette size={50}  /></div>
                            <h3 className="text-2xl font-bold text-white mb-2 print:text-black">{t.slide5.service2Title}</h3>
                            <p className="text-gray-200 text-lg leading-relaxed print:text-black">{t.slide5.service2Text}</p>
                        </div>
                        {/* Layanan 3 */}
                        <div className="flex-1 flex flex-col items-center text-center bg-[rgba(255,255,255,0.03)] border border-slate-700 rounded-lg p-8 transition-all hover:bg-[rgba(21,117,87,0.1)] hover:border-[#157557] print:bg-gray-50 print:border-gray-200">
                            <div className="text-5xl text-[#157557] mb-4"><Rocket size={50}  /></div>
                            <h3 className="text-2xl font-bold text-white mb-2 print:text-black">{t.slide5.service3Title}</h3>
                            <p className="text-gray-200 text-lg leading-relaxed print:text-black">{t.slide5.service3Text}</p>
                        </div>
                    </div>
                    <SlideFooter /> {/* BARU: Footer ditambahkan */}
                </div>
                
                {/* Slide 6: Proyek Kami */}
                <div id="slide6" className={getSlideClasses(6)}>
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
                    <SlideFooter /> {/* BARU: Footer ditambahkan */}
                </div>

                {/* Slide 7: Keunggulan */}
                <div id="slide7" className={getSlideClasses(7)}>
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
                                            <strong className="text-white text-base md:text-xlfont-bold print:text-black">{point.title}:</strong>
                                            <span className="text-gray-200 text-base md:text-xlml-2 print:text-black">{point.text}</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <SlideFooter /> {/* BARU: Footer ditambahkan */}
                </div>

                {/* Slide 8: Mitra Kami */}
                <div id="slide8" className={getSlideClasses(8)}>
                    <BlobEffect />
                    <h2 className={slideTitleClasses}>{t.slide8.title}</h2>
                    <div className="flex flex-row  mt-20  items-center justify-center mx-20" >
                            <div className="w-1/3 p-1 m-1 rounded-lg h-50 flex items-center justify-center grayscale opacity-80 transition-all hover:grayscale-0 hover:opacity-100 hover:scale-105 print:grayscale-0 print:opacity-100 print:bg-white  print:bg-grey print:shadow">
                                <img src={`/image/partners/pt1.png`} alt={`Logo Mitra `} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="w-1/3  p-1 m-1 rounded-lg h-50 flex items-center justify-center grayscale opacity-80 transition-all hover:grayscale-0 hover:opacity-100 hover:scale-105 print:grayscale-0 print:opacity-100 print:bg-white  print:bg-grey print:shadow">
                                <img src={`/image/partners/pt2.png`} alt={`Logo Mitra `} className="max-w-full max-h-full object-contain" />
                            </div>
                    </div>
                    <SlideFooter /> {/* BARU: Footer ditambahkan */}
                </div>

               
                {/* Slide 9: Kontak */}
                {/* BARU: Tata letak diubah untuk QR Code, dan SlideFooter dihapus */}
                <div id="slide9" className={`items-center justify-center text-center ${getSlideClasses(9)}`}>
                    <BlobEffect />
                    <div className="relative z-10 w-full flex flex-col items-center">
                        <h2 className="text-8xl font-bold text-white print:text-black">{t.slide9.title}</h2>
                        <p className="text-2xl text-gray-200 mt-5 max-w-2xl mx-auto print:text-black">{t.slide9.subtitle}</p>
                        
                        {/* BARU: Kontainer Flex untuk Info & QR */}
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
                    {/* <SlideFooter /> <-- Sudah dihapus dari slide 9 */}
                </div>

            </main>
            </div>
            </div>
        </div>
        </>
    );
}