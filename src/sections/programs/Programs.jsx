import React from "react";
import { useParams } from "react-router-dom"; // Убедитесь, что используете react-router-dom, если это опечатка в оригинале
import { useTranslation } from "react-i18next";

import BackgroundUK from "../../assets/programs/london.webp";
import BackgroundMalaysia from "../../assets/programs/malaysia.webp";
import BackgroundCzechia from "../../assets/programs/czechia.webp";

import Colleges from "../programsSections/colleges/Colleges";
import Information from "../programsSections/information/information";
import CambridgeAlbum from "../programsSections/cambridge_album/CambridgeAlbum";
import VacationConsultation from "../programsSections/vacationConsultation/VacationConsultation";
import NavBar from "../../components/navBar/NavBar";

export default function Programs() {
  const { t } = useTranslation();
  const { country } = useParams();
  const selectedCountry = country?.toLowerCase() || "uk";

  const programData = {
    uk: {
      title: t("programsTitle.uk.title"),
      image: BackgroundUK,
    },
    malaysia: {
      title: t("programsTitle.malaysia.title"),
      image: BackgroundMalaysia,
    },
    czechia: {
      title: t("programsTitle.czechia.title"),
      image: BackgroundCzechia,
    },
  };

  const data = programData[selectedCountry] || programData.uk;

  // 1. Создаем словарь для подстановки правильного падежа в сообщение WhatsApp
  const whatsappCountryNames = {
    uk: "Великобритании",
    malaysia: "Малайзии",
    czechia: "Чехии",
  };

  // 2. Получаем нужное слово (например, "Чехии") или оставляем пустым
  const whatsappCountry = whatsappCountryNames[selectedCountry] || "";

  return (
    <>
      <section className="relative font-[Montserrat] w-full min-h-[120dvh] md:min-h-[150dvh] bg-[#94d6ff] flex flex-col overflow-hidden">
        {/* Слой фона с оверлеем */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${data.image})` }}
        ></div>

        {/* Контентный слой */}
        <div className="relative z-10 w-full flex flex-col items-center min-h-[120dvh] md:min-h-[150dvh]">
          <div className="w-full">
            <NavBar />
          </div>

          {/* Центрированный блок с заголовками и кнопкой */}
          <div className="flex justify-start items-start md:text-start md:justify-start md:items-start w-[90%] md:w-4/5 flex-1 py-10 gap-8">
            <div className="flex flex-col gap-2 w-full">
              {/* Исправленные классы адаптивности и добавление break-words */}
              <h1 className="text-6xl sm:text-8xl  text-white font-bold leading-tight drop-shadow-2xl break-words w-full">
                {t(`programsTitle.${selectedCountry}.title`)}
              </h1>
            </div>
          </div>

          {/* Нижняя плашка с цитатой */}
          <div className="bg-[#304BAA]/90 backdrop-blur-sm text-white text-center py-8 md:py-12 w-full mt-auto">
            <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl px-6 font-medium italic">
              {t(`programsTitle.${selectedCountry}.quote`)}
            </p>
          </div>
        </div>
      </section>

      <Colleges country={selectedCountry} />
      <Information country={selectedCountry} />
      <CambridgeAlbum country={selectedCountry} />

      <VacationConsultation country={whatsappCountry} />
    </>
  );
}