"use client";
import React, { useState, useContext } from "react";
// Import dengan relative path yang sesuai struktur folder
import LangContext from "../../context/langContext"; 
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const context = useContext(LangContext);
  const lang = context?.lang || "id";
  const setLang = context?.setLang || (() => {});
  const t = context?.t || { navLinks: [], contactCta: "Loading..." };

  const toggleLang = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Exo+2:wght@600;700&display=swap");
        .font-exo { font-family: 'Exo 2', sans-serif; }
      `}</style>
      
      <header className="fixed top-0 left-0 w-full bg-gray-950/95 backdrop-blur-md z-50 shadow-lg shadow-green-900/10 print:opacity-0 border-b border-gray-800">
        <nav className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
          
          {/* 1. ZONA KIRI: Logo */}
          <div className="flex-shrink-0">
           <a href="../">
            <svg viewBox="0 0 600 200" width="250" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGradient">
                  <stop offset="0%" stopColor="#394531" />
                  <stop offset="50%" stopColor="#69A148" />
                  <stop offset="100%" stopColor="#394531" />
                </linearGradient>
              </defs>

              <g className="logo-icon">
                <path
                  d="M 280 50 L 300 30 L 320 50"
                  fill="none"
                  stroke="url(#logoGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 290 50 L 300 42 L 310 50"
                  fill="none"
                  stroke="url(#logoGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              <text x="50%" y="60%" className="logo-text">ANTARIKS</text>
              <text x="50%" y="75%" className="tagline">Always be your IT solution</text>
            </svg>
          </a>
          </div>

          {/* 2. ZONA TENGAH: Menu Navigasi */}
          <div className="hidden lg:flex flex-1 items-center justify-center px-4">
            <div className="flex items-center gap-1 xl:gap-4">
              {t.navLinks && t.navLinks.map((link) => {
                 const hasChildren = link?.children && link.children.length > 0;
                 
                 return (
                  <div key={link.label} className="relative group">
                    <a
                      href={link.href ?? "#"}
                      className="px-3 py-2 text-sm xl:text-base font-medium text-gray-300 hover:text-white transition rounded-lg hover:bg-gray-800/50 flex items-center gap-1 whitespace-nowrap"
                    >
                      {link.label}
                      {hasChildren && <ChevronDown size={14} className="mt-0.5 group-hover:rotate-180 transition-transform text-gray-500 group-hover:text-emerald-400" />}
                    </a>

                    {/* Dropdown Menu Desktop */}
                    {hasChildren && (
                      <div className="absolute left-1/2 -translate-x-1/2 mt-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
                         <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-2 min-w-[200px]">
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 border-l border-t border-gray-800 transform rotate-45"></div>
                            
                            <div className="relative z-10 flex flex-col gap-1">
                              {link.children.map((child) => (
                                <a
                                  key={child.label}
                                  href={child.href}
                                  className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left whitespace-nowrap"
                                >
                                  {child.label}
                                </a>
                              ))}
                            </div>
                         </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. ZONA KANAN: Actions */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
             <button
              onClick={toggleLang}
              className="text-xs font-medium px-2 py-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition flex items-center gap-1"
            >
              <span className={lang === "id" ? "text-white font-bold" : ""}>ID</span>
              <span className="opacity-30">|</span>
              <span className={lang === "en" ? "text-white font-bold" : ""}>EN</span>
            </button>

             <a
              href="/chat"
              className="hidden xl:inline-flex bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 px-5 rounded-full shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              {t.contactCta}
            </a>

            <a
              href="/cp"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-5 rounded-full shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              Compro
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <div className="lg:hidden flex items-center">
            <button
              className="text-gray-300 hover:text-white p-2"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </nav>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-gray-950 border-l border-gray-800 shadow-2xl z-[70] transform transition-transform duration-300 ease-out lg:hidden flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
           <span className="text-white font-bold text-xl tracking-wider font-exo">MENU</span>
           <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white transition bg-gray-900 p-2 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-2">
           {t.navLinks && t.navLinks.map((link) => {
             const hasChildren = link?.children && link.children.length > 0;
             const isOpen = openDropdown === link.label;

             return (
               <div key={link.label} className="border-b border-gray-800/50 last:border-0 pb-2">
                 {hasChildren ? (
                   <>
                     <button
                       onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                       className="flex items-center justify-between w-full py-3 text-lg text-gray-200 font-medium hover:text-emerald-400 transition"
                     >
                       {link.label}
                       <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-emerald-500" : "text-gray-500"}`} />
                     </button>
                     <div className={`space-y-1 pl-4 border-l-2 border-gray-800 ml-1 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100 mb-4 pt-1" : "max-h-0 opacity-0"}`}>
                        {link.children.map((child) => (
                           <a
                             key={child.label}
                             href={child.href}
                             onClick={() => setIsMenuOpen(false)}
                             className="block py-2 text-gray-400 hover:text-white hover:translate-x-1 transition-transform"
                           >
                             {child.label}
                           </a>
                        ))}
                     </div>
                   </>
                 ) : (
                   <a
                     href={link.href}
                     onClick={() => setIsMenuOpen(false)}
                     className="block py-3 text-lg text-gray-200 font-medium hover:text-emerald-400 transition"
                   >
                     {link.label}
                   </a>
                 )}
               </div>
             )
           })}
        </div>

        <div className="p-6 border-t border-gray-800 space-y-4 bg-gray-900">
           <button
            onClick={toggleLang}
            className="flex items-center justify-center w-full py-3 border border-gray-700 rounded-xl text-gray-300 hover:bg-gray-800 transition"
          >
            <span className={lang === "id" ? "text-white font-bold" : ""}>INDONESIA</span>
            <span className="mx-3 opacity-30">|</span>
            <span className={lang === "en" ? "text-white font-bold" : ""}>ENGLISH</span>
          </button>
           
           <div className="grid grid-cols-2 gap-3">
             <a
              href="/chat"
              className="flex items-center justify-center py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 active:scale-95 transition"
             >
               Chat
             </a>
             <a
              href="/cp"
              className="flex items-center justify-center py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition"
             >
               Compro
             </a>
           </div>
        </div>
      </div>
    </>
  );
};

export default Header;