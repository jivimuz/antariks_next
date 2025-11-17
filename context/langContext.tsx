"use client"
import { Headset, LineChart, Star, Users } from "lucide-react";
import React, { createContext, useState, ReactNode } from "react";

// =======================
// ALL CONTENT
// =======================
export const allContent = {
  id: {
    navLinks: [
      { href: "#services", label: "Layanan" },
      { href: "#products", label: "Produk" },
      { href: "#about", label: "Tentang Kami" },
      { href: "#location", label: "Lokasi" },
      { href: "#testimonials", label: "Testimoni" },
    ],
    contactCta: "Konsultasi Sekarang",
    hero: {
      heading1: "Menyediakan",
      typing: "Solusi Software Inovatif.",
      subtitle:
        "Kami adalah arsitek digital Anda, mengubah ide kompleks menjadi perangkat lunak yang elegan, skalabel, dan aman.",
      cta: "Konsultasi Sekarang",
    },
    services: {
      title: "Layanan Unggulan Kami",
      subtitle:
        "Kami menyediakan solusi teknologi end-to-end untuk mendorong pertumbuhan bisnis Anda.",
      items: [
        {
          title: "Web Development",
          description:
            "Pengembangan web kustom, dari landing page hingga aplikasi web kompleks.",
        },
        {
          title: "Mobile Development",
          description:
            "Aplikasi mobile native iOS/Android dan cross-platform.",
        },
        {
          title: "Cloud & DevOps",
          description:
            "Solusi cloud yang skalabel dengan CI/CD & otomatisasi.",
        },
        {
          title: "UI/UX Design",
          description: "Desain indah, fungsional, dan fokus user experience.",
        },
        {
          title: "Data Engineering",
          description: "Pipeline data, data warehouse, & solusi analitik.",
        },
        {
          title: "Konsultasi IT",
          description: "Wawasan strategis dan roadmap teknologi.",
        },
      ],
    },
    techStack: {
      title: "Teknologi Kami",
      subtitle:
        "Kami menguasai tumpukan teknologi modern untuk membangun solusi terbaik.",
    },
    products: {
      title: "Produk & Portofolio Kami",
      subtitle: "Contoh nyata dari bagaimana kami mengubah ide menjadi solusi.",
    },
    about: {
      title: "Tentang",
      p1: "Antariks bukan sekadar vendor, kami adalah mitra teknologi Anda.",
      p2: "Tim kami terdiri dari engineer, desainer, dan strategist.",
      cta: "Mulai Proyek Anda",
    },
    partners: {
      title: "Mitra Kami",
      subtitle: "Perusahaan yang menggunakan jasa kami.",
      logos: [
        { src: "image/partners/pt1.png", alt: "Partner Logo 1" },
        { src: "image/partners/pt2.png", alt: "Partner Logo 2" },
      ],
    },
    testimonials: {
      title: "Apa Kata Klien Kami",
      subtitle: "Kemitraan adalah aset terbesar kami.",
    },
    location: {
      title: "Lokasi Kami",
      subtitle: "Temukan kami di pusat inovasi.",
      hq: "Antariks HQ",
      address: "JL. S.A Tirtayasa No.123 Cirebon",
      city: "Jawa Barat 45132",
      email: "Email:",
      phone: "Phone:",
    },
    contact: {
      title: "Mari Bicara",
      subtitle:
        "Punya ide brilian atau masalah kompleks? Kami siap membantu.",
      form: {
        name: "Nama Anda",
        namePlaceholder: "John Doe",
        email: "Email",
        emailPlaceholder: "anda@email.com",
        message: "Pesan Anda",
        messagePlaceholder: "Ceritakan tentang proyek Anda...",
        submit: "Kirim Pesan",
        loading: "Mengirim...",
        success: "Pesan terkirim! Kami akan segera menghubungi Anda.",
        error: "Gagal mengirim. Coba lagi nanti.",
        errorEmpty: "Harap isi semua kolom.",
      },
    },
     controls: {
            prevBtnTitle: "Slide Sebelumnya",
            nextBtnTitle: "Slide Berikutnya",
            printBtnText: "Download Profil PDF",
            printBtnTitle: "Cetak semua slide ke PDF"
        },
        slide1: {
            tag: "Company Profile 2025"
        },
        slide2: {
            title: "Tentang ANTARIKS",
             p1: "Antariks (PT. Antariks Global Technology) bukan hanya sekadar vendor. Kami adalah mitra teknologi Anda. Didirikan pada tahun 2022 dan menjadi PT di 2025, misi kami adalah menjembatani kesenjangan antara ide bisnis dan realitas digital.",
            p2: "Tim kami terdiri dari para engineer, desainer, dan ahli strategi yang terobsesi dengan kode yang bersih, desain yang fungsional, dan produk yang berdampak. Kami percaya pada kekuatan teknologi untuk menyelesaikan masalah nyata.",
        },
        slide3: {
            title: "Visi & Misi Kami",
            visiTitle: "Visi",
            visiText: "Menjadi penyedia solusi teknologi terdepan yang menghadirkan inovasi efektif, andal, dan berkelanjutan untuk mendukung transformasi digital di berbagai sektor industri.",
            misiTitle: "Misi",
            misiItems: [
                "Mengembangkan produk dan layanan teknologi yang berkualitas tinggi, aman, dan mudah diimplementasikan.",
                "Memberikan pengalaman layanan yang responsif dan profesional melalui kolaborasi yang transparan dengan setiap klien.",
                "Mendorong penerapan teknologi modern yang efisien untuk meningkatkan kinerja dan produktivias bisnis.",
                "Membangun budaya inovatif yang berfokus pada peningkatan kualitas, integritas, dan keberlanjutan.",
                "Menjadi mitra strategis yang dapat diandalkan dalam perjalanan transformasi digital perusahaan."
            ]
        },
        slide4: {
            title: "Founder Profile",
            team1Name: "Jivi Muzaqi Guntur",
            team1Title: "Founder & CEO",
            founderSaid: `Saya adalah Founder & CEO PT Antariks. Fokus saya pada pengembangan teknologi, strategi produk, dan memastikan setiap solusi yang kami bangun benar-benar berdampak.
Di Antariks, saya memimpin arah perusahaan dalam menciptakan platform digital untuk berbagai sektor, mulai dari:`,
sc1: 'Manufaktur — sistem ERP, MES, dan automasi operasional.',
sc2: 'Kesehatan — manajemen rumah sakit, klinik, dan dental care.',
sc3: '  Keuangan &amp; Layanan Publik — sistem informasi terintegrasi dan solusi data-driven.',
sc4: 'Personalia — platform HRIS dan manajemen perusahaan.',
sc5: 'Dan sektor lainnya.',
       
        },
        slide5: {
            title: "Layanan Kami",
            service1Title: "Web & App Development",
            service1Text: "Membangun platform digital yang cepat, aman, dan skalabel untuk semua perangkat.",
            service2Title: "Branding & Desain",
            service2Text: "Menciptakan identitas brand yang kuat, berkesan, dan kohesif secara visual.",
            service3Title: "Digital Marketing",
            service3Text: "Meluncurkan strategi pemasaran berbasis data untuk pertumbuhan bisnis yang terukur."
        },
        slide6: {
    title: "Beberapa Proyek Kami",
    project1Title: "ERP & MES Manufacturing",
    project1Desc: "Implementasi sistem ERP dan MES untuk meningkatkan efisiensi produksi dan integrasi operasional di sektor manufaktur.",
    
    project2Title: "Hospital & Dental Management System",
    project2Desc: "Pengembangan sistem manajemen rumah sakit dan klinik gigi dengan fokus pada alur pelayanan, rekam medis, dan automasi administrasi.",
    
    project3Title: "Point of Sale (POS)",
    project3Desc: "Pembuatan sistem POS modern untuk retail dan F&B dengan integrasi inventori, laporan real-time, dan fitur multi-outlet."
},
        slide7: {
            title: "Mengapa Memilih Antariks?",
            points: [
                { title: "Inovasi Terdepan", text: "Kami selalu menggunakan teknologi terbaru untuk memberikan solusi terbaik dan relevan.", icon: Star },
                { title: "Pendekatan Kemitraan", text: "Klien adalah mitra. Kami tumbuh bersama Anda, kesuksesan Anda adalah kesuksesan kami.", icon: Users },
                { title: "Berbasis Data", text: "Setiap keputusan kreatif dan strategis didukung oleh data yang akurat untuk hasil optimal.", icon: LineChart },
                { title: "Dukungan Penuh", text: "Tim kami siap membantu Anda 24/7, memastikan semua proyek berjalan lancar tanpa hambatan.", icon: Headset }
            ]
        },
        slide8: {
            title: "Klien Kami"
        },
        slide9: {
            title: "Mari Terhubung",
            subtitle: "Siap untuk meluncurkan proyek Anda berikutnya ke level stratosfer?",
            contactEmail: "antariks.corp@gmail.com",
            contactPhone: "+62 821 2074 1970",
            contactWeb: "https://antariks.vercel.app",
            qrLabel: "Pindai saya" // BARU: Teks untuk
        },
          chatbot: {
              title: "Asisten AI Antariks",
              subtitle: "online",
              placeholder: "Ketik pesan Anda...",
              welcome:
                "Halo! Saya asisten AI dari Antariks. Ada yang bisa saya bantu terkait proyek software Anda? (Misal: 'Saya ingin membuat aplikasi mobile?')",
              confirmation: {
                prompt:
                  "Apakah Anda tertarik untuk melanjutkan dan mengisi formulir permintaan proyek?",
                yes: "Ya, Tentu",
                no: "Tidak, Nanti Saja",
                followUp: "Baik, ada lagi yang bisa saya bantu?",
              },
            },
            form: {
              title: "Proyek Baru",
              subtitle:
                "Langkah terakhir! Isi data Anda agar tim kami dapat menghubungi Anda.",
              name: "Nama",
              namePlaceholder: "John Doe",
              email: "Email",
              emailPlaceholder: "anda@email.com",
              phone: "No. Handphone",
              phonePlaceholder: "08123456789",
              needs: "Keperluan (disimpulkan oleh AI)",
              submit: "Kirim Permintaan",
              loading: "Mengirim...",
              success:
                "Terima kasih! Permintaan Anda telah terkirim. Tim kami akan segera menghubungi Anda.",
              error: "Gagal mengirim. Silakan coba lagi nanti.",
              errorEmpty: "Harap isi semua kolom (Nama, Email, HP).",
            },
  },

  // EN
  en: {
    navLinks: [
      { href: "#services", label: "Services" },
      { href: "#products", label: "Products" },
      { href: "#about", label: "About Us" },
      { href: "#location", label: "Location" },
      { href: "#testimonials", label: "Testimonials" },
    ],
    contactCta: "Consult Now",
    hero: {
      heading1: "Provide",
      typing: "Innovative Software Solutions.",
      subtitle:
        "We are your digital architects, turning complex ideas into scalable software.",
      cta: "Consult Now",
    },
    services: {
      title: "Our Featured Services",
      subtitle:
        "We provide end-to-end technology solutions to grow your business.",
      items: [
        {
          title: "Web Development",
          description:
            "Custom sites, landing pages, and full web apps with React/Next.js.",
        },
        {
          title: "Mobile Development",
          description:
            "High-performance iOS/Android & cross-platform apps.",
        },
        {
          title: "Cloud & DevOps",
          description: "Scalable cloud infra, CI/CD, automation.",
        },
        {
          title: "UI/UX Design",
          description: "Beautiful, functional, user-centered design.",
        },
        {
          title: "Data Engineering",
          description:
            "Data pipelines, warehouses, and analytics solutions.",
        },
        {
          title: "IT Consulting",
          description:
            "Strategic insights & a roadmap for digital transformation.",
        },
      ],
    },
    techStack: {
      title: "Our Tech Stack",
      subtitle: "We master the latest technologies.",
    },
    products: {
      title: "Products & Portfolio",
      subtitle: "Real projects we've built.",
    },
    about: {
      title: "About",
      p1: "Antariks is your technology partner.",
      p2: "Our team is obsessed with clean code and impactful design.",
      cta: "Start Your Project",
    },
    partners: {
      title: "Our Partners",
      subtitle: "Companies that trust us.",
      logos: [
        { src: "image/partners/pt1.png", alt: "Partner Logo 1" },
        { src: "image/partners/pt2.png", alt: "Partner Logo 2" },
      ],
    },
    testimonials: {
      title: "What Clients Say",
      subtitle: "Partnerships are our biggest assets.",
    },
    location: {
      title: "Our Location",
      subtitle: "Drop by for coffee & discussion.",
      hq: "Antariks HQ",
      address: "S.A Tirtayasa No.123, Cirebon",
      city: "West Java 45132",
      email: "Email:",
      phone: "Phone:",
    },
    contact: {
      title: "Let's Talk",
      subtitle:
        "Got an idea or complex problem? We’re ready to help.",
      form: {
        name: "Your Name",
        namePlaceholder: "John Doe",
        email: "Email",
        emailPlaceholder: "you@email.com",
        message: "Your Message",
        messagePlaceholder: "Tell us about your project...",
        submit: "Send Message",
        loading: "Sending...",
        success: "Message sent! We'll contact you soon.",
        error: "Failed to send. Try again later.",
        errorEmpty: "Please fill all fields.",
      },
    },
    controls: {
            prevBtnTitle: "Previous Slide",
            nextBtnTitle: "Next Slide",
            printBtnText: "Download PDF Profile",
            printBtnTitle: "Print all slides to PDF"
        },
        slide1: {
            tag: "Company Profile 2025"
        },
        slide2: {
            title: "About ANTARIKS",
            p1: "Antariks (PT. Antariks Global Technology) isn't just a vendor. We are your technology partner. Founded in 2022 and become a PT in 2025, our mission is to bridge the gap between business ideas and digital reality.",
      p2: "Our team consists of engineers, designers, and strategists obsessed with clean code, functional design, and impactful products. We believe in the power of technology to solve real problems.",
        },
        slide3: {
            title: "Our Vision & Mission",
            visiTitle: "Vision",
            visiText: "To be a leading technology solutions provider that delivers effective, reliable, and sustainable innovations to support digital transformation across various industrial sectors.",
            misiTitle: "Mission",
            misiItems: [
                "Developing high-quality, secure, and easily implementable technology products and services.",
                "Providing a responsive and professional service experience through transparent collaboration with every client.",
                "Encouraging the adoption of efficient modern technologies to enhance business performance and productivity.",
                "Building an innovative culture focused on quality improvement, integrity, and sustainability.",
                "Becoming a reliable strategic partner in the company's digital transformation journey."
            ]
        },
        slide4: {
            title: "Founder Profile",
            team1Name: "Jivi Muzaqi Guntur",
            team1Title: "Founder & CEO",
            founderSaid: `I am the Founder & CEO of PT Antariks. My focus is on technology development, product strategy, and ensuring every solution we build truly impactful.
At Antariks, I lead the company's direction in creating digital platforms for various sectors, including:`,
sc1: 'Manufacturing — ERP systems, MES, and operational automation.',
sc2: 'Healthcare — hospital, clinic, and dental care management.',
sc3: 'Finance & Public Services — integrated information systems and data-driven solutions.',
sc4: 'Personnel — HRIS platforms and enterprise management.',
sc5: 'And other sectors.',
        },
        slide5: {
            title: "Our Services",
            service1Title: "Web & App Development",
            service1Text: "Building fast, secure, and scalable digital platforms for all devices.",
            service2Title: "Branding & Design",
            service2Text: "Creating strong, memorable, and visually cohesive brand identities.",
            service3Title: "Digital Marketing",
            service3Text: "Launching data-driven marketing strategies for measurable business growth."
        },
        slide6: {
            title: "Some of Our Projects",
           project1Title: "ERP & MES Manufacturing",
project1Desc: "Implementation of ERP and MES systems to improve production efficiency and operational integration in the manufacturing sector.",

project2Title: "Hospital & Dental Management System",
project2Desc: "Development of a hospital and dental clinic management system with a focus on service flow, medical records, and administrative automation.",

project3Title: "Point of Sale (POS)",
project3Desc: "Development of a modern POS system for retail and F&B with inventory integration, real-time reporting, and multi-outlet features."
        },
        slide7: {
            title: "Why Choose Antariks?",
            points: [
                { title: "Leading Innovation", text: "We always use the latest technology to provide the best and most relevant solutions.", icon: Star },
                { title: "Partnership Approach", text: "Clients are partners. We grow with you; your success is our success.", icon: Users },
                { title: "Data-Driven", text: "Every creative and strategic decision is backed by accurate data for optimal results.", icon: LineChart },
                { title: "Full Support", text: "Our team is ready to assist you 24/7, ensuring all projects run smoothly without interruption.", icon: Headset }
            ]
        },
        slide8: {
            title: "Our Clients"
        },
        slide9: {
            title: "Let's Connect",
            subtitle: "Ready to launch your next project into the stratosphere?",
              contactEmail: "antariks.corp@gmail.com",
            contactPhone: "+62 821 2074 1970",
            contactWeb: "https://antariks.vercel.app",
            qrLabel: "Scan me" // BARU: Teks untuk
        },  
        chatbot: {
              title: "Antariks AI Assistant",
              subtitle: "online",
              placeholder: "Type your message...",
              welcome:
                "Hello! I'm the Antariks AI assistant. How can I help with your software project today? (e.g., 'I want to build a mobile app?')",
              confirmation: {
                prompt:
                  "Are you interested in proceeding and filling out a project inquiry form?",
                yes: "Yes, Sure",
                no: "No, Not Now",
                followUp: "Alright, is there anything else I can help you with?",
              },
            },
            form: {
              title: "New Project Inquiry",
              subtitle:
                "One last step! Please fill in your details so our team can contact you.",
              name: "Name",
              namePlaceholder: "John Doe",
              email: "Email",
              emailPlaceholder: "you@email.com",
              phone: "Phone Number",
              phonePlaceholder: "08123456789",
              needs: "Your Needs (summarized by AI)",
              submit: "Send Inquiry",
              loading: "Sending...",
              success:
                "Thank you! Your inquiry has been sent. Our team will contact you shortly.",
              error: "Failed to send. Please try again later.",
              errorEmpty: "Please fill all fields (Name, Email, Phone).",
            },
        
  },
};

// =======================
// CONTEXT + PROVIDER
// =======================

export const LangContext = createContext({
  lang: "en" as "id" | "en",
  setLang: (v: "id" | "en") => {},
  t: allContent.en,
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<"id" | "en">("en");
  const [hydrated, setHydrated] = useState(false);

  // Saat client ready → ambil bahasa dari localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem("lang") as "id" | "en" | null;
    if (saved) setLang(saved);
    setHydrated(true);
  }, []);

  const changeLang = (value: "id" | "en") => {
    setLang(value);
    localStorage.setItem("lang", value);
  };

  // Jangan render apapun sebelum hydrated
  if (!hydrated) return null; // atau splash screen

  return (
    <LangContext.Provider
      value={{
        lang,
        setLang: changeLang,
        t: allContent[lang],
      }}
    >
      {children}
    </LangContext.Provider>
  );
};



export default LangContext;
