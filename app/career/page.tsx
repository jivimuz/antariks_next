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
  Briefcase,
  MapPin,
  Clock,
  Search,
  DollarSign,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Filter,
  ArrowRight,
  Github,
  Linkedin,
  Monitor,
  Zap,
  Heart,
  Coffee,
  Smile,
  LocateIcon,
  Pin,
} from "lucide-react";
import LangContext from "@/context/langContext";
import Header from "@/components/layout/headerComponent";
import Footer from "@/components/layout/footerComponent";

// -- HELPER FUNCTIONS --
const formatCurrency = (amount: string | number | bigint, currency: any) => {
  if (!amount) return null;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency || "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

const formatDate = (dateString: string | number | Date) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  // Hitung selisih hari untuk "Posted x days ago"
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
//   if (diffDays <= 1) return "Just Now";
//   if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' });
};

// -- API FETCH FUNCTION --
const fetchJobsApi = async (page: number, limit: number, searchKeyword = "", location = "") => {
  try {
    // Menghitung start (offset) untuk Datatable logic
    const start = (page - 1) * limit;
    
    // Construct URL dengan parameter query
    // Menggunakan URLSearchParams untuk keamanan encoding
    const params = new URLSearchParams({
      start: start.toString(),
      length: limit.toString(),
      draw: page.toString(), // draw biasanya counter, kita pakai page saja
    });

      params.append('search[value]', searchKeyword); // Standar DataTables search param
      params.append('search[location]', location); // Standar DataTables search param

    const response = await fetch(`https://career.antariks.id/j?${params.toString()}`, {
      method: "GET", // Biasanya DataTables GET, tapi bisa juga POST tergantung backend
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Mapping response ke format yang kita butuhkan
    return {
      data: data.data || [],
      meta: {
        currentPage: page,
        totalPages: Math.ceil((data.recordsFiltered || data.recordsTotal || 0) / limit),
        totalItems: data.recordsFiltered || data.recordsTotal || 0,
      }
    };
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return { data: [], meta: { currentPage: 1, totalPages: 1, totalItems: 0 }, error: true };
  }
};

// -- Objek Konten Bilingual --
const allContent = {
  id: {
    header: {
      back: "Kembali ke Beranda",
    },
    hero: {
      title: "Temukan Karir Impianmu",
      subtitle: "Cari pekerjaan yang sesuai dengan minat dan keahlianmu di Antariks.",
      searchPlaceholder: "Cari posisi, keahlian, atau kata kunci...",
      locationPlaceholder: "Lokasi (Opsional)",
      searchButton: "Cari Lowongan",
    },
    jobs: {
      found: "Lowongan ditemukan",
      empty: "Tidak ada lowongan yang cocok dengan pencarian Anda.",
      loading: "Sedang memuat lowongan terbaru...",
      error: "Gagal memuat data. Silakan coba lagi nanti.",
      viewDetails: "Detail",
      type: "Tipe Kerja",
      salary: "Gaji",
      posted: "Ditutup pada",
      pagination: {
        prev: "Sebelumnya",
        next: "Selanjutnya",
        showing: "Menampilkan",
        of: "dari",
        jobs: "pekerjaan"
      },
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
      title: "Find Your Dream Career",
      subtitle: "Search for jobs that match your interests and skills at Antariks.",
      searchPlaceholder: "Search by job title, skills, or keywords...",
      locationPlaceholder: "Location (Optional)",
      searchButton: "Search Jobs",
    },
    jobs: {
      found: "Jobs found",
      empty: "No jobs found matching your search.",
      loading: "Loading latest jobs...",
      error: "Failed to load data. Please try again later.",
      viewDetails: "Detail",
      type: "Work Type",
      salary: "Salary",
      posted: "Closed at",
      pagination: {
        prev: "Previous",
        next: "Next",
        showing: "Showing",
        of: "of",
        jobs: "jobs"
      },
    },
    footer: {
      copyright: "All Rights Reserved.",
    },
  },
};

// -- Komponen Konten Halaman Karir --
const CareerPageContent = () => {
   const { lang} = useContext(LangContext);
    const t = allContent[lang];
  
  // State untuk Data & Pagination
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5, // Data per halaman
    totalPages: 1,
    totalItems: 0
  });

  // State untuk Pencarian
  const [searchKeyword, setSearchKeyword] = useState("");
  const [locationKeyword, setLocationKeyword] = useState("");
  const [activeSearch, setActiveSearch] = useState(""); // Keyword yang sedang aktif digunakan fetch

  // Efek Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      
      const response = await fetchJobsApi(pagination.page, pagination.limit, activeSearch, locationKeyword);
      
      if (response.error) {
        setIsError(true);
        setJobs([]);
      } else {
        setJobs(response.data);
        setPagination(prev => ({
          ...prev,
          totalPages: response.meta.totalPages,
          totalItems: response.meta.totalItems
        }));
      }
      setIsLoading(false);
    };

    fetchData();
  }, [pagination.page, activeSearch]); // Refetch jika page berubah atau tombol cari diklik

  // Handler Pagination
  const nextPage = () => {
    if (pagination.page < pagination.totalPages && !isLoading) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (pagination.page > 1 && !isLoading) {
      setPagination(prev => ({ ...prev, page: prev.page - 1 }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handler Search
  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 })); // Reset ke halaman 1 saat search baru
    setActiveSearch(searchKeyword || locationKeyword);
  };

  return (
    <>
      {/* Search Header Section (JobStreet Style) */}
       <section className="pt-28 pb-12 bg-gray-900 text-center relative overflow-hidden">
         {/* --- 1. Ambient Background Effects (Sama seperti Services) --- */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
              {/* --- 1. Ambient Background Effects (Sama seperti Services) --- */}
        
        <div className="container mx-auto px-6 pt-20">
            
          <div className="max-w-4xl mx-auto text-center mb-8">
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t.hero.title}
            </h1>
            <p className="text-gray-400 text-lg">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Search Bar Container */}
          <div className="max-w-5xl mx-auto bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-700">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
              {/* Keyword Input */}
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-green-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-4 border border-gray-600 rounded-xl leading-5 bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-950 focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm transition-colors"
                  placeholder={t.hero.searchPlaceholder}
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>

              {/* Location Input (Visual Only for now, as API might not support it separately yet) */}
              <div className="flex-1 relative group ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-green-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-4 border border-gray-600 rounded-xl leading-5 bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-950 focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm transition-colors"
                  placeholder={t.hero.locationPlaceholder}
                   value={locationKeyword}
                  onChange={(e) => setLocationKeyword(e.target.value)}
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
              >
                <Search size={20} />
                {t.hero.searchButton}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Job List Content */}
      <section className="py-12 bg-gray-950 min-h-screen">
        
        <div className="container mx-auto px-6 max-w-5xl">
          
          {/* Result Count */}
          {!isLoading && !isError && (
            <div className="mb-6 text-gray-400 text-sm">
              <span className="font-semibold text-white">{pagination.totalItems}</span> {t.jobs.found}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="text-green-500 animate-spin mb-4" size={48} />
              <p className="text-gray-400 animate-pulse">{t.jobs.loading}</p>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center py-20 bg-gray-900/50 rounded-xl border border-red-900/30">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 mb-4">
                <Filter className="text-red-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ooops!</h3>
              <p className="text-red-400">{t.jobs.error}</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && jobs.length === 0 && (
            <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                <Search className="text-gray-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tidak ditemukan</h3>
              <p className="text-gray-400">{t.jobs.empty}</p>
            </div>
          )}

          {/* Job Cards */}
          <div className="space-y-4">
            {!isLoading && jobs.map((job) => (
              <div
                key={job?.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-900/10 transition-all duration-300 group relative overflow-hidden">
         {/* --- 1. Ambient Background Effects (Sama seperti Services) --- */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                {/* Green accent on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
   <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                        {job?.title ?? ''}
                      </h3>
                      {(job.salary_min || job.salary_max) && (
                        <small className="flex items-center gap-2">
                            Budget:
                          <span>
                            {job.salary_min ? formatCurrency(job.salary_min, job.currency) : ''} 
                            {job.salary_min && job.salary_max ? ' - ' : ''}
                            {job.salary_max ? formatCurrency(job.salary_max, job.currency) : ''}
                          </span>
                        </small>
                      )}
                    </div>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Job Info */}
                  
                  <div className="flex-1">
                 
                    
                    <p className="text-green-500 font-medium mb-4 text-base">
                      {job.subtitle || "Antariks Global Technology"}
                    </p>

                    <div className=" gap-y-2 gap-x-6 text-sm text-gray-400">
                      {/* Gaji */}
                      <div className="flex items-center gap-2  mt-2">
                          <Pin size={16} className="text-gray-500" />
                        {job.location ?? ""}
                      </div>
                     
                      
                      {/* Work Type (Mobile view fallback) */}
                        <div className="flex items-center gap-2  mt-2">
                          <Briefcase size={16} className="text-gray-500" />
                          <span className="capitalize">{job.work_type ?? '-'}</span>
                        </div>
                      {/* Updated At */}
                      <div className="flex items-center gap-2 mt-2">
                        <Clock size={16} className="text-gray-500" />
                        <span>{t.jobs.posted}: {formatDate(job.expired_at)}</span>
                      </div>

                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex flex-col justify-center items-start md:items-end border-t md:border-t-0 border-gray-800 pt-4 md:pt-0 mt-2 md:mt-0">
                    <br />
                    <a
                      href={`/career/${btoa(btoa(job.id))}`}
                      className="w-full md:w-auto text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {t.jobs.viewDetails}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {!isLoading && !isError && jobs.length > 0 && pagination.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t border-gray-800 gap-4">
              <div className="text-gray-400 text-sm">
                {t.jobs.pagination.showing} <span className="text-white font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> - <span className="text-white font-medium">{Math.min(pagination.page * pagination.limit, pagination.totalItems)}</span> {t.jobs.pagination.of} <span className="text-white font-medium">{pagination.totalItems}</span> {t.jobs.pagination.jobs}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevPage}
                  disabled={pagination.page === 1}
                  className="p-2 bg-gray-800 text-white rounded-lg border border-gray-700 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {/* Page Number Indicator */}
                <div className="px-4 py-2 bg-gray-900 rounded-lg border border-gray-800 text-sm font-medium text-gray-300">
                  {pagination.page} / {pagination.totalPages}
                </div>

                <button
                  onClick={nextPage}
                  disabled={pagination.page === pagination.totalPages}
                  className="p-2 bg-gray-800 text-white rounded-lg border border-gray-700 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Next Page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

// -- Komponen Halaman Utama --
export default function CareerPage() {

  return (
    <>

      <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
        <Header />
        <main>
          <CareerPageContent />
        </main>
        <Footer />
      </div>
    </>
  );
}