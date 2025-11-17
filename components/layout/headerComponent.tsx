import LangContext from "@/context/langContext";
import { Menu, X } from "lucide-react";
import { useContext, useState } from "react";

// -- Komponen Header & Navigasi --
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t } = useContext(LangContext);

  const toggleLang = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  return (
    <>
    <header className="fixed top-0 left-0 w-full bg-gray-950 bg-opacity-80 backdrop-blur-md z-50 shadow-lg shadow-green-900/10 print:opacity-0">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          
        >
          <svg viewBox="0 0 600 200" width="300"  xmlns="http://www.w3.org/2000/svg">
        
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

            
            <text x="50%" y="60%" className="logo-text">ANTARIKS</text>
            
            <text x="50%" y="75%" className="tagline">
                Always be your IT solution
            </text>
        
        </svg>
        </a>

        {/* Navigasi Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {t.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-300 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          {/* Language Toggle Desktop */}
          <button
            onClick={toggleLang}
            className="text-gray-300 font-medium py-1 px-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <span
              className={
                lang === "id" ? "text-white font-bold" : "text-gray-500"
              }
            >
              ID
            </span>
            <span className="mx-1 text-gray-600">|</span>
            <span
              className={
                lang === "en" ? "text-white font-bold" : "text-gray-500"
              }
            >
              EN
            </span>
          </button>
          <a
            href="/chat"
            className="bg-emerald-600 text-white py-2 px-5 rounded-full font-medium shadow-md shadow-green-600/30 transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg hover:shadow-green-500/50 hover:-translate-y-1"
          >
            {t.contactCta}
          </a>
          <a
            href="/cp"
            className="bg-blue-600 text-white py-2 px-5 rounded-full font-medium shadow-md shadow-green-600/30 transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1"
          >
            Company Profile
          </a>
        </div>

        {/* Tombol Menu Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)} className="text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>
    </header>

      {/* Menu Mobile (Overlay) */}
      <div
        className={`fixed top-0 right-0 w-3/4 max-w-sm h-full bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setIsMenuOpen(false)} className="text-white">
            <X size={28} />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 mt-10">
          {t.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-300 text-xl"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/chat"
            className="bg-emerald-600 text-white py-3 px-6 rounded-full font-medium text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            {t.contactCta}
          </a>
          <a
            href="/cp"
            className="bg-blue-600 text-white py-3 px-6 rounded-full font-medium text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Company Profile
          </a>
           
          {/* Language Toggle Mobile */}
          <button
            onClick={toggleLang}
            className="text-gray-300 font-medium py-2 px-3 rounded-md hover:bg-gray-700 transition-colors mt-4"
          >
            <span
              className={
                lang === "id"
                  ? "text-white font-bold text-lg"
                  : "text-gray-500 text-lg"
              }
            >
              Indonesia
            </span>
            <span className="mx-2 text-gray-600">|</span>
            <span
              className={
                lang === "en"
                  ? "text-white font-bold text-lg"
                  : "text-gray-500 text-lg"
              }
            >
              English
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;