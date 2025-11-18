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
  Send, // (BARU)
  Mail, // (BARU)
  User, // (BARU)
  Building, // (BARU)
  FileText, // (BARU)
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
    adminSender: {
      title: "Pengirim Proposal Admin",
      subtitle:
        "Isi form untuk mempersonalisasi template dan kirim via aplikasi email Anda.",
      form: {
        toName: "Nama Klien",
        toNamePlaceholder: "Contoh: Bpk. Budi",
        toEmail: "Email Klien",
        toEmailPlaceholder: "budi@perusahaan.com",
        companyName: "Nama Perusahaan Klien",
        companyNamePlaceholder: "PT. Manufaktur Maju",
        template: "Pilih Template",
      },
      preview: {
        title: "Pratinjau Email",
        subject: "Subjek:",
        body: "Isi Email:",
      },
      buttons: {
        send: "Buka & Kirim Email",
        loading: "Mempersiapkan...",
      },
      status: {
        success:
          "Email telah disiapkan! Silakan kirim dari aplikasi email Anda.",
        error: "Harap isi semua kolom untuk membuat email.",
      },
      templates: {
        template1: {
          label: "Proposal Sender (Manufacturing)",
          subject: "Peluang Kolaborasi: Solusi Software Antariks",
          // (BARU) Template email versi Bahasa Indonesia
          body: `Kepada {{Name}},

Semoga Anda dalam keadaan baik.
Nama saya Jivi, dan saya mewakili Antariks, sebuah perusahaan pengembang perangkat lunak yang fokus pada solusi untuk operasi manufaktur.

Saya memahami bahwa banyak pabrikan sudah memiliki sistem ERP atau MES. Namun, kami sering melihat kesenjangan operasional di mana sistem yang ada mungkin tidak sepenuhnya mendukung alur kerja spesifik atau kebutuhan produksi real-time.

Untuk mengatasi ini, kami menyediakan:
• Aplikasi kustom yang disesuaikan dengan proses unik
• Modul tambahan (add-on) untuk meningkatkan kemampuan ERP/MES yang ada
• Layanan integrasi antar sistem dan peralatan
• Aplikasi mobile dan lantai produksi untuk pengambilan data real-time
• Dasbor operasional dan alat visibilitas produksi

Pendekatan kami tidak mengharuskan penggantian sistem Anda saat ini; sebaliknya, kami melengkapinya dengan solusi yang ditargetkan untuk meningkatkan efisiensi, visibilitas, dan akurasi alur kerja.

Jika hal ini relevan untuk {{CompanyName}}, saya akan sangat senang untuk mengatur diskusi singkat 15–20 menit untuk memahami kebutuhan operasional Anda dan berbagi contoh pekerjaan serupa yang telah kami lakukan.

Mohon informasikan waktu yang sesuai, dan saya akan dengan senang hati berkoordinasi.

Hormat saya,
Jivi
Founder — Antariks

antariks.corp@gmail.com
https://antariks.vercel.app`,
        },
        // (BARU) Template 2 (Follow-up) - Versi Indonesia
        template2: {
          label: "Follow-Up (Manufacturing)",
          subject: "Tindak Lanjut: Peluang Kolaborasi Antariks",
          body: `Kepada {{Name}},

Saya ingin menindaklanjuti email saya sebelumnya, seandainya email tersebut tidak terkirim.

Jika {{CompanyName}} sedang menjajaki peningkatan efisiensi produksi atau mempertimbangkan aplikasi kustom, modul tambahan (add-on), atau integrasi untuk lingkungan ERP/MES Anda saat ini, tim saya akan dengan senang hati memberikan wawasan atau mendemonstrasikan solusi yang relevan.

Silakan informasikan jika diskusi singkat dirasa perlu.

Hormat saya,
Jivi`,
        },
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
    adminSender: {
      title: "Admin Proposal Sender",
      subtitle:
        "Fill the form to personalize the template and send via your email client.",
      form: {
        toName: "Client's Name",
        toNamePlaceholder: "e.g. Mr. Budi",
        toEmail: "Client's Email",
        toEmailPlaceholder: "budi@company.com",
        companyName: "Client's Company Name",
        companyNamePlaceholder: "PT. Manufacturing Maju",
        template: "Select Template",
      },
      preview: {
        title: "Email Preview",
        subject: "Subject:",
        body: "Body:",
      },
      buttons: {
        send: "Open & Send Email",
        loading: "Preparing...",
      },
      status: {
        success: "Email prepared! Please send it from your email client.",
        error: "Please fill all fields to generate the email.",
      },
      templates: {
        template1: {
          label: "Proposal Sender (Manufacturing)",
          subject: "Collaboration Opportunity: Antariks Software Solutions",
          // (DARI ANDA) Template email versi Bahasa Inggris
          body: `Dear {{Name}},

I hope you are well.
My name is Jivi, and I represent Antariks, a software development company focused on solutions for manufacturing operations.

I understand that many manufacturers already have ERP or MES systems in place. However, we frequently see operational gaps where existing systems may not fully support specific workflows or real-time production needs.

To address this, we provide:
• Custom applications tailored to unique processes
• Add-on modules to enhance existing ERP/MES capabilities
• Integration services between systems and equipment
• Mobile and shop floor applications for real-time data capture
• Operational dashboards and production visibility tools

Our approach does not require replacing your current system; instead, we complement it with targeted solutions that improve efficiency, visibility, and workflow accuracy.

If this is relevant to {{CompanyName}}, I would be pleased to arrange a brief 15–20 minute discussion to understand your operational requirements and share examples of similar work we have delivered.

Please let me know a suitable time, and I will be happy to coordinate.

Kind regards,
Jivi
Founder — Antariks

antariks.corp@gmail.com
https://antariks.vercel.app`,
        },
        // (BARU) Template 2 (Follow-up) - Versi Inggris
        template2: {
          label: "Follow-Up (Manufacturing)",
          subject: "Follow-up: Collaboration Opportunity",
          body: `Dear {{Name}},

I am following up on my earlier email in case it did not reach you.

If {{CompanyName}} is exploring improvements in production efficiency or is considering custom applications, add-on modules, or integrations for your current ERP/MES environment, my team would be glad to provide insights or demonstrate relevant solutions.

Please feel free to advise if a short discussion would be appropriate.

Kind regards,
Jivi`,
        },
      },
    },
    footer: {
      copyright: "All Rights Reserved.",
    },
  },
};

