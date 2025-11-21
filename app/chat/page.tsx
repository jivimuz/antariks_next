"use client"; // Diperlukan untuk hooks

import Footer from "@/components/layout/footerComponent";
import Header from "@/components/layout/headerComponent";
import LangContext from "@/context/langContext";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";


// -- Context Bahasa --


// -- Komponen Modal Formulir Lead --
const LeadModal = ({ isOpen, onClose, needsSummary }: { isOpen: boolean; onClose: () => void; needsSummary: string | null }) => {
  const { t } = useContext(LangContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [needs, setNeeds] = useState(needsSummary);
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [responseMessage, setResponseMessage] = useState("");

  // Update 'needs' jika summary berubah (misal: user memicu form lagi)
  useEffect(() => {
    setNeeds(needsSummary);
  }, [needsSummary]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMessage("");

    const tForm = t.form;
    const formspreeEndpoint = "https://formspree.io/f/mqalnpdr";

    if (!name || !email || !phone) {
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
        body: JSON.stringify({ name, email, phone, needs }),
      });

      if (response.ok) {
        setStatus("success");
        setResponseMessage(tForm.success);
        setName("");
        setEmail("");
        setPhone("");
        setNeeds("");
        setTimeout(() => {
          onClose(); // Tutup modal
          setStatus("idle"); // Reset status
        }, 3000);
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      setStatus("error");
      setResponseMessage(tForm.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="form-modal"
      className="fixed inset-0 bg-gray-950 bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-6 z-[100]"
    >
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-lg border border-gray-700 relative">
        <button
          id="close-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">{t.form.title}</h2>
        <p className="text-gray-400 mb-6">{t.form.subtitle}</p>

        <form id="lead-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="form-name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              {t.form.name}
            </label>
            <input
              type="text"
              id="form-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={t.form.namePlaceholder}
              required
            />
          </div>
          <div>
            <label
              htmlFor="form-email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              {t.form.email}
            </label>
            <input
              type="email"
              id="form-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={t.form.emailPlaceholder}
              required
            />
          </div>
          <div>
            <label
              htmlFor="form-phone"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              {t.form.phone}
            </label>
            <input
              type="tel"
              id="form-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={t.form.phonePlaceholder}
              required
            />
          </div>
          <div>
            <label
              htmlFor="form-needs"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              {t.form.needs}
            </label>
            <textarea
              id="form-needs"
              rows={4}
              onChange={(e) => setNeeds(e.target.value)} // Biarkan user mengedit jika perlu
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              readOnly // Atau biarkan 'readonly' jika Anda mau
            ></textarea>
          </div>
          <div className="text-right">
            <button
              id="lead-submit-btn"
              type="submit"
              disabled={status === "loading"}
              className="bg-emerald-600 text-white py-3 px-8 rounded-full font-semibold shadow-lg shadow-green-600/30 transition-all duration-300 hover:bg-emerald-500 hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-1 transform disabled:bg-gray-500"
            >
              {status === "loading" ? t.form.loading : t.form.submit}
            </button>
          </div>
        </form>

        <div id="lead-form-status" className="mt-4 text-center">
          {status === "success" && (
            <p className="text-green-400">{responseMessage}</p>
          )}
          {status === "error" && (
            <p className="text-red-400">{responseMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// -- Komponen Chatbot Utama --
type ChatMessage = { type: "bot" | "user" | "confirmation"; text: string };
type ChatHistoryEntry = { role: "model" | "user"; parts: { text: string }[] };

const Chatbot = () => {
  const { lang, t } = useContext(LangContext);
  const [chatHistory, setChatHistory] = useState<ChatHistoryEntry[]>([]); // Untuk API
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]); // Untuk UI
  const [chatInput, setChatInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pendingFormSummary, setPendingFormSummary] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  // Efek untuk inisialisasi chat saat bahasa berubah
  useEffect(() => {
    const welcomeMessage = t.chatbot.welcome;
    setChatMessages([{ type: "bot", text: welcomeMessage }]);
    setChatHistory([{ role: "model", parts: [{ text: welcomeMessage }] }]);
  }, [t.chatbot.welcome]);

  // Efek untuk auto-scroll
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatMessages, isLoading]);

  const getSystemInstruction = () => {
    const langInstruction =
      lang === "id"
        ? "Anda harus merespons dalam Bahasa Indonesia."
        : "You must respond in English.";

    return `
      Anda adalah asisten AI yang ramah dan profesional untuk Antariks (PT. Antariks Global Technology), sebuah perusahaan pengembang software.
      Tugas Anda adalah menjawab pertanyaan pengguna tentang layanan kami (web development, mobile apps, UI/UX, dll.) dan menjelaskan bagaimana kami dapat membantu.
      ${langInstruction}

      JIKA pengguna bertanya tentang HARGA atau BIAYA (misalnya: "harganya berapa?", "berapa biayanya?", "how much?", "what is the price?"):
      MAKA Anda HARUS:
      1. Atur 'triggerForm' menjadi true.
      2. Tulis 'summary' sebagai: "Pengguna bertanya tentang estimasi harga."
      3. Berikan respons yang MANUSIAWI. JELASKAN bahwa harga proyek itu 'tergantung pada kebutuhan' (fitur, platform, kompleksitas).
      4. JANGAN berikan angka.
      5. JELASKAN bahwa cara terbaik untuk mendapatkan estimasi adalah dengan mendiskusikannya lebih lanjut dengan tim. Contoh respons: "Itu pertanyaan bagus! Harga proyek sangat bervariasi tergantung fitur dan kompleksitasnya. Saya tidak bisa memberikan angka pasti di sini, tapi tim kami bisa membuatkan estimasi akurat untuk Anda."

      JIKA pengguna menyatakan MINAT JELAS LAINNYA untuk memulai proyek (misalnya: "Saya ingin membuat aplikasi", "Saya tertarik", "Ayo mulai", "I want to build an app"):
      MAKA Anda HARUS:
      1. Atur 'triggerForm' menjadi true.
      2. Tulis 'summary' singkat tentang apa yang diinginkan pengguna (misal: "Pengguna ingin membuat aplikasi e-commerce").
      3. Berikan respons yang ramah dan mengkonfirmasi. Contoh: "Tentu, itu terdengar seperti proyek yang hebat. Kami bisa bantu wujudkan itu."

      JIKA TIDAK, jika pengguna hanya bertanya pertanyaan umum (misalnya: "Apa itu React?"):
      MAKA Anda HARUS:
      1. Atur 'triggerForm' menjadi false.
      2. Atur 'summary' menjadi string kosong.
      3. Jawab pertanyaan mereka seperti biasa.
    `;
  };

  const callGeminiAPI = async (currentHistory: { role: string; parts: { text: string; }[]; }[]) => {
       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC2385GhXMYnmriIBZw_iXLaB-T5b5ecNs`;


    const payload = {
      contents: currentHistory,
      systemInstruction: {
        parts: [{ text: getSystemInstruction() }],
      },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            response: { type: "STRING" },
            triggerForm: { type: "BOOLEAN" },
            summary: { type: "STRING" },
          },
          required: ["response", "triggerForm", "summary"],
        },
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      if (
        !result.candidates ||
        !result.candidates[0] ||
        !result.candidates[0].content ||
        !result.candidates[0].content.parts
      ) {
        throw new Error("Invalid API response structure");
      }

      const jsonText = result.candidates[0].content.parts[0].text;
      const data = JSON.parse(jsonText);

      // Tambahkan balasan bot ke state
      const botMsg: ChatMessage = { type: "bot", text: data.response };
      const botHistoryEntry: ChatHistoryEntry = {
        role: "model",
        parts: [{ text: data.response }],
      };
      setChatHistory((prev) => [...prev, botHistoryEntry]);

      if (data.triggerForm) {
        setPendingFormSummary(data.summary);
        const confirmMsg: ChatMessage = {
          type: "confirmation",
          text: t.chatbot.confirmation.prompt,
        };
        setChatMessages((prev) => [...prev, botMsg, confirmMsg]);
      } else {
        setChatMessages((prev) => [...prev, botMsg]);
      }
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Sorry, I'm having trouble connecting. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const prompt = chatInput.trim();
    if (!prompt) return;

    // Hapus tombol konfirmasi jika ada
    setChatMessages((prev) =>
      prev.filter((msg) => msg.type !== "confirmation")
    );
    setChatInput("");
    setIsLoading(true);

    const userMsg: ChatMessage = { type: "user", text: prompt };
    const userHistoryEntry: ChatHistoryEntry = { role: "user", parts: [{ text: prompt }] };

    setChatMessages((prev) => [...prev, userMsg]);
    const updatedHistory = [...chatHistory, userHistoryEntry];
    setChatHistory(updatedHistory); // Simpan riwayat baru

    await callGeminiAPI(updatedHistory);
  };

  const handleConfirmationClick = (isYes: boolean) => {
    // Hapus pesan konfirmasi dari UI
    setChatMessages((prev) =>
      prev.filter((msg) => msg.type !== "confirmation")
    );

    if (isYes) {
      setIsModalOpen(true);
    } else {
      const followUpMsg: ChatMessage = {
        type: "bot",
        text: t.chatbot.confirmation.followUp,
      };
      const followUpHistory: ChatHistoryEntry = {
        role: "model",
        parts: [{ text: t.chatbot.confirmation.followUp }],
      };
      setChatMessages((prev) => [...prev, followUpMsg]);
      setChatHistory((prev) => [...prev, followUpHistory]);
    }
    // setPendingFormSummary(null); // Biarkan summary, jika user menekan 'Ya' nanti
  };

  return (
    <>
      <section id="chatbot-section" className="container mx-auto px-6 max-w-3xl mt-6">
    <a href="/" className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium shadow-md hover:bg-emerald-700 active:scale-95 transition-all"> <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Home</a>
        <br /><br />
        <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 relative overflow-hidden">
         {/* --- 1. Ambient Background Effects (Sama seperti Services) --- */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
          <div className="p-4 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-center text-white">
              {t.chatbot.title}
            </h1>
            <p className="text-center text-green-400 text-sm">
              {t.chatbot.subtitle}
            </p>
          </div>

          <div
            id="chat-window"
            ref={chatWindowRef}
            className="p-6 h-96 overflow-y-auto flex flex-col space-y-4"
          >
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.type === "user"
                    ? "bg-emerald-600 text-white p-3 rounded-lg rounded-br-none self-end max-w-xs md:max-w-md break-words"
                    : "bg-gray-800 text-gray-200 p-3 rounded-lg rounded-bl-none self-start max-w-xs md:max-w-md break-words"
                }
              >
                {msg.text}
                {msg.type === "confirmation" && (
                  <div id="confirmation-buttons" className="flex space-x-2 mt-3">
                    <button
                      id="confirm-yes-btn"
                      onClick={() => handleConfirmationClick(true)}
                      className="confirmation-btn"
                    >
                      {t.chatbot.confirmation.yes}
                    </button>
                    <button
                      id="confirm-no-btn"
                      onClick={() => handleConfirmationClick(false)}
                      className="confirmation-btn secondary"
                    >
                      {t.chatbot.confirmation.no}
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="text-gray-500 italic p-3 self-start animate-pulse">
                Antariks AI is typing...
              </div>
            )}
          </div>

          <form id="chat-form" onSubmit={handleChatSubmit} className="p-6 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                id="chat-input"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all disabled:opacity-50"
                placeholder={t.chatbot.placeholder}
                autoComplete="off"
              />
              <button
                type="submit"
                id="chat-submit"
                disabled={isLoading}
                className="bg-emerald-600 text-white p-3 rounded-full font-semibold shadow-lg shadow-green-600/30 transition-all duration-300 hover:bg-emerald-500 hover:shadow-xl hover:shadow-green-500/50 transform hover:scale-105 disabled:bg-gray-500 disabled:hover:scale-100"
              >
                                              <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                <path opacity="0.4" d="M8.20248 13.1904L4.50325 13.5176C3.67308 13.5176 3 12.8379 3 11.9997C3 11.1614 3.67308 10.4818 4.50325 10.4818L8.20248 10.8089C8.85375 10.8089 9.38174 11.3421 9.38174 11.9997C9.38174 12.6584 8.85375 13.1904 8.20248 13.1904Z" fill="currentColor"></path>                                <path d="M20.6247 13.1302C20.5668 13.1885 20.3508 13.4353 20.1479 13.6402C18.9643 14.9234 15.8738 17.0218 14.2571 17.664C14.0116 17.7665 13.3909 17.9846 13.0582 18C12.7408 18 12.4375 17.9262 12.1484 17.7808C11.7873 17.577 11.4993 17.2554 11.34 16.8764C11.2386 16.6143 11.0793 15.8267 11.0793 15.8124C10.9211 14.9521 10.835 13.5531 10.835 12.0066C10.835 10.535 10.9211 9.19332 11.051 8.31871C11.0651 8.30329 11.2244 7.32623 11.3979 6.99137C11.7153 6.37892 12.336 6 13.0004 6H13.0582C13.4913 6.01432 14.4011 6.39435 14.4011 6.40756C15.9316 7.04975 18.949 9.04681 20.1621 10.3742C20.1621 10.3742 20.5047 10.7156 20.653 10.9282C20.8843 11.2344 20.9999 11.6134 20.9999 11.9923C20.9999 12.4153 20.8701 12.8085 20.6247 13.1302Z" fill="currentColor"></path>                                </svg>                            
              </button>
            </div>
          </form>
        </div>
      </section>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        needsSummary={pendingFormSummary}
      />
    </>
  );
};

// -- Komponen Halaman Utama --
export default function ChatbotPage() {

  return (
    <>
      {/* Di Next.js, <Head> biasanya ada di layout.js atau page.js.
        Untuk file tunggal ini, kita akan mengabaikannya, 
        tetapi kita akan menambahkan style global.
      */}
      <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@600;700&display=swap');
        body {
          font-family: "Inter", sans-serif;
        }
        #chat-window::-webkit-scrollbar {
          width: 6px;
        }
        #chat-window::-webkit-scrollbar-track {
          background: #1f2937; /* bg-gray-800 */
        }
        #chat-window::-webkit-scrollbar-thumb {
          background: #374151; /* bg-gray-700 */
          border-radius: 3px;
        }
        #chat-window::-webkit-scrollbar-thumb:hover {
          background: #4b5563; /* bg-gray-600 */
        }
        .confirmation-btn {
          background-color: #059669; /* bg-emerald-600 */
          color: white;
          padding: 8px 16px;
          border-radius: 9999px; /* rounded-full */
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: background-color 0.3s;
        }
        .confirmation-btn:hover {
          background-color: #047857; /* bg-emerald-700 */
        }
        .confirmation-btn.secondary {
          background-color: #374151; /* bg-gray-700 */
        }
        .confirmation-btn.secondary:hover {
          background-color: #4b5563; /* bg-gray-600 */
        }
      `}</style>

      <div className="bg-gray-950 text-gray-200 antialiased font-sans min-h-screen">
        <Header />
        <main className="pt-32 pb-16">
          <Chatbot />
        </main>
      </div>
        <Footer />
    </>
  );
}