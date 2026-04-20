import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import language_icon from "../../assets/navbar/language.svg";

export default function LangMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    document.body.dir = i18n.dir(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("i18nextLng");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
      document.body.dir = i18n.dir(savedLang);
    }
  }, [i18n]);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleMenu}
        className="rounded hover:cursor-pointer hover:scale-190 scale-150"
      >
        <img src={language_icon} alt="language icon" className="object-cover" />
      </button>
      {isOpen && (
        <ul className="absolute rounded-xl mt-2 w-32 bg-white shadow-md z-10 font-[Montserrat] overflow-hidden">
          <li
            className="px-4 py-2 hover:bg-gray-100 hover:text-[#1B3EC4] cursor-pointer"
            onClick={() => changeLanguage("en")}
          >
            English
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 hover:text-[#1B3EC4] cursor-pointer"
            onClick={() => changeLanguage("ru")}
          >
            Русский
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 hover:text-[#1B3EC4] cursor-pointer"
            onClick={() => changeLanguage("kk")}
          >
            Қазақша
          </li>
        </ul>
      )}
    </div>
  );
}
