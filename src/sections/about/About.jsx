import React from "react";
import { useTranslation } from "react-i18next";

import budapesht from "../../assets/about/Budapesht.png";

export default function About() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="w-full min-h-[500px] font-[Montserrat] relative flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${budapesht})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(209,232,255,0.97) 0%, rgba(209,232,255,0.85) 40%, rgba(209,232,255,0.2) 70%, transparent 100%)",
        }}
      />

      {/* Контент */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 py-16">
        <span className="text-blue-800 font-extrabold uppercase leading-tight italic tracking-[0.2em] text-5xl mb-4">
          {t("aboutUs")}
        </span>

        <div className="space-y-8 max-w-xl">
          <h3 className="text-xl md:text-4xl font-extrabold text-[#304BAA] leading-tight italic">
            {t("aboutUsTagline")}
          </h3>

          <div className="space-y-6 text-gray-700 text-lg md:text-xl font-medium leading-relaxed">
            <p>{t("experience")}</p>
            <p className="border-l-4 border-blue-500 pl-4 bg-white/30 py-2 rounded-r-lg">
              {t("programs")}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                t("destinations.cambridge"),
                t("destinations.europe"),
                t("destinations.malaysia"),
                t("destinations.dubai"),
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                  <span className="text-base md:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}