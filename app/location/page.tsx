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
  Github,
  Linkedin,
  MapPin, // (BARU)
  Mail, // (BARU)
  Phone, // (BARU)
} from "lucide-react";
import LangContext from "@/context/langContext";
import Header from "@/components/layout/headerComponent";
import Footer from "@/components/layout/footerComponent";

// -- Objek Konten Bilingual --
const allContent = {
  id: {
    header: {
      back: "Kembali ke Beranda",
    },
    location: {
      title: "Hubungi & Temui Kami",
      subtitle:
        "Kami siap membantu mewujudkan ide Anda. Kunjungi kantor kami di Cirebon atau kirimkan pesan kepada kami.",
      officeTitle: "Kantor Pusat Antariks",
      address: "Jl. S.A Tirtayasa No.123 Cirebon",
      city: "Jawa Barat, Indonesia 45132",
      email: "Email",
      phone: "Telepon",
      openMaps: "Buka di Google Maps",
    },
    footer: {
      copyright: "Seluruh Hak Cipta.",
    },
  },
  en: {
    header: {
      back: "Back to Home",
    },
    location: {
      title: "Contact & Visit Us",
      subtitle:
        "We're ready to bring your ideas to life. Visit our office in Cirebon or send us a message.",
      officeTitle: "Antariks HQ",
      address: "Jl. S.A Tirtayasa No.123 Cirebon",
      city: "West Java, Indonesia 45132",
      email: "Email",
      phone: "Phone",
      openMaps: "Open in Google Maps",
    },
    footer: {
      copyright: "All Rights Reserved.",
    },
  },
};


// -- Komponen Konten Halaman Lokasi --
const LocationPageContent = () => {
  const { lang } = useContext(LangContext);
  const t = allContent[lang];
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d632.2972372450716!2d108.52638230611186!3d-6.711728397466543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee3004c0bdb1b%3A0xe3d7a1cd0042f4f1!2sAntariks!5e0!3m2!1sid!2sid!4v1763121831675!5m2!1sid!2sid";

  return (
    <>
      {/* Konten Halaman */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-gray-950">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Sisi Kiri: Peta */}
            <div className="w-full h-96 lg:h-auto min-h-[500px]">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl shadow-2xl border border-gray-700"
              ></iframe>
            </div>

            {/* Sisi Kanan: Info Kontak */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
                {t.location.title}
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                {t.location.subtitle}
              </p>

              <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800 shadow-xl space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {t.location.officeTitle}
                  </h2>
                  <div className="flex items-start gap-4 text-lg">
                    <MapPin
                      className="text-green-400 mt-1 flex-shrink-0"
                      size={24}
                    />
                    <div className="text-gray-300">
                      <p>{t.location.address}</p>
                      <p>{t.location.city}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-6 space-y-4">
                  <div className="flex items-center gap-4 text-lg">
                    <Mail
                      className="text-green-400 flex-shrink-0"
                      size={24}
                    />
                    <div className="text-gray-300">
                      <span className="font-semibold block">{t.location.email}</span>
                      <a
                        href="mailto:antariks.corp@gmail.com"
                        className="hover:text-green-400 transition-colors"
                      >
                        antariks.corp@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-lg">
                    <Phone
                      className="text-green-400 flex-shrink-0"
                      size={24}
                    />
                    <div className="text-gray-300">
                      <span className="font-semibold block">{t.location.phone}</span>
                      <a
                        href="tel:+6282120741970"
                        className="hover:text-green-400 transition-colors"
                      >
                        +62 821-2074-1970 (Jivi)
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/jnBK65uuQC5DkHo47" // Link Google Maps langsung
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block bg-green-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg shadow-green-600/30 transition-all duration-300 hover:bg-green-500 hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-1 transform w-full sm:w-auto text-center"
              >
                {t.location.openMaps}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// -- Komponen Halaman Utama --
export default function LocationPage() {

  return (

    <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
      <Header />
      <main className="mt-10 md:mt-0">
        <LocationPageContent />
      </main>
      <Footer />
    </div>
  );
}