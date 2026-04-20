import React from "react";
import { useTranslation } from "react-i18next";

import airportImage from "../../../assets/vacationConsultation/airportImg.webp";
import arrow from "../../../assets/vacationConsultation/arrow.svg";

// Добавлен проп { country } сюда 👇
export default function VacationConsultation({ country }) {
  const { t } = useTranslation();

  const getWhatsappMessage = () => {
    const baseText =
      "Здравствуйте, я перешла по объявлению о консультации с вашего сайта, и хотела бы проконсультироваться об учебе";

    // Теперь переменная country доступна для проверки
    const countryText = country
      ? ` в ${country}`
      : " в Малайзии/Чехии/Великобритании";

    return encodeURIComponent(baseText + countryText);
  };

  return (
    <section
      className="font-[Montserrat] w-full flex flex-col-reverse lg:flex-row items-stretch relative overflow-hidden bg-[#D1E8FF]"
      style={{ minHeight: "460px" }}
    >
      <div
        className="w-full lg:w-1/2 min-h-[300px] lg:min-h-full relative"
        style={{
          backgroundImage: `url(${airportImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#D1E8FF] to-transparent" />
        <div className="block lg:hidden absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#D1E8FF] to-transparent" />
      </div>

      <div className="relative z-10 w-full lg:w-1/2 flex flex-col items-center justify-center gap-6  px-8 sm:px-12 lg:pl-20 lg:pr-12">
        <h1 className="title  text-[#304BAA] leading-tight">
          {t("vacation.titleLine1")} <br /> {t("vacation.titleLine2")}
        </h1>

        <p className="text-xl sm:text-2xl text-center font-medium text-[#1D1D1D] max-w-md">
          {t("vacation.description")}
        </p>

        <a
          href={`https://wa.me/77715993843?text=${getWhatsappMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#304BAA] border-2 border-[#304BAA] text-white text-xl sm:text-2xl px-8 py-3 rounded-xl hover:bg-white hover:text-[#304BAA] transition-all duration-300 inline-block"
        >
          {t("vacation.button")}
        </a>
      </div>
    </section>
  );
}