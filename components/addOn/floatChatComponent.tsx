"use client";

import { useState, FormEvent, useEffect, useRef } from "react";

// --- Komponen Indikator Mengetik (Tech Style) ---
const TypingIndicator = () => (
  <div className="bg-slate-100 border border-slate-200 p-3 rounded-2xl rounded-tl-none w-fit shadow-sm flex gap-1 items-center">
    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
  </div>
);

export default function FloatChat() {
  // Ganti dengan nomor WhatsApp Bisnis Antariks
  const phoneNumber = "6282120741970"; 

  // Definisi tipe pesan
  type Message = {
    id: number;
    sender: "bot" | "user";
    text?: string;
    type: "text" | "options" | "action" | "language-selector";
    options?: Array<{ label: string; value: string; message?: string }>;
    actionLink?: string;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState<"id" | "en" | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSelectedLang, setIsSelectedLang] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [waktu, setWaktu] = useState("");

  // --- KAMUS BAHASA (Corporate Tone) ---
  const RESOURCES = {
    id: {
      greeting: "Selamat datang di Antariks Global Technology. Silakan pilih bahasa pengantar.",
      menuGreeting: "Halo! 👋 Saya asisten virtual Antariks. Bagaimana kami bisa membantu transformasi digital bisnis Anda hari ini?",
      options: [
        { label: "🚀 Solusi IT & Pengembangan", value: "services", message: "Halo Antariks, saya ingin diskusi tentang Solusi IT / Pengembangan Sistem." },
        { label: "📄 Minta Penawaran (Quote)", value: "quote", message: "Halo Antariks, saya ingin meminta penawaran harga untuk proyek." },
        { label: "🤝 Kemitraan & Kerjasama", value: "partner", message: "Halo, saya tertarik untuk membahas kemitraan strategis dengan Antariks." },
        { label: "🔧 Dukungan Teknis", value: "support", message: "Halo, saya butuh bantuan teknis terkait layanan Antariks." },
      ],
      responseLink: "Baik, tim spesialis kami siap membantu. Silakan hubungi WhatsApp Official kami melalui tombol di bawah untuk respon cepat:",
      btnLabel: "Chat WhatsApp Official",
      placeholder: "Tulis pesan Anda...",
      reset: "Menu Utama",
      status: "Antariks Support"
    },
    en: {
      greeting: "Welcome to Antariks Global Technology. Please select your preferred language.",
      menuGreeting: "Hello! 👋 I am Antariks' Virtual Assistant. How can we assist with your digital transformation today?",
      options: [
        { label: "🚀 IT Solutions & Dev", value: "services", message: "Hi Antariks, I'd like to discuss IT Solutions / System Development." },
        { label: "📄 Request Quotation", value: "quote", message: "Hi Antariks, I would like to request a quotation for a project." },
        { label: "🤝 Partnership Inquiry", value: "partner", message: "Hi, I am interested in discussing a strategic partnership with Antariks." },
        { label: "🔧 Technical Support", value: "support", message: "Hi, I need technical support regarding Antariks services." },
      ],
      responseLink: "Understood. Our specialists are ready to assist. Please contact our Official WhatsApp via the button below for a fast response:",
      btnLabel: "Chat Official WhatsApp",
      placeholder: "Type a message...",
      reset: "Main Menu",
      status: "Antariks Support"
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setWaktu(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
    };
    updateTime();
    
    if (messages.length === 0) {
      startConversation();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  const startConversation = () => {
    setLanguage(null);
    setMessages([
      {
        id: 1,
        sender: "bot",
        type: "language-selector",
        text: "🌏 Welcome to Antariks / Selamat Datang",
      },
    ]);
  };

  const handleLanguageSelect = (lang: "id" | "en") => {
    setLanguage(lang);
    setIsSelectedLang(true);
    
    const userMsgId = Date.now();
    setMessages((prev) => [
      ...prev,
      { 
        id: userMsgId, 
        sender: "user", 
        type: "text", 
        text: lang === "id" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English" 
      }
    ]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const res = RESOURCES[lang];
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "bot",
          type: "text",
          text: res.menuGreeting,
        },
        {
          id: Date.now() + 1,
          sender: "bot",
          type: "options",
          options: res.options,
        }
      ]);
    }, 1000);
  };

  const handleOptionClick = (option: { label: string; value: string; message?: string }) => {
    const currentLang = language || "id";
    const res = RESOURCES[currentLang];

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", type: "text", text: option.label },
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      const finalMessage = option.message || "Hello Antariks";
      const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          type: "text",
          text: res.responseLink,
        },
        {
          id: Date.now() + 2,
          sender: "bot",
          type: "action",
          text: res.btnLabel,
          actionLink: waLink
        }
      ]);
    }, 1200);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const encodedMessage = encodeURIComponent(userMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setUserMessage("");
    setIsOpen(false);
  };

  const resetChat = () => {
    setMessages([]);
    startConversation();
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const uiText = language ? RESOURCES[language] : RESOURCES['id'];

  return (
    <>
      {/* Jendela Chat */}
      {isOpen && (
        <div className="fixed bottom-[90px] right-5 z-[9999] w-80 sm:w-96 h-[550px] bg-slate-50 rounded-2xl shadow-2xl flex flex-col animate-fade-in-up overflow-hidden border border-slate-200 font-sans ring-1 ring-slate-900/5">
          
          {/* Header Chat (Corporate Blue Theme) */}
         <div className="flex-shrink-0 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-4 flex justify-between items-center shadow-lg relative overflow-hidden">
            {/* Background Texture Effect */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            
            <div className="flex items-center gap-3 relative z-100 h-10">
              <div className="relative">
                {/* Avatar Logo Antariks */}
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center border-2 border-blue-400/50 overflow-hidden shadow-inner">
                    {/* Ganti src ini dengan logo Antariks Anda */}
                    <img 
                      src="/assets/img/logo-antariks.png" 
                      alt="Antariks" 
                      className="w-full h-full object-cover p-1"
                      onError={(e) => {
                        // Fallback jika gambar error: Menampilkan Inisial 'AG'
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<span class="text-blue-900 font-bold text-sm">AG</span>';
                      }}
                    />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-2 tracking-wide">
                  Antariks AI
                </h3>
                <p className="text-[10px] text-blue-200 flex items-center gap-1 opacity-90">
                  <span className="w-1 h-1 bg-blue-200 rounded-full"></span>
                  Virtual Assistant
                </p>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-3 relative z-10">
                <button onClick={resetChat} title="Reset Chat" className="text-blue-200 hover:text-white transition-colors transform hover:rotate-180 duration-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2.5 2v6h6M21.5 22v-6h-6"/><path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.3"/>
                    </svg>
                </button>
                <button onClick={toggleChat} className="text-blue-200 hover:text-white transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"/><path d="m6 6 18 18"/>
                    </svg>
                </button>
            </div>
          </div>

          {/* Body Chat */}
          <div className="flex-grow overflow-y-auto p-4 bg-[#f8fafc] space-y-4 custom-scrollbar overscroll-contain relative"
           onWheel={(e) => e.stopPropagation()}>
            {/* Watermark Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <svg width="150" height="150" viewBox="0 0 24 24" fill="black"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
            </div>

            <div className="text-center text-[10px] text-slate-400 my-2 uppercase tracking-wider font-medium bg-slate-100 w-fit mx-auto px-3 py-1 rounded-full">Today, {waktu}</div>
            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in relative z-10`}>
                
                {/* Bubble Text */}
                {msg.type === 'text' && (
                  <div 
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none shadow-blue-200' 
                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                )}

                {/* Language Selector */}
                {msg.type === 'language-selector' && (
                    <div className="flex flex-col items-center w-full gap-3 my-2 animate-fade-in">
                        <div className="bg-white p-4 rounded-xl border border-slate-100 text-sm text-center text-slate-600 shadow-sm w-full">
                            <p className="font-medium mb-2 text-slate-800">{msg.text}</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    onClick={() => handleLanguageSelect('id')}
                                    className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all group"
                                >
                                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🇮🇩</span>
                                    <span className="text-xs font-semibold text-slate-600 group-hover:text-blue-700">Indonesia</span>
                                </button>
                                <button 
                                    onClick={() => handleLanguageSelect('en')}
                                    className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all group"
                                >
                                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🇬🇧</span>
                                    <span className="text-xs font-semibold text-slate-600 group-hover:text-blue-700">English</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Options Menu */}
                {msg.type === 'options' && msg.options && (
                  <div className="flex flex-col gap-2 mt-1 w-full max-w-[95%]">
                    {msg.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleOptionClick(opt)}
                        className="text-left text-sm bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 py-3 px-4 rounded-xl transition-all hover:shadow-md active:scale-95 flex items-center gap-3 group"
                      >
                        <span className="bg-slate-100 p-1.5 rounded-lg group-hover:bg-blue-100 transition-colors text-lg">
                            {opt.label.split(' ')[0]}
                        </span>
                        <span className="font-medium">{opt.label.substring(opt.label.indexOf(' ') + 1)}</span>
                        <svg className="ml-auto w-4 h-4 text-slate-300 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    ))}
                  </div>
                )}

                {/* Action Button */}
                {msg.type === 'action' && (
                  <a 
                    href={msg.actionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebc57] text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-green-500/20 transition-all hover:-translate-y-0.5 w-fit group"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    {msg.text}
                  </a>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
                <div className="flex justify-start animate-fade-in">
                    <TypingIndicator />
                </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Chat */}
          <div className="p-4 bg-white border-t border-slate-100">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder={uiText.placeholder}
                className="flex-grow bg-slate-50 text-slate-700 text-sm p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border-slate-200 border transition-all"
              />
              <button
                type="submit"
                disabled={!userMessage.trim() || !isSelectedLang}
                className={`p-3 rounded-xl text-white transition-all shadow-sm flex-shrink-0 ${
                    userMessage.trim() && isSelectedLang 
                        ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-md transform hover:-translate-y-0.5' 
                        : 'bg-slate-200 cursor-not-allowed'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
            <div className="text-center mt-3 flex justify-center gap-1 text-[10px] text-slate-300">
                 <span className="opacity-70">Powered by</span>
                 <span className="font-semibold text-blue-300">Antariks Logic AI</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) - Corporate Style */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-[9998] w-16 h-16 flex items-center justify-center rounded-full shadow-2xl shadow-green-900/20 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            isOpen 
                ? "bg-red-800 rotate-90 " 
                : "bg-gradient-to-br from-green-600 to-green-800 hover:to-green-700 animate-bounce-slow "
        }`}
        aria-label="Toggle Chat"
      >
        {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M18 6 6 18"/><path d="m6 6 18 18"/>
            </svg>
        ) : (
            <div className="relative">
                {/* Ikon Pesan Modern */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {/* Notification Dot */}
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-blue-700"></span>
                </span>
            </div>
        )}
      </button>
      
      <style jsx>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 2s infinite;
        }
        /* Custom Scrollbar untuk tampilan lebih bersih */
        .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
      `}</style>
    </>
  );
}