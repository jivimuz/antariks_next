"use client";
import React, { useContext, useState } from "react";
// Import dengan relative path yang sesuai struktur folder
// app/components/layout/footerComponent.jsx -> ../../context/langContext.jsx
import LangContext from "../../context/langContext";
import {
  Github,
  Linkedin,
  Instagram,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Globe,
  ChevronDown
} from "lucide-react";

const Footer = () => {
  // Menggunakan context
  const context = useContext(LangContext);
  // Fallback values untuk menghindari crash jika context belum siap
  const lang = context?.lang || "id";
  const t = context?.t || { navLinks: [], footer: { copyright: "All Rights Reserved" } };
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-white/10 pt-16 pb-8 text-sm relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* TOP SECTION: Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-8 mb-12">
          
          {/* COL 1: Brand & Socials (Span 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
               {/* Logo SVG Kecil */}
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
            
            <p className="text-gray-400 leading-relaxed max-w-sm text-base">
              {lang === 'id' 
                ? 'Mitra teknologi terpercaya untuk transformasi digital bisnis Anda. Kami membangun solusi masa depan.' 
                : 'Your trusted technology partner for digital business transformation. We build future-ready solutions.'}
            </p>

            <div className="flex items-center gap-4">
              <SocialButton href="https://www.instagram.com/antariks.corp/" icon={<Instagram size={20} />} color="hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10" />
              <SocialButton href="https://www.linkedin.com/company/antariks/" icon={<Linkedin size={20} />} color="hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10" />
              {/* <SocialButton href="https://github.com" icon={<Github size={20} />} color="hover:text-white hover:border-white/50 hover:bg-white/10" /> */}
            </div>
          </div>

          {/* COL GROUP: Links */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
            
            {/* Navigation Menu (Accordion on Mobile) */}
            <FooterGroup title={lang === 'id' ? 'Menu' : 'Menu'}>
              <ul className="space-y-3">
                {t.navLinks && t.navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href ?? "#"} className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group text-base">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all duration-300"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterGroup>

            {/* Services (Accordion on Mobile) */}
            <FooterGroup title={lang === 'id' ? 'Solusi & Layanan' : 'Solutions & Services'}>
              <ul className="space-y-3">
                <li><FooterLink href="/#services" text="Web & Mobile Apps (iOS/Android)" /></li>
                <li><FooterLink href="/products/erp" text="Enterprise Resource Planning (ERP)" /></li>
                <li><FooterLink href="/products/multi_level" text="Multi-Level Agency System" /></li>
                <li><FooterLink href="/products/healthcare" text="Healthcare Systems" /></li>
                <li><FooterLink href="/products/pos" text="Point of Sales (POS)" /></li>
                <li><FooterLink href="/products/umrah_and_hajj" text="Umrah and Hajj" /></li>
              </ul>
            </FooterGroup>

            {/* Contact (Accordion on Mobile) */}
            <FooterGroup title={lang === 'id' ? 'Hubungi Kami' : 'Contact Us'}>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400">
                  <MapPin className="shrink-0 text-emerald-500 mt-1" size={18} />
                  <span className="leading-snug">Jl. Griya Caraka No. A2, Kedawung<br/>Cirebon, Jawa Barat 45132</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Mail className="shrink-0 text-emerald-500" size={18} />
                  <a href="mailto:antariks.corp@gmail.com" className="hover:text-white transition-colors">admin@antariks.id</a>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                   <Phone className="shrink-0 text-emerald-500" size={18} />
                   <a href="https://wa.me/628139580425" target="_blank" className="hover:text-white transition-colors">+62 813-9580-425</a>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                   <Globe className="shrink-0 text-emerald-500" size={18} />
                   <a href="https://antariks.id" target="_blank" className="hover:text-white transition-colors">www.antariks.id</a>
                </li>
              </ul>
            </FooterGroup>

          </div>
        </div>

        {/* BOTTOM SECTION: Copyright & Legal */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p className="text-center md:text-left">
            © {currentYear} <span className="text-gray-300 font-medium">PT. Antariks Global Technology</span>.
          </p>
          <div className="flex gap-6">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Komponen Accordion untuk Mobile (Group Footer)
type FooterGroupProps = {
  title: string;
  children: React.ReactNode;
};

const FooterGroup = ({ title, children }: FooterGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 md:border-none last:border-0 pb-4 md:pb-0">
      {/* Tombol Toggle (Hanya aktif di Mobile via CSS logic/onClick) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:cursor-default group"
      >
        <h3 className="text-white font-semibold text-base uppercase tracking-wider mb-2 md:mb-5">
          {title}
        </h3>
        {/* Ikon Chevron hanya muncul di mobile */}
        <ChevronDown 
          size={18} 
          className={`text-gray-400 md:hidden transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} 
        />
      </button>

      {/* Konten: Hidden di mobile kecuali isOpen = true, Selalu block di desktop (md:block) */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block transition-all duration-300`}>
        {children}
      </div>
    </div>
  );
};

// Komponen Kecil untuk Link Footer
type FooterLinkProps = {
  href: string;
  text: string;
};

const FooterLink = ({ href, text }: FooterLinkProps) => (
  <a href={href} className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group text-base">
    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-emerald-500" />
    {text}
  </a>
);

// Komponen Kecil untuk Tombol Sosial Media
type SocialButtonProps = {
  href: string;
  icon: React.ReactNode;
  color?: string;
};

const SocialButton = ({ href, icon, color }: SocialButtonProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 ${color}`}
  >
    {icon}
  </a>
);

export default Footer;