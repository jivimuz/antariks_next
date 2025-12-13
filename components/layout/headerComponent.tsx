"use client"
import LangContext from "@/context/langContext";
import { Menu, X } from "lucide-react";
import { useContext, useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { lang, setLang, t } = useContext(LangContext);

  const toggleLang = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gray-950 bg-opacity-80 backdrop-blur-md z-50 shadow-lg shadow-green-900/10 print:opacity-0">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <a href="../">
            <svg viewBox="0 0 600 200" width="300" xmlns="http://www.w3.org/2000/svg">
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {t.navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <a
                  href={link?.href ?? "#"}
                  className="text-gray-300 relative group-hover:text-white transition"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                </a>

                {link?.children?.length > 0 && (
                  <div className="absolute left-0 mt-3 bg-gray-800 py-3 px-4 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[180px] space-y-2 z-[999]">
                    {link.children.map((child) => (
                      <a
                        key={child.label ?? child.href ?? Math.random()}
                        href={child?.href ?? "#"}
                        className="block text-gray-300 hover:text-white hover:translate-x-1 transition"
                      >
                        {child?.label ?? child?.href ?? ""}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Desktop Language Toggle */}
            <button
              onClick={toggleLang}
              className="text-gray-300 font-medium py-1 px-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <span className={lang === "id" ? "text-white font-bold" : "text-gray-500"}>ID</span>
              <span className="mx-1 text-gray-600">|</span>
              <span className={lang === "en" ? "text-white font-bold" : "text-gray-500"}>EN</span>
            </button>

            <a
              href="/chat"
              className="bg-emerald-600 text-white py-2 px-5 rounded-full font-medium shadow-md shadow-green-600/30 transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg hover:shadow-green-500/50 hover:-translate-y-1"
            >
              {t.contactCta}
            </a>

            <a
              href="/cp"
              className="bg-blue-600 text-white py-2 px-5 rounded-full font-medium shadow-md transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1"
            >
              Company Profile
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="text-white">
              <Menu size={28} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-3/4 max-w-sm h-full bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setIsMenuOpen(false)} className="text-white">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col items-start space-y-6 mt-6 px-6 w-full">
          {t.navLinks.map((link) => {
            const hasChildren = Array.isArray(link?.children) && link.children.length > 0;

            return (
              <div key={link.label ?? link.href ?? Math.random()} className="w-full">
                {/* If item has children -> render toggle button */}
                {hasChildren ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.label ? null : link.label)
                      }
                      className="text-gray-200 text-xl w-full flex justify-between items-center"
                    >
                      <span>{link.label}</span>
                      <span className="text-gray-400 text-2xl">
                        {openDropdown === link.label ? "−" : "+"}
                      </span>
                    </button>

                    {openDropdown === link.label && (
                      <div className="mt-2 ml-4 space-y-2">
                        {link.children.map((child) => (
                          <a
                            key={child.label ?? child.href ?? Math.random()}
                            href={child?.href ?? "#"}
                            target={ "_top"}
                            className="block text-gray-400 text-lg"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child?.label ?? child?.href ?? ""}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* If no children -> normal link (will navigate) */
                  <a
                    href={link?.href ?? "#"}
                    target={ "_top" }
                    className="text-gray-200 text-xl block w-full text-left"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )}
              </div>
            );
          })}

          {/* CTA Buttons */}
          <a
            href="/chat"
            className="bg-emerald-600 text-white py-3 px-6 rounded-full font-medium text-lg w-full text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            {t.contactCta}
          </a>

          <a
            href="/cp"
            className="bg-blue-600 text-white py-3 px-6 rounded-full font-medium text-lg w-full text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Company Profile
          </a>

          {/* Mobile Language Toggle */}
          <button
            onClick={toggleLang}
            className="text-gray-300 font-medium py-2 px-3 rounded-md hover:bg-gray-700 transition-colors mt-4"
          >
            <span className={lang === "id" ? "text-white font-bold text-lg" : "text-gray-500 text-lg"}>
              Indonesia
            </span>
            <span className="mx-2 text-gray-600">|</span>
            <span className={lang === "en" ? "text-white font-bold text-lg" : "text-gray-500 text-lg"}>
              English
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