// -- Komponen Konten Halaman Admin Sender --
const EmailSenderContent = () => {
  
  const { lang } = useContext(LangContext);
  const t = allContent[lang];
  const [toName, setToName] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("idle");
  const [responseMessage, setResponseMessage] = useState("");

  // Efek untuk memperbarui pratinjau email secara real-time
  useEffect(() => {
    // Pastikan t.adminSender.templates ada sebelum diakses
    if (!t.adminSender || !t.adminSender.templates) return;

    const templateData = t.adminSender.templates[selectedTemplate as keyof typeof t.adminSender.templates];

    if (!templateData) return;

    let populatedSubject = templateData.subject;
    let populatedBody = templateData.body;

    // Ganti placeholder
    populatedBody = populatedBody.replace(
      /{{Name}}/g,
      toName || "{{Name}}"
    );
    populatedBody = populatedBody.replace(
      /{{CompanyName}}/g,
      companyName || "{{CompanyName}}"
    );

    setSubject(populatedSubject);
    setBody(populatedBody);
  }, [toName, companyName, selectedTemplate, t]); // 'companyName' ditambahkan ke dependency array

  // Fungsi untuk membuka klien email
  const handleSendEmail = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMessage("");

    if (!toEmail || !subject || !body || !toName || !companyName) {
      setStatus("error");
      setResponseMessage(t.adminSender.status.error);
      return;
    }

    // Buat link mailto:
    const mailtoHref = `mailto:${toEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Buka di klien email
    window.location.href = mailtoHref;
    setStatus("success");
    setResponseMessage(t.adminSender.status.success);

    // Reset status setelah beberapa detik
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-gray-900 text-center">
        <div className="container mx-auto px-6">
          <FileText
            size={64}
            className="text-green-500 mx-auto mb-6"
            strokeWidth={1.5}
          />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4">
            {t.adminSender.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            {t.adminSender.subtitle}
          </p>
        </div>
      </section>

      {/* Konten Utama */}
      <section className="py-16 md:py-28 bg-gray-950">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Sisi Kiri: Form Input */}
            <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800 shadow-xl">
              <form onSubmit={handleSendEmail} className="space-y-6">
                {/* To Name */}
                <div>
                  <label
                    htmlFor="toName"
                    className="flex items-center text-sm font-medium text-gray-300 mb-2"
                  >
                    <User size={16} className="mr-2 text-green-400" />
                    {t.adminSender.form.toName}
                  </label>
                  <input
                    type="text"
                    id="toName"
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={t.adminSender.form.toNamePlaceholder}
                    required
                  />
                </div>

                {/* To Email */}
                <div>
                  <label
                    htmlFor="toEmail"
                    className="flex items-center text-sm font-medium text-gray-300 mb-2"
                  >
                    <Mail size={16} className="mr-2 text-green-400" />
                    {t.adminSender.form.toEmail}
                  </label>
                  <input
                    type="email"
                    id="toEmail"
                    value={toEmail}
                    onChange={(e) => setToEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={t.adminSender.form.toEmailPlaceholder}
                    required
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="flex items-center text-sm font-medium text-gray-300 mb-2"
                  >
                    <Building size={16} className="mr-2 text-green-400" />
                    {t.adminSender.form.companyName}
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={t.adminSender.form.companyNamePlaceholder}
                    required
                  />
                </div>

                {/* Template Select */}
                <div>
                  <label
                    htmlFor="template"
                    className="flex items-center text-sm font-medium text-gray-300 mb-2"
                  >
                    <FileText size={16} className="mr-2 text-green-400" />
                    {t.adminSender.form.template}
                  </label>
                  <select
                    id="template"
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="template1">
                      {t.adminSender.templates.template1.label}
                    </option>
                    {/* (BARU) Opsi untuk Template 2 */}
                    <option value="template2">
                      {t.adminSender.templates.template2.label}
                    </option>
                  </select>
                </div>

                {/* Tombol Kirim */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-3 bg-green-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg shadow-green-600/30 transition-all duration-300 hover:bg-green-500 hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-1 transform disabled:bg-gray-500"
                  >
                    <Send size={20} />
                    {status === "loading"
                      ? t.adminSender.buttons.loading
                      : t.adminSender.buttons.send}
                  </button>
                </div>

                {/* Status Message */}
                <div className="text-center pt-2">
                  {status === "success" && (
                    <p className="text-green-400">{responseMessage}</p>
                  )}
                  {status === "error" && (
                    <p className="text-red-400">{responseMessage}</p>
                  )}
                </div>
              </form>
            </div>

            {/* Sisi Kanan: Pratinjau Email */}
            <div className="bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-800 shadow-xl lg:max-h-[700px] lg:overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">
                {t.adminSender.preview.title}
              </h2>

              {/* Pratinjau Subjek */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  {t.adminSender.preview.subject}
                </h3>
                <div className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200">
                  {subject}
                </div>
              </div>

              {/* Pratinjau Isi Email */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  {t.adminSender.preview.body}
                </h3>
                {/* Menggunakan <pre> untuk menjaga format line breaks */}
                <pre className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed">
                  {body}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// -- Komponen Halaman Utama --
export default function AdminSenderPage() {
  return (
      <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
        <Header />
        <main>
          <EmailSenderContent />
        </main>
        <Footer />
      </div>
  );
}