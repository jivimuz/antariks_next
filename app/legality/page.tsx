"use client"; // Diperlukan untuk hooks

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
// Impor ikon
import { Github, Linkedin, ShieldCheck } from "lucide-react";
import LangContext from "@/context/langContext";
import Header from "@/components/layout/headerComponent";
import Footer from "@/components/layout/footerComponent";

// -- Objek Konten Bilingual --
const allContent = {
  id: {
    header: {
      back: "Kembali ke Beranda",
    },
    legality: {
      title: "Legalitas Perusahaan",
      subtitle:
        "Informasi pendaftaran resmi PT. Antariks Global Technology.",
      companyName: "PT Antariks Global Technology",
      companyType: "Perseroan Terbatas (PT) Terdaftar di Indonesia",
      regDetails: "Detail Registrasi (Ringkasan):",
      entityType: "Tipe Badan Hukum",
      entityTypeValue: "Perseroan Terbatas (PT) Indonesia",
      regNumber: "Nomor Registrasi",
      regNumberValue: "AHU-063449.AH.01.30.2025",
      authority: "Otoritas Penerbit",
      authorityValue: "Kementerian Hukum & HAM, Republik Indonesia",
      office: "Kantor Terdaftar",
      officeValue: "Cirebon, Indonesia",
      status: "Status",
      statusValue: "Aktif & Patuh Sepenuhnya",
      docsProvided: "Dokumen Disediakan:",
      doc1: "Sertifikat Pendaftaran Perusahaan (Indonesia – Bahasa Asli)",
      doc2: "Dokumen legal lengkap tersedia berdasarkan permintaan",
      docPhotoTitle: "Foto Dokumen",
    },
    footer: {
      copyright: "Seluruh Hak Cipta.",
    },
  },
  en: {
    header: {
      back: "Back to Home",
    },
    legality: {
      title: "Company Legality",
      subtitle: "Official registration information for PT. Antariks Global Technology.",
      companyName: "PT Antariks Global Technology",
      companyType: "Registered Indonesian Private Limited Company",
      regDetails: "Registration Details (Summary):",
      entityType: "Legal Entity Type",
      entityTypeValue: "Indonesian PT (Perseroan Terbatas)",
      regNumber: "Registration Number",
      regNumberValue: "AHU-063449.AH.01.30.2025",
      authority: "Issuing Authority",
      authorityValue: "Ministry of Law & Human Rights, Republic of Indonesia",
      office: "Registered Office",
      officeValue: "Cirebon, Indonesia",
      status: "Status",
      statusValue: "Active & Fully Compliant",
      docsProvided: "Document Provided:",
      doc1: "Certificate of Company Registration (Indonesia – Original Language)",
      doc2: "Full legal document available upon request",
      docPhotoTitle: "Document Photo",
    },
    footer: {
      copyright: "All Rights Reserved.",
    },
  },
};

// -- Context Bahasa --


// -- Komponen Konten Halaman Legalitas --
const LegalityPageContent = () => {
  const { lang} = useContext(LangContext);
  const t = allContent[lang];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-gray-900 text-center">
        <div className="container mx-auto px-6">
          <ShieldCheck
            size={64}
            className="text-green-500 mx-auto mb-6"
            strokeWidth={1.5}
          />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4">
            {t.legality.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400">
            {t.legality.subtitle}
          </p>
        </div>
      </section>

      {/* Konten Legalitas */}
      <section className="py-16 md:py-28 bg-gray-950">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Sisi Kiri: Detail Teks */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-2">
                {t.legality.companyName}
              </h2>
              <p className="text-lg text-green-400 mb-6">
                {t.legality.companyType}
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">
                {t.legality.regDetails}
              </h3>

              {/* Daftar Deskripsi untuk detail legal */}
              <dl className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <dt className="text-sm font-medium text-gray-400">
                    {t.legality.entityType}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-white">
                    {t.legality.entityTypeValue}
                  </dd>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <dt className="text-sm font-medium text-gray-400">
                    {t.legality.regNumber}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-white">
                    {t.legality.regNumberValue}
                  </dd>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <dt className="text-sm font-medium text-gray-400">
                    {t.legality.authority}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-white">
                    {t.legality.authorityValue}
                  </dd>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <dt className="text-sm font-medium text-gray-400">
                    {t.legality.office}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-white">
                    {t.legality.officeValue}
                  </dd>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <dt className="text-sm font-medium text-gray-400">
                    {t.legality.status}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-green-500">
                    {t.legality.statusValue}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Sisi Kanan: Foto Dokumen */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                {t.legality.docPhotoTitle}
              </h3>

              {/* Placeholder untuk foto dokumen */}
              <div className="rounded-lg overflow-hidden shadow-lg border-2 border-gray-700 hover:border-green-600 transition-colors duration-300">
                <img
                  src="/image/legality.png"
                  alt="Contoh Dokumen Legal"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="mt-6">
                <h4 className="text-xl font-semibold text-white mb-3">
                  {t.legality.docsProvided}
                </h4>
                <ul className="space-y-2 list-disc list-inside text-gray-300">
                  <li>{t.legality.doc1}</li>
                  <li>{t.legality.doc2}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// -- Komponen Halaman Utama --
export default function LegalityPage() {
  const { lang} = useContext(LangContext);
  const t = allContent[lang];

  return (
    < >
     
      <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
        <Header />
        <main>
          <LegalityPageContent />
        </main>
        <Footer />
      </div>
    </>
  );
}