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
      address: "Jl. Caraka Raya, Perum Griya Caraka, Kalikoa, Kedawung, Cirebon",
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
      address: "Jl. Caraka Raya, Perum Griya Caraka, Kalikoa, Kedawung, Cirebon",
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
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2801.7881805752877!2d108.51892488531806!3d-6.729918276038135!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1f34de8c08db%3A0x905c82594ebb6688!2sAntariks%20Global%20Technology!5e0!3m2!1sid!2sid!4v1768450410500!5m2!1sid!2sid";

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
                 className="rounded-xl shadow-2xl border border-gray-700 border-0  inset-0 filter grayscale invert contrast-75 opacity-80 hover:opacity-100 transition-opacity" 
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
                        href="mailto:antariks@jivimuz.my.id"
                        className="hover:text-green-400 transition-colors"
                      >
                        - admin@antariks.id 
                      </a><br />
                       <a
                        href="mailto:antariks.corp@gmail.com"
                        className="hover:text-green-400 transition-colors"
                      >
                        - antariks.corp@gmail.com
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
                        +62 811-2003-0163 (Sales & Marketing)
                      </a>
                      <br />
                        <a
                        href="tel:+6282120741970"
                        className="hover:text-green-400 transition-colors"
                      >
                        +62 821-2084-1970 (Support)
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/8ei85kUxS9wBvnZN9" // Link Google Maps langsung
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

// -- (MODIFIKASI) Komponen Kontak --
const Contact = () => {
  const { t } = useContext(LangContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMessage("");

    const tForm = t.contact.form;
    const formspreeEndpoint = "https://formspree.io/f/mqalnpdr";

    if (!name || !email || !message) {
      setStatus("error");
      setResponseMessage(tForm.errorEmpty);
      return;
    }

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("success");
        setResponseMessage(tForm.success);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setResponseMessage(tForm.error);
      }
    } catch (error) {
      setStatus("error");
      setResponseMessage(tForm.error);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-gray-900/70 relative overflow-hidden">
         {/* --- 1. Ambient Background Effects (Sama seperti Services) --- */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t.contact.form.name}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder={t.contact.form.namePlaceholder}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t.contact.form.email}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder={t.contact.form.emailPlaceholder}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder={t.contact.form.messagePlaceholder}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-emerald-600 text-white py-3 px-10 rounded-full text-lg font-semibold shadow-lg shadow-green-600/30 transition-all duration-300 hover:bg-emerald-500 hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-1 transform disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {status === "loading"
                  ? t.contact.form.loading
                  : t.contact.form.submit}
              </button>
            </div>
          </form>

          {/* Status Messages */}
          <div className="mt-6 text-center">
            {status === "success" && (
              <p className="text-green-400">{responseMessage}</p>
            )}
            {status === "error" && (
              <p className="text-red-400">{responseMessage}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
// -- Komponen Halaman Utama --
export default function LocationPage() {

  return (

    <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
      <Header />
      <main className="mt-10 md:mt-0">
        <LocationPageContent />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}