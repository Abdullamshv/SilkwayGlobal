import React from "react";
import whatsapp from "../../assets/icons/whatsapp.svg";
import instagram from "../../assets/icons/Instagram.svg";
import linkedin from "../../assets/icons/Linkedin.svg";
import youtube from "../../assets/icons/Youtube.svg";
import phone from "../../assets/icons/Phone.svg";
import Location from "./Location";
import { useTranslation } from "react-i18next";

import bgImage from "../../assets/contacts/map-bg.jpg";

export default function Contacts() {
  const { t } = useTranslation();

  return (
    <section className="py-6 font-[Montserrat] bg-[#D1E8FF] w-full h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat">
      <div className="bg-[#A9D3F5]/90 backdrop-blur-sm rounded-2xl w-full max-w-7xl sm:px-8 py-8 flex flex-col gap-8">
        {/* Верхний блок */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Заголовок */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#304BAA]">
              Silkway Global <br /> {t("contacts.title")}
            </h1>
          </div>

          {/* Контактная информация */}
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Иконки соц. сетей */}
            <div className="flex justify-center gap-4">
              <a
                href="https://wa.me/77715993843"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={whatsapp} alt="whatsapp" className="w-6 sm:w-8" />
              </a>
              <a
                href="https://www.instagram.com/silkway_global1?igsh=cmVuZDVyb3ZkenQ3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="instagram" className="w-6 sm:w-8" />
              </a>
              <a
                href="https://www.linkedin.com/company/silkwayglobal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedin} alt="linkedin" className="w-6 sm:w-8" />
              </a>
              <a
                href="https://youtube.com/@silkwayglobal?si=xF254FpEQxSRcyHx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={youtube} alt="youtube" className="w-6 sm:w-8" />
              </a>
            </div>

            {/* Адрес */}
            <div className="text-[#304BAA] text-base sm:text-xl font-medium hover:cursor-default">
              <p>{t("contacts.addressLabel")}</p>
              <p>{t("contacts.address")}</p>
            </div>

            {/* Телефон */}
            <div className="flex items-center gap-2 text-[#304BAA] text-base sm:text-xl hover:cursor-default">
              <img src={phone} alt="phone" className="w-6 h-6" />
              <a>{t("contacts.phone")}</a>
            </div>
          </div>
        </div>

        {/* Локация (карта) */}
        <div className="w-full px-4 sm:px-0">
          <Location />
        </div>
      </div>
    </section>
  );
}
