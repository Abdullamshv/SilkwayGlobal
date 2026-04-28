import React, { useEffect, useState } from "react";
import { WhyUsData } from "../../data/whyUsData";
import { useTranslation } from "react-i18next";

const icons = [
  // Звезда — студенты
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path
      d="M12 3L14.5 8.5L21 9.3L16.5 13.7L17.7 20L12 17L6.3 20L7.5 13.7L3 9.3L9.5 8.5Z"
      fill="rgba(255,255,255,0.9)"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="1"
    />
  </svg>,
  // Глобус — страны
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
    <path
      d="M12 3C12 3 8 8 8 12C8 16 12 21 12 21"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M12 3C12 3 16 8 16 12C16 16 12 21 12 21"
      stroke="white"
      strokeWidth="1.5"
    />
    <path d="M3 12H21" stroke="white" strokeWidth="1.5" />
  </svg>,
  // Университет — партнёры
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <rect
      x="3"
      y="10"
      width="18"
      height="11"
      rx="2"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M7 10V7a5 5 0 0 1 10 0v3"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="15" r="1.5" fill="white" />
  </svg>,
  // Часы — консультации
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
    <path
      d="M12 7v5l3 3"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>,
];

export default function WhyUs() {
  const { t } = useTranslation();
  const [bouncingIndex, setBouncingIndex] = useState(null);

  useEffect(() => {
    let current = 0;
    const run = () => {
      setBouncingIndex(current);
      setTimeout(() => setBouncingIndex(null), 600);
      current = (current + 1) % WhyUsData.length;
    };
    run();
    const interval = setInterval(run, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="whyus"
      className="bg-[#D1E8FF] w-full font-[Montserrat] py-14 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="title text-2xl sm:text-3xl md:text-4xl mb-10 text-center">
        {t("whyUs.title")}
      </h1>

      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-4">
        {WhyUsData.map((item, index) => {
          const isBouncing = bouncingIndex === index;

          return (
            <div
              key={item.id}
              style={{
                transform: isBouncing ? "translateY(-12px)" : "translateY(0)",
                transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              className="
                rounded-2xl p-6 flex flex-col gap-3 min-h-[180px] text-center
                hover:-translate-y-2 hover:shadow-xl cursor-default
                bg-[#2D4EC8] text-white
              "
            >
              {/* Цифра */}
              <div className="text-3xl font-extrabold leading-none text-white">
                {t(item.textKeys[0])}
              </div>

              {/* Описание */}
              <div className="text-2xl font-bold leading-relaxed text-white/90">
                {item.textKeys.slice(1).map((key, i) => (
                  <span key={i}>{t(key)} </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}