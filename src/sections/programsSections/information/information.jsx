import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function Information() {
  const { t } = useTranslation();
  const { country = "uk" } = useParams();

  const items = t(`information.${country.toLowerCase()}.items`, {
    returnObjects: true,
  });

  const gradients = [
    "bg-gradient-to-r from-red-600 to-orange-400",
    "bg-gradient-to-r from-sky-300 to-blue-700",
  ];

  return (
    <section className="bg-[#D1E8FF] py-12 w-full font-[Montserrat] flex justify-center">
      <div className="bg-[#A8D6FF] w-11/12 max-w-7xl rounded-xl py-8 px-6 flex flex-col items-center">
        <h1 className="bg-[#1B3EC4] text-white text-3xl font-bold text-center rounded-xl px-6 py-2 mb-8">
          {t("information.title")}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
          {items.map((item, index) => {
            const gradientClass = gradients[index % gradients.length];
            return (
              <div
                key={index}
                className={`text-white p-6 rounded-2xl font-bold shadow-md flex justify-center items-center text-center text-xl md:text-2xl lg:text-3xl whitespace-pre-line break-words min-h-[120px] ${gradientClass}`}
              >
                {item.text}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}