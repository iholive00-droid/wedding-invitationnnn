import { useEffect, useState } from "react";

export default function Home() {
  const weddingDate = new Date("2026-08-15T19:00:00");

  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  function getTimeLeft() {
    const difference = weddingDate - new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    setTimeLeft(getTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "Zeynep & Ahmet | Düğün Davetiyesi";
  }, []);

  const shareText = `Zeynep & Ahmet düğün davetiyesi 🎉\n📅 15 Ağustos 2026\n📍 Boğaz Davet Salonu\nSeni de aramızda görmek isteriz!`;

  const handleShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-black text-white flex flex-col items-center justify-center px-6">

      {/* SHARE BUTTON */}
      <button
        onClick={handleShare}
        className="fixed top-4 right-4 bg-amber-500 text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-amber-400 transition"
      >
        WhatsApp'ta Paylaş
      </button>

      {/* ENVELOPE SCENE */}
      <div className="relative w-full flex items-center justify-center" style={{ perspective: "1200px" }}>

        <div className="relative w-72 h-44">

          {/* FLAP (3D ENVELOPE OPEN) */}
          <div
            onClick={() => setIsOpen(true)}
            className="absolute top-0 left-0 w-full h-1/2 cursor-pointer bg-gradient-to-br from-amber-700 to-yellow-600 rounded-t-xl shadow-2xl origin-top transition-transform duration-700"
            style={{
              transform: isOpen ? "rotateX(-160deg)" : "rotateX(0deg)",
              transformStyle: "preserve-3d",
            }}
          />

          {/* ENVELOPE BODY */}
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-br from-amber-800 to-yellow-700 rounded-xl shadow-xl" />

          {/* PAPER */}
          <div
            className="absolute left-1/2 w-64 bg-white text-black rounded-xl shadow-2xl p-4 text-center transition-all duration-700"
            style={{
              transform: isOpen
                ? "translate(-50%, -140%) scale(1)"
                : "translate(-50%, 20%) scale(0.95)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            <h2 className="text-xl font-serif mb-2">Zeynep & Ahmet</h2>
            <p className="text-sm">15 Ağustos 2026 • 19:00</p>
          </div>

          {/* LABEL */}
          {!isOpen && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-black font-semibold tracking-widest">
                DAVETİYE
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      {isOpen && (
        <div className="w-full max-w-3xl text-center mt-24">

          {/* COUNTDOWN */}
          <div className="mb-10">
            <p className="text-sm tracking-[0.3em] text-neutral-400 uppercase">
              Düğüne Kalan Süre
            </p>

            <div className="grid grid-cols-4 gap-4 mt-6">
              {[
                { label: "Gün", value: timeLeft.days },
                { label: "Saat", value: timeLeft.hours },
                { label: "Dakika", value: timeLeft.minutes },
                { label: "Saniye", value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/5 border border-white/10 rounded-2xl py-4"
                >
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-xs text-neutral-400 uppercase">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INVITATION */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              Zeynep & Ahmet
            </h1>

            <p className="text-neutral-300 mb-8">
              Hayatımızın en özel gününde sizleri aramızda görmekten mutluluk duyarız.
            </p>

            <div className="space-y-2 text-neutral-300 mb-8">
              <p>📅 15 Ağustos 2026</p>
              <p>🕖 19:00</p>
              <p>📍 Boğaz Davet Salonu</p>
            </div>

            <a
              href="https://maps.google.com/?q=Istanbul Bogaz Düğün Salonu"
              target="_blank"
              className="inline-block bg-amber-500 text-black font-semibold px-6 py-3 rounded-full hover:bg-amber-400 transition-all"
            >
              📍 GPS Konumunu Aç
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
