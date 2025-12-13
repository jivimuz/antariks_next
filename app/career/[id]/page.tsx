"use client"; // Diperlukan untuk hooks

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
// import { useParams } from "next/navigation"; // DIHAPUS: Menyebabkan error di sandbox
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  ChevronLeft,
  Loader2,
  Share2,
  AlertCircle,
  CheckCircle,
  Github,
  Linkedin,
} from "lucide-react";
import LangContext from "@/context/langContext";
import Header from "@/components/layout/headerComponent";
import Footer from "@/components/layout/footerComponent";

// -- HELPER FUNCTIONS --
const formatCurrency = (amount: string | number | bigint, currency: any) => {
  if (!amount) return null;
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency || "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

const formatDate = (dateString: string | number | Date | undefined) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// -- MOCK DATA FALLBACK (Untuk Demo jika API gagal/404) --


// -- API FETCH FUNCTION --
const fetchJobDetailApi = async (id: string | number) => {
  try {
    const response = await fetch(`https://career.antariks.id/j/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data; 
  } catch (error) {
    console.warn("Gagal mengambil detail dari API, menggunakan data fallback:", error);
    return null;
  }
};

// -- Objek Konten Bilingual --
const allContent = {
  id: {
    header: { back: "Kembali ke Beranda" },
    detail: {
      backToList: "Kembali ke Lowongan",
      applynotes: "Kirim ke",
      apply: "antariks.recruitment@gmail.com",
      posted: "Diposting pada",
      expires: "Berakhir pada",
      share: "Bagikan",
      salary: "Gaji",
      type: "Tipe",
      location: "Lokasi",
      descTitle: "Deskripsi Pekerjaan",
      loading: "Memuat detail pekerjaan...",
      error: "Gagal memuat data atau lowongan tidak ditemukan.",
      notFound: "Lowongan tidak ditemukan.",
      other:"Informasi Lainnya",
      notes:"Antariks tidak pernah memungut biaya apapun dalam proses rekrutmen. Hati-hati terhadap penipuan."
    },
    footer: { copyright: "Seluruh Hak Cipta." },
  },
  en: {
    header: { back: "Back to Home" },
    detail: {
      backToList: "Back to Jobs",
      applynotes: "Send to",
      apply: "antariks.recruitment@gmail.com",
      posted: "Posted on",
      expires: "Expires on",
      share: "Share",
      salary: "Salary",
      type: "Type",
      location: "Location",
      descTitle: "Job Description",
      loading: "Loading job details...",
      error: "Failed to load data or job not found.",
      notFound: "Job not found.",
      other:"Other Information",
      notes:"Antariks never charges any fees during the recruitment process. Beware of scams.",
    },
    footer: { copyright: "All Rights Reserved." },
  },
};

// -- Context Bahasa --

// 
// -- Job Type Definition --
interface JobDetail {
  title: string;
  subtitle?: string;
  work_type?: string;
  salary_min?: number | string;
  salary_max?: number | string;
  currency?: string;
  updated_at?: string;
  expired_at?: string;
  description?: string;
  [key: string]: any;
}

// -- Komponen Konten Detail --
const JobDetailContent = () => {
  
     const { lang} = useContext(LangContext);
      const t = allContent[lang];
  
  // (PERBAIKAN) Menggunakan state lokal untuk ID alih-alih useParams
  const [id, setId] = useState<string | number | null>(null);
  const [job, setJob] = useState<JobDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isExpired =
    job?.expired_at
      ? new Date(job.expired_at + "T23:59:59") < new Date()
      : false;
  // Efek untuk mengambil ID dari URL secara manual (Client-side)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const segments = path.split('/').filter(Boolean); // Hapus string kosong
      const lastSegment = segments.pop(); // Ambil segmen terakhir
      // Validasi sederhana: jika segmen terakhir adalah 'career', berarti tidak ada ID
      if (lastSegment && lastSegment !== 'career') {
        setId(lastSegment);
      } else {
        // Fallback untuk testing: set ID = 1 jika tidak ada ID di URL
        setId(1); 
      }
    }
  }, []);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchJobDetailApi(id);
        if (data) {
          setJob(data);
        } else {
          setError(t.detail.notFound);
        }
      } catch (err) {
        setError(t.detail.error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id, t]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Cek lowongan ${job?.title} di Antariks!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link disalin ke clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
        <Loader2 className="animate-spin text-green-500 mb-4" size={48} />
        <p className="text-gray-400 animate-pulse">{t.detail.loading}</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 mb-4">
          <AlertCircle className="text-red-500" size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Terjadi Kesalahan</h2>
        <p className="text-gray-400 mb-6">{error || t.detail.notFound}</p>
        <a href="/career" className="text-green-500 hover:text-green-400 font-medium flex items-center gap-2">
          <ChevronLeft size={16} /> {t.detail.backToList}
        </a>
      </div>
    );
  }

  return (
    <section className="pt-32 pb-20 bg-gray-950 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl pt-8">
        {/* Tombol Kembali */}
        <div className="mb-8">
          <a href="/career" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ChevronLeft size={20} className="mr-1" />
            {t.detail.backToList}
          </a>
        </div>

        {/* Header Pekerjaan */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl mb-8 relative overflow-hidden">
         {/* --- 1. Ambient Background Effects (Sama seperti Services) --- */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
           <div className="absolute top-0 left-0 w-2 h-full bg-green-600"></div>
           
           <div className="flex flex-col md:flex-row justify-between items-start gap-6">
             <div className="flex-1">
               <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{job.title}</h1>
               <p className="text-green-500 text-lg font-medium mb-4">{job.subtitle || "Antariks Global Technology"}</p>
               
               <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-400 mb-6">
                 <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">
                   <Briefcase size={16} className="text-green-400" />
                   <span className="capitalize">{job.work_type || "Full Time"}</span>
                 </div>
                 
                 {(job.salary_min || job.salary_max) && (
                   <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">
                     <span>
                        {job.salary_min && formatCurrency(job.salary_min, job.currency)} 
                        {job.salary_min && job.salary_max ? ' - ' : ''}
                        {job.salary_max && formatCurrency(job.salary_max, job.currency)}
                     </span>
                   </div>
                 )}

               </div><small> 
                                <div className="flex items-center gap-2 px-1">
                  <Clock size={16} />
                   <span>{t.detail.posted}: {formatDate(job.created_at)}</span>
                 </div></small>
             </div>

             <div className="flex flex-col gap-3 w-full md:w-auto">
                 <b className="text-center text-emerald-500">"{job.title} - [Name]"</b>
                 <small className="text-center">{t.detail.applynotes}</small>
               {!isExpired ? (
                  <button
                    onClick={() =>
                      window.location.href = `mailto:antariks.recruitment@gmail.com?subject=Lamaran: ${job.title}`
                    }
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-green-900/20 text-center"
                  >
                    {t.detail.apply}
                  </button>
                ) : (
                  <div className="bg-red-600 text-white font-bold py-3 px-8 rounded-xl text-center cursor-not-allowed opacity-90">
                    ❌ CLOSED
                  </div>
                )}

                <button 
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-xl border border-gray-700 transition-all text-sm"
                >
                  <Share2 size={16} /> {t.detail.share}
                </button>
             </div>
           </div>
        </div>

        {/* Konten Deskripsi */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
             <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
         {/* --- 1. Ambient Background Effects (Sama seperti Services) --- */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
               <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-4">
                 {t.detail.descTitle}
               </h2>
               <div 
                 className="prose prose-invert prose-green max-w-none text-gray-300 leading-relaxed"
                 dangerouslySetInnerHTML={{ __html: job.description || "<p>Tidak ada deskripsi.</p>" }}
               />
             </div>
           </div>

           <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg relative overflow-hidden">
         {/* --- 1. Ambient Background Effects (Sama seperti Services) --- */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <h3 className="text-lg font-bold text-white mb-4">{t.detail.other}</h3>
                <ul className="space-y-4 text-sm">
                  {job.expired_at && (
                    <li className="flex items-start gap-3">
                      <Calendar className="text-gray-500 mt-0.5" size={18} />
                      <div>
                        <span className="block text-gray-500 text-xs uppercase font-semibold">{t.detail.expires}</span>
                        <span className="text-gray-200">{formatDate(job.expired_at)}</span>
                      </div>
                    </li>
                  )}
                  <li className="flex items-start gap-3">
                    <MapPin className="text-gray-500 mt-0.5" size={18} />
                    <div>
                      <span className="block text-gray-500 text-xs uppercase font-semibold">{t.detail.location}</span>
                      <span className="text-gray-200">{job.location ?? ' - '}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-800/50 rounded-2xl p-6">
                 <div className="flex items-start gap-3">
                    <CheckCircle className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                    <p className="text-sm text-blue-200">
                      {t.detail.notes}
                    </p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

// -- Page Component --
export default function JobDetailPage() {

  return (
    <>
    
      <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
        <Header />
        <main>
          <JobDetailContent />
        </main>
        <Footer />
      </div>
    </>
  );
}