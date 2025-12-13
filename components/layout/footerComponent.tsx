import LangContext from "@/context/langContext";
import { useContext } from "react";

const Footer = () => {
  const { t } = useContext(LangContext);

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-6 py-6">

        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* BRAND */}
          <div className="text-white font-semibold tracking-wide">
            Antariks Global Technolgy
          </div>

          {/* NAV INLINE */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm hidden lg:flex">
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
                  <div className="absolute left-0 -mt-45 overflow-hidden bg-gray-800 py-3 px-4 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[180px] space-y-2 z-[999]">
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
          </nav>

          {/* SOCIAL */}
          <div className="flex gap-4 md:mr-6">
          <a
            href="https://www.instagram.com/antariks.corp/"
            target="_blank"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-900 hover:bg-pink-600/20 hover:text-pink-500 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37a4 4 0 1 1-7.99 0 4 4 0 0 1 7.99 0z" />
              <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/antariks/"
            target="_blank"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-900 hover:bg-emerald-600/20 hover:text-emerald-400 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Antariks. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
