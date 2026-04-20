import React, { useState, useEffect, useRef } from "react";
import logo from "./../../assets/navbar/logo.svg";
import menu from "./../../assets/navbar/menu.svg";
import Menu from "../menu/Menu";
import LangMenu from "../lang-menu/LangMenu";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { i18n } = useTranslation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const getLangLabel = (langCode) => {
    switch (langCode) {
      case "en":
        return "English";
      case "ru":
        return "Русский";
      case "kk":
        return "Қазақша";
      default:
        return langCode;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  return (
    <>
      <nav className="w-full px-4 md:px-6 py-4 bg-transparent z-30">
        <div className="flex justify-between items-center">
          <Link to="/">
            {/* Исправлено: вместо scale используются классы высоты и ширины */}
            <img src={logo} alt="logo" className="h-10 md:h-14 w-auto hover:cursor-pointer transform origin-left md:scale-125 transition-transform" />
          </Link>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-1 md:space-x-2 hover:cursor-default">
              <LangMenu />
              {/* На телефонах скрываем текст языка, оставляя только флаг, чтобы сэкономить место */}
              <span className="text-sm font-medium h-full mb-1 text-black hidden sm:block">
                {getLangLabel(i18n.language)}
              </span>
            </div>
            
            <button
              ref={buttonRef}
              onClick={toggleMenu}
              className="px-3 py-2 md:p-2 ml-1 md:ml-2 rounded-lg hover:cursor-pointer text-white bg-blue-700 hover:scale-110 transition text-sm md:text-base"
              aria-label="Menu"
            >
              <p>Programs</p>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && <div className="fixed inset-0 z-20" onClick={closeMenu} />}

      <div
        ref={menuRef}
        className={`fixed top-0 right-0 mt-3 py-2 h-fit w-64 rounded-xl bg-white/30 backdrop-blur-md z-50 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-start pl-6">
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-white/20 transition"
          >
            <img
              src={menu}
              alt="Close"
              className="h-6 w-6 hover:cursor-pointer"
            />
          </button>
        </div>
        
        <Menu closeMenu={closeMenu} />
      </div>
    </>
  );
}